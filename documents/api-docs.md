# API DOCUMENTATION <img src="https://keenethics.com/wp-content/uploads/2022/01/rest-api-1.svg" width="100" align="right">

Welcome to the API documentation for the *`Syndicate-Payment-Manager`* project. This document provides a comprehensive guide to the API endpoints and how to interact with them. Please follow the guidelines below to make the most of this documentation.

![Docker Image](https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230630120346/What-is-REST-API.png)

## Base URL

The base URL for all API endpoints is: http://localhost:3000 (or the URL you specified during installation).

## Authentication

This API requires user authentication via JSON Web Tokens (JWT). To access protected routes, include the JWT token in the Authorization header as follows:

```plaintext
Authorization: Bearer YOUR_JWT_TOKEN
```
https://meet.google.com/kmm-kvid-aqy?authuser=0&hs=122&ijlm=1702551964335
## How to Use the API

To interact with the API, append endpoints to the base URL. Here are key examples:

- To access a specific endpoint: **`/api/endpoint`**

### Example

For instance, assuming the base URL is [http://localhost:3000](http://localhost:3000), the process of accessing the user-related endpoint can be illustrated as follows:

- **Example**: **_`Base URL`/API/Endpoint_**
- **Final URL**: **`http://localhost:3000/api/endpoint`**

**Note :** For a comprehensive list of available endpoints and their functionalities, please navigate to: _**[API ENDPOINTS](#api-endpoints)**_

## API Endpoints

**This structure simplifies navigation through the API and ensures clarity when constructing URLs for specific functionalities.**

> [http://localhost:3000/api/endpoint](http://localhost:3000)

You can seamlessly switch the example endpoint for various functionalities:

- To access payments: **`/api/payments`**
- To interact with clients: **`/api/clients`**

**Note :** Explore further by switching the **`endpoint`** for different functionalities.

### Authentication

| Method | Endpoint                         | Description                                                              | Request Body                                                                                                                   | Response                                                                               | Access Control             |
| ------ | -------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | -------------------------- |
| POST   | `/api/auth/register`             | Register a new user (Client or Livreur)                                  | - `name`: User's name<br>- `email`: User's email<br>- `password`: User's password<br>- `role`: User's role (Client or Livreur) | - `id`: User ID<br>- `name`: User name<br>- `email`: User email<br>- `role`: User role | ***Public***               |
| POST   | `/api/auth/login`                | Log in with a registered user's email and password to obtain a JWT token | - `email`: User's email<br>- `password`: User's password                                                                       | JWT token                                                                              | ***Public***               |
| POST   | `/api/auth/forgetpassword`       | Request a password reset for a registered user                           | - `email`: User's email                                                                                                        | Confirmation message                                                                   | ***Public***               |
| PUT    | `/api/auth/resetpassword/:token` | Reset a user's password after receiving a reset token via email          | Request Parameters:<br>- `token`: Reset token received via email<br>Request Body:<br>- `password`: New password                | Confirmation message                                                                   | ***Public***               |
| GET    | `/api/user/:role/me`             | Get the authenticated user's profile based on their role                 | - User profile information                                                                                                     | User profile information                                                               | ***Private (Role-Based)*** |
| POST   | `/api/auth/logout`               | Log out the current authenticated user                                   | - None                                                                                                                         | Logout confirmation message                                                            | ***Private***              |


### Apartments

| Method | Endpoint                               | Description                       | Request Body           | Response                         | Access Control |
| ------ | -------------------------------------- | --------------------------------- | ---------------------- | -------------------------------- | -------------- |
| GET    | `/api/apartments/get-all-apartments`   | Get all registered users          | - None                 | - List of user profiles          | ***Private***  |
| GET    | `/api/apartments/:id`                  | Get specific user by ID           | - None                 | - User profile by ID             | ***Private***  |
| POST   | `/api/apartments`                      | Add new user                      | - User details         | - Created user profile           | ***Admin***    |
| PUT    | `/api/apartments/update-apartment/:id` | Update profile information        | - Updated user details | - Updated user profile           | ***Private***  |
| DELETE | `/api/apartments/delete-apartment/:id` | Delete account                    | - None                 | - Deletion confirmation message  | ***Private***  |
