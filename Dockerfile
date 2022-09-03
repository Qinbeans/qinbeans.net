FROM golang:alpine AS BUILD

WORKDIR /build

COPY ./backend ./backend
COPY ./go.mod ./go.mod
COPY ./go.sum ./go.sum
COPY main.go main.go

WORKDIR /build

RUN go build .

FROM alpine:latest AS RUNNER

COPY --from=BUILD /build/api.qinbeans.net /bin/run