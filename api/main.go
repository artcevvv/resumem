package main

import (
	"os"
)

func main() {
	InitDB()

	r := SetupRouter()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r.Run(":" + port)
}
