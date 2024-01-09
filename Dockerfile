# syntax=docker/dockerfile:1

# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port that the application will listen on (replace 3000 with your app's port)
EXPOSE 3000

# Define the command to start your application
CMD ["node", "src/index.js"]

# FROM node:18-alpine
# WORKDIR .
# COPY . .
# RUN yarn install --production
# CMD ["node", "src/index.js"]
# EXPOSE 3000
