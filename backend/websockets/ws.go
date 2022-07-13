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
	send chan []byte
}

var (
	Sockets = make(map[string]*Socket)
)

func createSocket(sock *websocket.Upgrader) *Socket {
	return &Socket{
		sock: sock,
		conn: nil,
		send: make(chan []byte),
	}
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
		log.Errf("Invalid login credentials")
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
	Sockets[token] = createSocket(&ws)
	return &token, nil
}

func WsHandler(c *gin.Context) {
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
	conn, err := socket.sock.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Errf("Error upgrading socket: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
		return
	}
	socket.conn = conn
	//start reading from socket asynchronously
	go func() {
		for {
			_, message, err := socket.conn.ReadMessage()
			if err != nil {
				log.Errf("Error reading from socket: %v", err)
				c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
				return
			}
			if message != nil {
				//message handler
			}
			log.Logf("Received message: %s", message)
		}
	}()
}
