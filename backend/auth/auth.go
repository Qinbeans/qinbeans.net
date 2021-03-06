package auth

import (
	"errors"
	"net/http"
	"os"

	"api.qinbeans.net/backend/log"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Auth struct {
	Username string `json:"username"`
	Token    string `json:"token"`
}

var (
	Authority = Auth{}
)

func Ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

func SetAuth() error {
	Authority.Username = os.Getenv("A_NAME")
	if Authority.Username == "" {
		log.Errf("Authority.Username is empty")
		return errors.New("Authority.Username is empty")
	}
	Authority.Token = uuid.New().String()
	if Authority.Token == "" {
		log.Errf("Authority.Token is empty")
		return errors.New("Authority.Token is empty")
	}
	//write token to file then wait for 5 sec then delete file
	log.Logf("Authority: %s:%s", Authority.Username, Authority.Token)
	return nil
}
