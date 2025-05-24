# Build stage
FROM golang:1.24.1-alpine AS builder

WORKDIR /app

# Install build dependencies for CGO and SQLite
RUN apk add --no-cache gcc musl-dev sqlite-dev

COPY go.mod ./
COPY go.sum ./
RUN go mod download

# Copy all files
COPY . .

ENV CGO_ENABLED=1

# Ensure dependencies are installed
RUN go mod tidy

# Build for Linux
RUN go build -o api

# Final runtime stage
FROM alpine:latest

WORKDIR /root/

# Install runtime dependencies
RUN apk add --no-cache sqlite-libs ca-certificates

# Copy the built binary
COPY --from=builder /app/api .

# Ensure execution permissions
RUN chmod +x api

# Expose the correct port
EXPOSE 8080

# Run the server
CMD ["./api"]
