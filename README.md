# Node.js Express API with Docker

A simple Node.js API with Express and Docker containerization.

## Features

- REST API endpoints
- User management (add/view users)
- Static file serving
- Web interface for interaction
- Containerized with Docker

## Installation

1. Clone the repository
2. Install dependencies with `npm install`

## Running Locally

```bash
npm start
```

## Running with Docker

1. Build the Docker image:
```bash
docker build -t node-app .
```

2. Run the Docker container:
```bash
docker run -d -p 3000:3000 --name node-app node-app
```

## Deployment

1. To deploy on EC2 with Docker, use the included deployment script:
```bash
chmod +x deploy-on-ec2.sh
./deploy-on-ec2.sh
```

2. Make sure port 3000 is open in your EC2 security group.

## API Endpoints

- `GET /api` - Returns a welcome message
- `GET /users` - Returns all users
- `POST /users` - Creates a new user
- `GET /users/:age` - Returns a user by age

## Web Interface

Access the web interface by navigating to the root URL:
```
http://localhost:3000/
```

## Testing

Run tests with Mocha:
```bash
npm test
``` 