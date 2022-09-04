package main

//import the server from backend

import (
	"fmt"
	"os"

	server "api.qinbeans.net/backend"
	"github.com/joho/godotenv"
)

func main() {
	//enable dotenv
	err := godotenv.Load()
	if err != nil {
		fmt.Fprintf(os.Stderr, "WARN: %s\n", err)
	}
	server.Start()
}
