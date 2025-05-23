#!/bin/bash

# Build Docker image
docker build -t yourusername/node-app:latest .

# Push to Docker Hub
docker push yourusername/node-app:latest

# Deploy to EC2 (requires SSH key setup)
ssh -i your-key.pem ec2-user@your-ec2-public-ip << 'EOF'
  docker pull yourusername/node-app:latest
  docker stop node-app || true
  docker rm node-app || true
  docker run -d --name node-app -p 3000:3000 yourusername/node-app:latest
EOF

echo "Deployment completed!" 