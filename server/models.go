package main

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email    string   `gorm:"uniqueIndex;not null" json:"email"`
	Password string   `json:"password"`
	Name     string   `json:"username"`
	Resumes  []Resume `json:"resumes,omitempty"`
}

type Resume struct {
	gorm.Model
	UserID      uint        `json:"user_id"`
	User        User        `json:"user"`
	Fullname    string      `json:"fullname"`
	Phonenumber string      `json:"phone_number"`
	Email       string      `json:"email"`
	Links       []Link      `gorm:"foreignKey:ResumeID" json:"links"`
	Summary     string      `json:"summary"`
	Skills      []Skill     `json:"skills"`
	Educations  []Education `json:"educations,omitempty"`
	Careers     []Career    `json:"careers,omitempty"`
	Courses     []Course    `json:"courses,omitempty"`
}

type Link struct {
	gorm.Model
	User     uint   `json:"user_id"`
	ResumeID uint   `json:"resume_id"`
	Type     string `json:"type"`
	URL      string `json:"url"`
}

type Skill struct {
	gorm.Model
	User     uint   `json:"user_id"`
	ResumeID uint   `json:"resume_id"`
	Type     string `json:"type"`
	Level    string `json:"level"`
}

type Education struct {
	gorm.Model
	User        uint      `json:"user_id"`
	ResumeID    uint      `json:"resume_id"`
	School      string    `json:"school"`
	Degree      string    `json:"degree"`
	StartDate   time.Time `json:"start_date"`
	EndDate     time.Time `json:"end_date"`
	City        string    `json:"city"`
	Description string    `json:"description"`
}

type Career struct {
	gorm.Model
	User        uint      `json:"user_id"`
	ResumeID    uint      `json:"resume_id"`
	JobTitle    string    `json:"job_title"`
	Employer    string    `json:"employer"`
	StartDate   time.Time `json:"start_date"`
	EndDate     time.Time `json:"end_date"`
	City        string    `json:"city"`
	Description string    `json:"description"`
}

type Course struct {
	gorm.Model
	User      uint      `json:"user_id"`
	ResumeID  uint      `json:"resume_id"`
	URL       string    `json:"url"`
	Name      string    `json:"name"`
	StartDate time.Time `json:"start_date"`
	EndDate   time.Time `json:"end_date"`
}
