package main

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	config := cors.DefaultConfig()
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")
	if allowedOrigins == "" {
		allowedOrigins = "http://localhost:3000" // Default for development
	}
	config.AllowOrigins = []string{allowedOrigins}
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	config.AllowCredentials = true
	r.Use(cors.New(config))

	r.POST("/api/v1/register", Register)
	r.POST("/api/v1/login", Login)

	auth := r.Group("/api/v1")
	auth.Use(AuthMiddleware())
	{
		auth.GET("/resumes", GetResumes)
		auth.GET("/resumes/:id", GetResume)
		auth.POST("/resumes", CreateResume)
		auth.PUT("/resumes/:id", UpdateResume)
		auth.DELETE("/resumes/:id", DeleteResume)
	}

	return r
}
