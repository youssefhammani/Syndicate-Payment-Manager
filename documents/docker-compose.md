# Docker Compose Configuration Guide <img src="https://miro.medium.com/v2/resize:fit:700/1*s8I4jBW2KKP687LqWh3OtQ.png" width="45" align="right">

![Docker Image](https://quintagroup.com/cms/technology/Images/docker-compose-button.jpg)

This document provides information on configuring and using Docker Compose for a multi-container setup with a Node.js backend and a React.js frontend.

## Docker Compose Files

In a multi-container setup, Docker Compose is used to define and manage the services that make up the application. There are two primary Docker Compose files used in this example:

1. **`docker-compose.yml`**: Used for development and local testing.
2. **`docker-compose.prod.yml`**: Used for production deployment.

### `docker-compose.yml` Configuration

This file is used for local development and testing. It defines services for the Node.js backend, React.js frontend, and MongoDB database.

```yaml
version: '3'
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=development
      - PORT=5000
      - MONGO_URI=mongodb://mongo:27017/your-database-name

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_BACKEND_URL=http://backend:5000

  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

### Commands for Local Development

- #### 1. Build Images and Start Containers

    ```bash
    docker-compose up
    ```

This will launch the application containers in detached mode.

- #### 2. Access the Application

  - Web Application: http://localhost:your-port (replace `your-port` with the specified port in `.env`)

- #### 3. Stopping the Application

  - To stop the application and remove the containers, run:

    ```bash
    docker-compose down
    ```

- #### 4. Maintenance and Updates

  - Pull the latest changes from the repository :

    ```bash
    git pull
    ```

  - Rebuild and restart the Docker containers:

    ```bash
    docker-compose down
    docker-compose build
    docker-compose up -d
    ```

### `docker-compose.prod.yml` Configuration

This file is used for production deployment. It builds and configures production-ready Docker images.

```yaml
version: '3'
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    environment:
      - NODE_ENV=production
      - PORT=5000
      - MONGO_URI=mongodb://mongo:27017/your-database-name

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    environment:
      - REACT_APP_BACKEND_URL=http://backend:5000

  mongo:
    image: mongo
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=admin-password
      - MONGO_INITDB_DATABASE=your-database-name

volumes:
  mongo-data:
```

### Commands for Production Deployment

- #### 1. Build Production Images

    ```bash
    docker-compose -f docker-compose.prod.yml build
    ```

- #### 2. Start Production Containers

    ```bash
    docker-compose -f docker-compose.prod.yml up -d
    ```

- #### 3. Stop and Remove Production Containers
  
    ```bash
    docker-compose -f docker-compose.prod.yml down
    ```

## Additional Notes

- **Environment Variables :**

    Adjust environment variables in the .env file for local development and in the production environment as needed.

- **Dockerfile Configuration :**

    Refer to `docker-file.md` for details on configuring the Dockerfiles for backend and frontend services.

## Resources and Further Information

- Refer to Docker's official documentation for detailed information on Docker commands, Dockerfile configurations, and Docker-compose usage.

[Click here](./Docker_Setup_Guide.md#docker-cli-commands) for the full Docker CLI guide.


## Support

For assistance or questions related to Docker Compose configuration, contact our support team at [yhammani.dev@gmail.com](mailto:yhammani.dev@gmail.com).

Happy composing!