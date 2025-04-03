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
	User        User        `json:"user,omitempty"`
	Fullname    string      `json:"fullname"`
	Phonenumber string      `json:"phone_number"`
	Email       string      `json:"email"`
	Links       []Link      `json:"links"`
	Summary     string      `json:"summary"`
	Skills      []Skill     `json:"skills"`
	Educations  []Education `json:"educations,omitempty"`
	Careers     []Career    `json:"careers,omitempty"`
	Courses     []Course    `json:"courses,omitempty"`
}

type Link struct {
	Type string
	URL  string
}

type Skill struct {
	Type  string
	Level string
}

type Education struct {
	School      string
	Degree      string
	StartDate   time.Time
	EndDate     time.Time
	City        string
	Description string
}

type Career struct {
	JobTitle    string
	Employer    string
	StartDate   time.Time
	EndDate     time.Time
	City        string
	Description string
}

type Course struct {
	URL       string
	Name      string
	StartDate time.Time
	EndDate   time.Time
}
