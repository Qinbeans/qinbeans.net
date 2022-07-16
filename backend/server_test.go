package backend

import (
	"os"
	"os/signal"
	"testing"
	"time"
)

func TestStart(t *testing.T) {
	os.Setenv("A_NAME", "test")
	os.Setenv("MODE", "dev")
	os.Setenv("PORT", "5069")
	os.Setenv("C_PORT", "3000")
	go func() {
		err := Start()
		if err != nil {
			t.Error(err)
		}
	}()
	time.Sleep(time.Second * 5)
	//call keyboard interrupt to stop the server
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	go func() {
		<-c
		os.Exit(0)
	}()
}
