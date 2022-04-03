package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"
)

func routes() http.Handler {
	router := http.NewServeMux()

	fs := http.FileServer(http.Dir("./static"))
	router.Handle("/", fs)

	return router
}

func run() error {
	port := flag.Int("port", 5000, "API server port")
	flag.Parse()

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", *port),
		Handler: routes(),
	}

	return srv.ListenAndServe()
}

func main() {
	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err)
		os.Exit(1)
	}
}
