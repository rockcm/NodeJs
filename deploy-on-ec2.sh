#!/bin/bash

# Pull latest code from GitHub (if using Git)
# Uncomment the line below if you're using Git
# git pull origin main

# Build Docker image
docker build -t rockcm/node-app:latest .

# Stop and remove existing container if it exists
docker stop node-app || true
docker rm node-app || true

# Run new container
docker run -d --name node-app -p 3000:3000 rockcm/node-app:latest

echo "Deployment completed!" 

