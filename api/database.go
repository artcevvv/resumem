package main

import (
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	db, err := gorm.Open(sqlite.Open("resumem.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to SQLite:", err)
	}

	err = db.AutoMigrate(&User{}, &Resume{}, &Link{}, &Skill{}, &Education{}, &Career{}, &Course{})
	if err != nil {
		log.Fatal("Failed to migrate db:", err)
	}

	DB = db
	log.Println("SQLite Database Connected successfully")
}
