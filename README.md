# Syndic Gestion de Paiement Cotisation Syndicale

## Project Overview

This project involves the development of a comprehensive web application to manage monthly syndicate dues payments for a real estate management agency. The application is designed to empower property managers with the following key functionalities:

- **Apartment Management:**
  - Creation, modification, and deletion of apartment records.

- **Monthly Payment Management:**
  - Recording and modification of monthly payments for each apartment.

- **Invoice Generation:**
  - Printing invoices for each payment made by an apartment.

## Assigned Tasks

### Backend Development:

- **Technology Stack:**
  - NodeJS (ExpressJs)
  - MongoDB
  - Mongoose as the ODM for database connectivity

- **Unit Testing:**
  - Mandatory unit tests for each backend controller.

- **Middleware Development:**
  - Error handling middleware implementation.
  - JWT-based authentication verification middleware.

- **Route Protection:**
  - Implementation of route protection mechanisms.

### Frontend Development:

- **Technology Stack:**
  - ReactJs

- **React Hooks:**
  - Mandatory use of Hooks (UseState, UseEffect).

- **Nested Routes:**
  - Definition of routes using NestedRoutes for improved organization.

- **Route Protection:**
  - Implementation of route protection measures.

- **Global State Management:**
  - Utilization of Redux or ContextApi for global state management.

### Deployment:

- **Dockerization:**
  - Generation of Docker images for both the Backend and Frontend.
  - Creation of a network to facilitate communication between the two.

## Installation and Execution

1. **Clone the Project:**

   ```bash
   git clone https://github.com/youssefhammani/Syndicate-Payment-Manager.git

   cd Syndicate-Payment-Manager
   ```

2. **Install Dependencies:**

   ```bash
   # Install Backend dependencies
    cd backend
    npm install

    # Install Frontend dependencies
    cd ../frontend
    npm install
   ```

3. **Configuration:**

   - Create a `.env` file in the root of the project and add the required environment variables.

   - Fill it with necessary credentials for database connection, mail server configuration, etc.

     - For example:

      ```env
      PORT=3000
      MONGODB_URI=mongodb://localhost:27017/your-database-name
      JWT_SECRET=your-secret-key
      ```

   - Make sure to replace the values with your specific configuration.

4. **Execution:**

    ```bash
    # Run the Backend
    cd backend
    npm start

    # Run the Frontend
    cd ../frontend
    npm run dev
    ```

## API Documentation

- For detailed information on the API endpoints and how to use them, please refer to our [API Documentation](documents/api-docs.md).

  - Use tools like [Postman](https://www.postman.com/) to test and interact with the API.

## Testing

- The app uses Jest as its testing framework. To run tests, simply type: 

   ```bash
   npm test
   ```

## Docker Setup Guide

- For comprehensive details on configuring Docker and utilizing its features, please consult our [Docker Setup Guide](documents/Docker_Setup_Guide.md).

## Contributing

- Please follow the guidelines in [CONTRIBUTING.md](documents/CONTRIBUTING.md) to contribute to this project.

## Conclusion

- The Syndic Gestion de Paiement Cotisation Syndicale project aims to streamline and enhance the management of monthly syndicate dues payments, providing a robust solution for real estate agencies. With a feature-rich API and a well-designed frontend, this project leverages modern technologies and best practices in software development.

- As we continue to evolve and refine this project, we welcome contributions from the community. Whether you are a developer, designer, or enthusiast, your ideas and efforts can help make this project even more impactful.

- Thank you for considering and contributing to the Syndic Gestion de Paiement Cotisation Syndicale project. Together, we can create a powerful and efficient solution for managing syndicate dues payments in the real estate industry.

    - For any questions, concerns, or suggestions, feel free to reach out to us. Your feedback is invaluable.

## License

- This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

- GitHub: [github.com/youssefhammani](https://github.com/youssefhammani)
- Email: [yhammani.dev@gmail.com](mailto:yhammani.dev@gmail.com)