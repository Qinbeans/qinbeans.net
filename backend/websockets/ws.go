package websockets

import (
	"errors"
	"net/http"

	auth "api.qinbeans.net/backend/auth"
	"api.qinbeans.net/backend/log"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type Socket struct {
	sock *websocket.Upgrader
	conn *websocket.Conn
}

var (
	Sockets = make(map[string]chan *Socket) //map of channel to Socket pointer
	Status  = false
)

func createSocket(sock *websocket.Upgrader) *Socket {
	return &Socket{
		sock: sock,
		conn: nil,
	}
}

func closeSocket(token string) error {
	socket, ok := Sockets[token]
	if !ok {
		return errors.New("socket not found")
	}
	locked := <-socket
	locked.close()
	socket <- locked //hand back to channel
	delete(Sockets, token)
	return nil
}

func (s *Socket) close() {
	s.conn.Close()
}

func LoginGuard(c *gin.Context) {
	token, err := login(c.Writer, c.Request, c.PostForm("username"), c.PostForm("token"))
	if err != nil {
		if err.Error() == "unauthorized" {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorized"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
		}
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"token":   token,
		"message": "login successful",
	})
}

func login(w http.ResponseWriter, r *http.Request, username string, token string) (*string, error) {
	// check if token is valid
	if username != auth.Authority.Username || token != auth.Authority.Token {
		log.Errf("Invalid login credentials: %s:%s", username, token)
		return nil, errors.New("unauthorized")
	}
	token = uuid.New().String()
	// create socket
	ws := websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	//reserve socket for token
	Sockets[token] = make(chan *Socket, 1)
	Sockets[token] <- createSocket(&ws)
	return &token, nil
}

func WsHandler(c *gin.Context) {
	log.Logf("WS handler called")
	//part of the url is the token
	token := c.Param("token")
	//check if token is valid
	socket, ok := Sockets[token]
	if !ok {
		log.Errf("Invalid token")
		c.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorized"})
		return
	}
	//read from socket
	locked := <-socket
	conn, err := locked.sock.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Errf("Error upgrading socket: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
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
