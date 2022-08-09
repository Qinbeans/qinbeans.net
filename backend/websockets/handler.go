package websockets

import (
	"net/http"

	"api.qinbeans.net/backend/log"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

func LoginGuard(c *gin.Context) {
	token, err := login(c.Writer, c.Request, c.PostForm("username"), c.PostForm("token"))
	if err != nil {
		if err.Error() == "unauthorized" {
			resp := Response{
				Token:   "",
				Message: "unauthorized",
			}
			c.JSON(http.StatusUnauthorized, resp)
		} else {
			resp := Response{
				Token:   "",
				Message: "internal server error",
			}
			c.JSON(http.StatusInternalServerError, resp)
		}
		return
	}
	resp := Response{
		Token:   *token,
		Message: "success",
	}
	if err != nil {
		log.Errf("Error marshalling response: %v", err)
		return
	}
	c.JSON(http.StatusOK, resp)
}

func WsHandler(c *gin.Context) {
	log.Logf("WS handler called")
	//part of the url is the token
	token := c.Param("token")
	//check if token is valid
	socket, ok := Sockets[token]
	if !ok {
		log.Errf("Invalid token")
		resp := Response{
			Token:   "",
			Message: "unauthorized",
		}
		c.JSON(http.StatusUnauthorized, resp)
		return
	}
	//read from socket
	locked := <-socket
	conn, err := locked.sock.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Errf("Error upgrading socket: %v", err)
		resp := Response{
			Token:   "",
			Message: "internal server error",
		}
		c.JSON(http.StatusInternalServerError, resp)
		return
	}
	locked.conn = conn
	//start reading from socket asynchronously
	go locked.messageHandler(c.Request, token)
	socket <- locked //hand back to channel
}

func (s *Socket) messageHandler(r *http.Request, token string) {
	for {
		opcode, message, err := s.conn.ReadMessage()
		if err != nil {
			//Just close on error
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway) {
				log.Logf("error: %v, user-agent: %v", err, r.Header.Get("User-Agent"))
			}
			break
		}
		//guard case
		if !Calls.Exists(byte(opcode)) {
			log.Errf("Invalid opcode: %v", opcode)
			continue
		}
		switch opcode {
		case websocket.TextMessage:
			{
				switch message[0] {
				case 'c':
					{
						log.Logf("connected")
					}
				default:
					{
						// probably a json
						log.Errf("Invalid message type: %v", message[0])
					}
				}
				break
			}
		case websocket.CloseMessage:
			{
				closeSocket(token)
				break
			}
		default:
			{
				log.Errf("Unhandled opcode: %v", opcode)
				break
			}
		}
	}
	log.Logf("Socket closed")
	closeSocket(token)
}
