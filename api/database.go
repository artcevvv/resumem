package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	_ = godotenv.Load("../.env")

	// First connect to postgres database to create our database if needed
	dsn := "host=localhost user=postgres password=7437 dbname=postgres port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to PSQL:", err)
	}

	dbName := "resumem" // Default database name
	if envDB := os.Getenv("PGSQL_DB"); envDB != "" {
		dbName = envDB
	}

	var count int64
	db.Raw("SELECT COUNT(*) FROM pg_database WHERE datname = ?", dbName).Scan(&count)

	if count == 0 {
		createDBSQL := fmt.Sprintf("CREATE DATABASE %s;", dbName)
		if err := db.Exec(createDBSQL).Error; err != nil {
			log.Fatal("Failed to create db:", err)
		}
		log.Printf("Database %s created successfully", dbName)
	}

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("Failed to get database instance: ", err)
	}
	sqlDB.Close()

	// Now connect to our actual database
	dsn = fmt.Sprintf("host=localhost user=postgres password=7437 dbname=%s port=5432 sslmode=disable", dbName)
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	err = db.AutoMigrate(&User{}, &Resume{}, &Link{}, &Skill{}, &Education{}, &Career{}, &Course{})
	if err != nil {
		log.Fatal("Failed to migrate db:", err)
	}

	DB = db
	log.Println("Database Connected successfully")
}
