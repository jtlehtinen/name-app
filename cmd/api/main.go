package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"
)

type config struct {
	port int
}

type application struct {
	config config
}

func run() error {
	var cfg config
	flag.IntVar(&cfg.port, "port", 5000, "API server port")
	flag.Parse()

	app := &application{
		config: cfg,
	}

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", cfg.port),
		Handler: app.routes(),
	}

	return srv.ListenAndServe()
}

func main() {
	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err)
		os.Exit(1)
	}
}
