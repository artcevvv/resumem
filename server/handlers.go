package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	hashedPassword, err := HashPassword(user.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to hash password",
		})
		return
	}

	user.Password = hashedPassword

	if err := DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "User already exists",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User created successfully",
		"user": gin.H{
			"id":    user.ID,
			"email": user.Email,
			"name":  user.Name,
		},
	})
}

func Login(c *gin.Context) {
	var credentials struct {
		Email    string `json: "email"`
		Password string `json: "password"`
	}

	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request format",
		})
		return
	}

	var user User
	if err := DB.Where("email = ?", credentials.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid credentials",
		})
		return
	}

	if user.Password == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Password is empty",
		})
		return
	}

	isValid := CheckPassword(credentials.Password, user.Password)
	if !isValid {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid credentials",
		})
		return
	}

	token, err := GenerateToken(user.ID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to generate token",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user": gin.H{
			"id":    user.ID,
			"email": user.Email,
			"name":  user.Name,
		},
	})
}

func GetResumes(c *gin.Context) {
	userID := c.GetUint("user_id")

	var resumes []Resume
	if err := DB.Preload("Links").Preload("Skills").Preload("Educations").Preload("Careers").Preload("Courses").
		Where("user_id = ?", userID).Find(&resumes).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch resumes",
		})
		return
	}

	c.JSON(http.StatusOK, resumes)
}

func GetResume(c *gin.Context) {
	userID := c.GetUint("user_id")
	resumeID := c.Param("id")

	var resume Resume
	if err := DB.Preload("Links").Preload("Skills").Preload("Educations").Preload("Careers").Preload("Courses").
		Where("id = ? AND user_id = ?", resumeID, userID).First(&resume).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Resume not found",
		})
		return
	}

	c.JSON(http.StatusOK, resume)
}

func CreateResume(c *gin.Context) {
	userID := c.GetUint("user_id")

	var resume Resume
	if err := c.ShouldBindJSON(&resume); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	resume.UserID = userID

	if err := DB.Create(&resume).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create resume",
		})
		return
	}

	c.JSON(http.StatusCreated, resume)
}

func UpdateResume(c *gin.Context) {
	userID := c.GetUint("user_id")
	resumeID := c.Param("id")

	var resume Resume
	if err := DB.Where("id = ? AND user_id = ?", resumeID, userID).First(&resume).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Resume not found",
		})
		return
	}

	if err := c.ShouldBindJSON(&resume); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := DB.Save(&resume).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update resume",
		})
		return
	}

	c.JSON(http.StatusOK, resume)
}

func DeleteResume(c *gin.Context) {
	userID := c.GetUint("user_id")
	resumeID := c.Param("id")

	if err := DB.Where("id = ? AND user_id = ?", resumeID, userID).Delete(&Resume{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete resume",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Resume deleted successfully",
	})
}
