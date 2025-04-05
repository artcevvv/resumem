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
	godotenv.Load("../.env")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=postgres port=%s sslmode=disable",
		os.Getenv("PGSQL_HOST"),
		os.Getenv("PGSQL_USER"),
		os.Getenv("PGSQL_PSWRD"),
		os.Getenv("PGSQL_PORT"),
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to PSQL:", err)
	}

	dbName := os.Getenv("PGSQL_DB")

	var count int64

	db.Raw("SELECT COUNT(*) FROM pg_database WHERE datname = ?", dbName).Scan(&count)

	if count == 0 {
		createDBSQL := fmt.Sprintf("CREATE DATABASE %s", dbName)

		if err := db.Exec(createDBSQL).Error; err != nil {
			log.Fatal("Failed to create db:", err)
		}

		log.Printf("Database created successfully")
	}

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("Failed to get database instance: ", err)
	}
	sqlDB.Close()

	dsn = fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("PGSQL_HOST"),
		os.Getenv("PGSQL_USER"),
		os.Getenv("PGSQL_PSWRD"),
		dbName,
		os.Getenv("PGSQL_PORT"),
	)

	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	err = db.AutoMigrate(&User{}, &Resume{})
	if err != nil {
		log.Fatal("Failed to migrate db:", err)
	}

	DB = db
	log.Println("Database Connected successfully")
}
