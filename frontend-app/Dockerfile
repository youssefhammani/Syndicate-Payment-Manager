# Use an official Node.js runtime as the base image
FROM node:20.0-alpine

# Set the working directory in the container
WORKDIR /src/main

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 4000 for the application
EXPOSE 4000

# Command to start the Vite development server
CMD ["npm", "run", "dev"]
