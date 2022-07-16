package log

import (
	"fmt"
	"os"
)

const (
	name       = "api.qinbeans.net"
	colorGreen = "\u001B[1;32m"
	colorRed   = "\u001B[1;31m"
	colorBlue  = "\u001B[1;34m"
	colorReset = "\u001B[m"
)

// printLn prints a formatted string to stdout
func printLn(line string) {
	fmt.Printf("%s[%s]%s %s%s\n", colorGreen, name, colorReset, line, colorReset)
}

func errorLn(line string) {
	fmt.Fprintf(os.Stderr, "%s[Error]%s %s%s\n", colorRed, colorReset, line, colorReset)
}

// Logf will attempt to format a log message or print plain text.
func Logf(format string, args ...interface{}) {
	// Print the log message
	printLn(fmt.Sprintf(format, args...))
}

func Errf(format string, args ...interface{}) {
	// Print the log message
	errorLn(fmt.Sprintf(format, args...))
}
