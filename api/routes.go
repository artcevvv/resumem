package main

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Disable proxy trust checking since we're not behind a proxy
	r.SetTrustedProxies(nil)

	config := cors.DefaultConfig()
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")
	if allowedOrigins == "" {
		allowedOrigins = "https://resumem.vercel.app/"
	}
	config.AllowOrigins = []string{allowedOrigins}
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowCredentials = true
	config.MaxAge = 12 * 60 * 60 // Cache preflight requests for 12 hours
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
