package main

//import the server from backend

import (
	server "api.qinbeans.net/backend"
	"github.com/joho/godotenv"
)

func main() {
	//enable dotenv
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}
	server.Start()
}
