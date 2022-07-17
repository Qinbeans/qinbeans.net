package backend

import (
	"fmt"
	"os"
	"time"

	auth "api.qinbeans.net/backend/auth"
	"api.qinbeans.net/backend/log"
	ws "api.qinbeans.net/backend/websockets"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Start() error {
	//start the server
	err := auth.SetAuth()
	if err != nil {
		log.Errf("SetAuth error: %s", err.Error())
		return err
	}
	ws.InitCodex()
	port := os.Getenv("PORT")
	if port == "" {
		port = "5069"
	}
	address := os.Getenv("ADDRESS")
	if address == "" {
		address = "localhost"
	}
	mode := os.Getenv("MODE")
	var url string
	if mode == "production" {
		url = os.Getenv("ACCEPTED")
	} else {
		c_port := os.Getenv("C_PORT")
		c_address := os.Getenv("C_ADDRESS")
		url = "http://" + c_address + ":" + c_port
	}
	log.Logf("Starting server on port %s", port)
	r := gin.Default()
	r.SetTrustedProxies([]string{"https://api.qinbeans.net", "http://" + address + ":" + port})
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{url},
		AllowMethods:     []string{"POST"},
		AllowHeaders:     []string{"Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           time.Hour,
	}))
	r.GET("/v1/ping", auth.Ping)
	r.GET("/v1/ws/:token", ws.WsHandler)
	r.POST("/v1/login", ws.LoginGuard)
	r.Run(fmt.Sprintf("%s:%s", address, port)) // listen and serve on
	return nil
}
