package auth

import (
	"os"

	"api.qinbeans.net/backend/log"
	"github.com/google/uuid"
)

type Auth struct {
	Username string `json:"username"`
	Token    string `json:"token"`
}

var (
	Authority = Auth{}
)

func SetAuth() {
	Authority.Username = os.Getenv("A_NAME")
	Authority.Token = uuid.New().String()
	//write token to file then wait for 5 sec then delete file
	log.Logf("Authority: %s:%s", Authority.Username, Authority.Token)
}
