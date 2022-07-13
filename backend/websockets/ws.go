package websockets

import (
	"net/http"

	auth "api.qinbeans.net/backend/auth"
	"api.qinbeans.net/backend/log"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type Socket struct {
	conn  *websocket.Conn
	send  chan []byte
	token string
}

var (
	Sockets = make(map[string]*Socket)
)

func createSocket(conn *websocket.Conn) *Socket {
	return &Socket{
		conn: conn,
		send: make(chan []byte),
	}
}

func Login(c *gin.Context) {
	// grab form data
	username := c.PostForm("username")
	token := c.PostForm("token")
	// check if token is valid
	if username != auth.Authority.Username || token != auth.Authority.Token {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "unauthorized",
		})
		log.Errf("unauthorized login attempt from %s", username)
		return
	}
	token = uuid.New().String()
	//reserve socket for token
	Sockets[token] = nil
	c.JSON(http.StatusOK, gin.H{
		"message": "login success",
		"token":   token,
	})
}
