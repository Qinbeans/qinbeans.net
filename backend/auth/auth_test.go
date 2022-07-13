package auth

import (
	"os"
	"testing"
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
