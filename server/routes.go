package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Configure CORS
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	r.Use(cors.New(config))

	// Auth routes
	r.POST("/api/v1/register", Register)
	r.POST("/api/v1/login", Login)

	// Protected routes
	auth := r.Group("/api/v1")
	auth.Use(AuthMiddleware())
	{
		// Resume routes
		auth.GET("/resumes", GetResumes)
		auth.GET("/resumes/:id", GetResume)
		auth.POST("/resumes", CreateResume)
		auth.PUT("/resumes/:id", UpdateResume)
		auth.DELETE("/resumes/:id", DeleteResume)
	}

	return r
}
