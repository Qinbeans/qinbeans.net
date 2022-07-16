package auth

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestAuthUnloadedEnv(T *testing.T) {
	err := SetAuth()
	if err == nil {
		T.Error("SetAuth() should return error")
	}
	T.Logf("SetAuth() should return error: %s", err)
}

func TestAuthLoadedEnv(t *testing.T) {
	os.Setenv("A_NAME", "test")
	err := SetAuth()
	if err != nil {
		t.Errorf("SetAuth() should not return error: %s", err)
	}
}

func TestPing(t *testing.T) {
	r := gin.Default()
	r.GET("/v1/ping", Ping)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/v1/ping", nil)
	r.ServeHTTP(w, req)
	if w.Code != http.StatusOK {
		t.Errorf("Ping() should return status code %d, but got %d", http.StatusOK, w.Code)
	}
}
