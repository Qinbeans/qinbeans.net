package websockets

import (
	"testing"

	"github.com/gorilla/websocket"
)

func TestCreateSocket(t *testing.T) {
	conn := &websocket.Upgrader{}
	socket := createSocket(conn)
	if socket.sock != conn {
		t.Error("socket.conn should be conn")
	}
	if socket.send == nil {
		t.Error("socket.send should be non-nil")
	}
}
