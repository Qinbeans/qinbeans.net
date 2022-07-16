https://qinbeans.net

[![Go](https://github.com/Qinbeans/qinbeans.net/actions/workflows/go.yml/badge.svg)](https://github.com/Qinbeans/qinbeans.net/actions/workflows/go.yml)
[![Svelte CI](https://github.com/Qinbeans/qinbeans.net/actions/workflows/svelte.yml/badge.svg)](https://github.com/Qinbeans/qinbeans.net/actions/workflows/svelte.yml)

# qinbeans.net
My website

# Testing

I provided a little shortcut for testing, it's just `./test` which does `go test -cover $1 $(go list ./... | grep -v /log)` and `bun wiptest`.  I got tired of writing that so I made a little script to run it for me.

## Backend

I aimed to achieve about 80%+ coverage

## Frontend

Using `bun wiptest`