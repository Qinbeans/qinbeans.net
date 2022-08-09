package websockets

import (
	"errors"
	"net/http"

	auth "api.qinbeans.net/backend/auth"
	"api.qinbeans.net/backend/log"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type Socket struct {
	sock *websocket.Upgrader
	conn *websocket.Conn
}

// simple messaging protocol for authorization
type Response struct {
	Token   string `json:"token"`
	Message string `json:"message"`
}

// messageHandler reads from the socket and handles messages via marshalling and unmarshalling
type Message struct {
	Token string `json:"token"`
	Query string `json:"query"`
}

var (
	Sockets = make(map[string]chan *Socket) //map of channel to Socket pointer
	Status  = false
)

func createSocket(sock *websocket.Upgrader) *Socket {
	if sock == nil {
		return nil
	}
	return &Socket{
		sock: sock,
		conn: nil,
	}
}

func closeSocket(token string) error {
	socket, ok := Sockets[token]
	if !ok {
		delete(Sockets, token)
		return errors.New("socket not found")
	}
	locked := <-socket
	if locked.conn == nil {
		delete(Sockets, token)
		return errors.New("socket not connected")
	}
	if locked.sock == nil {
		delete(Sockets, token)
		return errors.New("socket not initialized")
	}
	err := locked.close()
	if err != nil {
		delete(Sockets, token)
		return err
	}
	socket <- locked //hand back to channel
	delete(Sockets, token)
	return nil
}

func (s *Socket) close() error {
	err := s.conn.Close()
	if err != nil {
		return err
	}
	return nil
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
