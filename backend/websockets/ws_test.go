package websockets

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"api.qinbeans.net/backend/auth"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

func TestCreateSocket(t *testing.T) {
	socket := createSocket(nil)
	if socket != nil {
		t.Errorf("CreateSocket() should return nil, but got %v", socket)
	}
	conn := &websocket.Upgrader{}
	socket = createSocket(conn)
	if socket.sock != conn {
		t.Error("socket.conn should be conn")
	}
}

func TestClose(t *testing.T) {
	err := closeSocket("")
	if err == nil {
		t.Error("closeSocket() should return error")
	}
	//test successfull close
	testToken := uuid.New().String()
	Sockets[testToken] = make(chan *Socket, 1)
	Sockets[testToken] <- &Socket{nil, nil}
	err = closeSocket(testToken)
	if err == nil {
		t.Error("closeSocket() should return error")
	}
}

func TestLogin(t *testing.T) {
	r := gin.Default()
	auth.SetAuth()
	r.POST("/v1/login", LoginGuard)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodPost, "/v1/login", nil)
	req.PostForm = make(map[string][]string)
	req.PostForm["username"] = []string{auth.Authority.Username}
	req.PostForm["token"] = []string{auth.Authority.Token}
	r.ServeHTTP(w, req)
	if w.Code != http.StatusOK {
		t.Errorf("Login() should return status code %d, but got %d", http.StatusOK, w.Code)
	}
	//get JSON from response
	var response Response
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		t.Errorf("Login() should return JSON, but got %s", w.Body.String())
	}
	//close socket
	err = closeSocket(response.Token)
	if err.Error() != "socket not connected" {
		t.Errorf("Login() should close socket, but got %s", err)
	}
}
