package main

import "net/http"

func index(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("hello"))
}

func (app *application) routes() http.Handler {
	router := http.NewServeMux()
	router.HandleFunc("/", index)
	return router
}
