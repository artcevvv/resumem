package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	InitDB()

	r := gin.Default()

	r.POST("/api/v1/register", Register)
	r.POST("/api/v1/login", Login)

	r.GET("/api/v1/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "OK",
		})
	})

	r.Run()
}
