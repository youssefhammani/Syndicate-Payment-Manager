# Docker Integration Guide <img src="https://khanh.website/wp-content/uploads/2020/06/dockerfile.png" width="30" align="right">

![Docker Image](https://www.linode.com/docs/guides/how-to-use-dockerfiles/how-to-use-dockerfile.png)

## Overview

This document provides a step-by-step guide on integrating Docker into the `Syndicate-Payment-Manager` project. Dockerization allows for a consistent and reproducible environment, simplifying deployment and ensuring that the `Syndicate-Payment-Manager` application runs seamlessly in various settings. Follow these instructions to dockerize the `Syndicate-Payment-Manager` application and validate its functionality within a Docker container.

## Table of Contents

- [Docker Integration Guide ](#docker-integration-guide-)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Docker Installation](#docker-installation)
    - [1. Creating the Dockerfile](#1-creating-the-dockerfile)
    - [Additional Notes](#additional-notes)
    - [2. Building the Docker Image](#2-building-the-docker-image)
    - [3. Running the Docker Container](#3-running-the-docker-container)
    - [4. Access the Application](#4-access-the-application)
    - [5. Stopping the Application](#5-stopping-the-application)
    - [6. Validation](#6-validation)
  - [Additional Configuration and Customization](#additional-configuration-and-customization)
  - [Resources and Further Information](#resources-and-further-information)
  - [Support](#support)

## Docker Installation

Before proceeding, ensure that Docker is installed on your development machine. Follow the official Docker installation guide for your operating system: [Docker Installation Guide](https://docs.docker.com/get-docker/)

### 1. Creating the Dockerfile

Create a Dockerfile in the root directory of your `Syndicate-Payment-Manager` project. The Dockerfile contains instructions for building the Docker image, including dependencies, configurations, and the runtime environment. A sample Dockerfile is provided below:

```Dockerfile
# Use an official Node.js runtime as the base image
FROM node:20.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install --silent

# Copy the rest of the application files
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Command to start the application development server
CMD ["npm", "start"]
```

### Additional Notes

- This Dockerfile assumes a standard Node.js and Express.js setup. Adjustments may be needed based on the specific requirements and structure of your backend application.

- If additional configuration files or environment variables are required, they should be included and documented in this Dockerfile.

### 2. Building the Docker Image

- Build the Docker image using the following command in the terminal :

    ```bash
    # Command for building the Docker image

    docker build -t your-image-name .
    ```

  - **Note :**  Replace `your-image-name` with the desired name for your Docker image.

This command instructs Docker to build an image named `your-image-name` based on the instructions in the Dockerfile.

### 3. Running the Docker Container

- Run the Docker container using the following command :

    ```bash
    # Command for running the Docker container

    docker run -d image-name

    # Or

    docker run -p 3000:3000 -d your-image-name

    # Or

    docker run -p 5000:5000 --name your-container-name -d your-image-name
    ```

  - **Note :**  Replace `your-container-name` with the desired name for your Docker container.

This command maps port 3000 on your host machine to port 3000 in the Docker container. Adjust the ports as needed.

> This will launch the application containers in detached mode.

### 4. Access the Application

- Open a web browser and navigate to http://localhost:your-port (replace `your-port` with the specified port in `.env`) to access the running application.

### 5. Stopping the Application

- To stop the application and remove the containers, run:

    ```bash
    docker-compose down
    ```

### 6. Validation

- Access the `Syndicate-Payment-Manager` application in your web browser at http://localhost:3000. Ensure that the application functions correctly within the Docker container.

## Additional Configuration and Customization

- **Environment Variables:**

    Adjust environment variables in the `.env` file or directly in the Dockerfile for configuration customization.

- **Docker Compose:**

    If your project involves multiple containers, consider using Docker Compose for managing the entire application stack. Refer to the `docker-compose.md` file for Docker Compose configuration details.

## Resources and Further Information

- Refer to Docker's official documentation for detailed information on Docker commands, Dockerfile configurations, and Docker-compose usage.

[Click here](./Docker_Setup_Guide.md#docker-cli-commands) for the full Docker CLI guide.

## Support

For assistance or questions related to Docker setup, contact our support team at [yhammani.dev@gmail.com](mailto:yhammani.dev@gmail.com).

Happy coding!