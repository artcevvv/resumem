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

	// Get database configuration from environment variables
	dbHost := os.Getenv("PGSQL_HOST")
	dbUser := os.Getenv("PGSQL_USER")
	dbPassword := os.Getenv("PGSQL_PSWRD")
	dbPort := os.Getenv("PGSQL_PORT")
	dbName := os.Getenv("PGSQL_DB")

	// First connect to postgres database to create our database if needed
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=postgres port=%s sslmode=disable",
		dbHost, dbUser, dbPassword, dbPort)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to PSQL:", err)
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
	dsn = fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		dbHost, dbUser, dbPassword, dbName, dbPort)
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
