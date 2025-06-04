# Resumem - Resume Builder Application

Resumem is a modern web application that helps users create and manage professional resumes. The application consists of a Go-based REST API backend and a Next.js frontend.

## Features

- User authentication (register/login)
- Create and manage multiple resumes
- Add and edit resume sections:
  - Personal information
  - Links (social media, portfolio, etc.)
  - Skills with proficiency levels
  - Education history
  - Work experience
  - Professional courses and certifications
- Responsive design
- Real-time updates

## Tech Stack

### Backend (API)
- Go (Golang)
- Gin Web Framework
- GORM (ORM)
- PostgreSQL
- JWT Authentication
- Docker

### Frontend
- Next.js
- React
- TypeScript
- Docker

## Prerequisites

- Docker and Docker Compose
- Go 1.24 or higher
- Node.js 18 or higher
- PostgreSQL 15

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
JWT_SECRET=your_jwt_secret
ALLOWED_ORIGINS=http://localhost:3000

# Database Configuration
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=resumem
DB_PORT=5432

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## API Endpoints

### Authentication
- `POST /api/v1/register` - Register a new user
- `POST /api/v1/login` - Login user

### Resume Management (Protected Routes)
- `GET /api/v1/resumes` - Get all resumes for the authenticated user
- `GET /api/v1/resumes/:id` - Get a specific resume
- `POST /api/v1/resumes` - Create a new resume
- `PUT /api/v1/resumes/:id` - Update a resume
- `DELETE /api/v1/resumes/:id` - Delete a resume

## Data Models

### User
- ID (auto-generated)
- Email (unique)
- Password (hashed)
- Name
- Resumes (one-to-many relationship)

### Resume
- ID (auto-generated)
- UserID (foreign key)
- Fullname
- Phone Number
- Email
- Links (one-to-many relationship)
- Summary
- Skills (one-to-many relationship)
- Educations (one-to-many relationship)
- Careers (one-to-many relationship)
- Courses (one-to-many relationship)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/resumem.git
cd resumem
```

2. Start the application using Docker Compose:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- API: http://localhost:8080
- PostgreSQL: localhost:5434

## Development

### Running API Locally
```bash
cd api
go mod download
go run main.go
```

### Running Frontend Locally
```bash
cd client
npm install
npm run dev
```

## Docker Support

The application is containerized using Docker. The `docker-compose.yml` file includes three services:
- `api`: Go backend service
- `client`: Next.js frontend service
- `db`: PostgreSQL database service

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 