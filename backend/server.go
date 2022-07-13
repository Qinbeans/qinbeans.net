package backend

import (
	"fmt"
	"net/http"
	"os"
	"time"

	auth "api.qinbeans.net/backend/auth"
	ws "api.qinbeans.net/backend/websockets"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Start() {
	//start the server
	auth.SetAuth()
	port := os.Getenv("PORT")
	if port == "" {
		port = "5069"
	}
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"POST"},
		AllowHeaders:     []string{"Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           time.Hour,
	}))
	r.GET("/v1/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.POST("/v1/login", ws.Login)
	r.Run(fmt.Sprintf("localhost:%s", port)) // listen and serve on
}
