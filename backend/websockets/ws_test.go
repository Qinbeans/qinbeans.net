package websockets

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"api.qinbeans.net/backend/auth"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

func TestCreateSocket(t *testing.T) {
	conn := &websocket.Upgrader{}
	socket := createSocket(conn)
	if socket.sock != conn {
		t.Error("socket.conn should be conn")
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
}
