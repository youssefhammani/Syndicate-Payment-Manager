# API Documentation

Within this API documentation, you will find a comprehensive overview of the project's objectives and functionality.

## Base URL

The base URL for all API endpoints is: *http://localhost:3000* (or the URL you specified during installation).

## Authentication

This API requires user authentication via JSON Web Tokens (JWT). To access protected routes, include the JWT token in the *Authorization* header as follows:

## Table of Routes

- [Authentication](#authentication)
- [Users](#users)
- [Roles](#roles)
- [Orders](#orders)

## Routes :

#### ***Authentication :***

| Method | Endpoint              | Description                        | Access Control |
| ------ | --------------------- | ---------------------------------- | -------------- |
| POST   | /api/auth/register    | Register new user                  | Public         |
| POST   | /api/auth/login       | Authenticate existing users        | Public         |
| GET    | /api/auth/logout      | Log out current authenticated user | Private        |
| PUT    | /api/users/:id/update | Update profile information         | Private        |
| DELETE | /api/users/:id/delete | Delete account                     | Private        |

---
---

#### ***Users :***

| Method | Endpoint                     | Description                       | Request Body           | Response                         | Access Control |
| ------ | ---------------------------- | --------------------------------- | ---------------------- | -------------------------------- | -------------- |
| GET    |  /api/users                  | Get all registered users          | - None                 | - List of user profiles          | ***Private***  |
| GET    |  /api/users/:id              | Get specific user by ID           | - None                 | - User profile by ID             | ***Private***  |
| POST   |  /api/users                  | Add new user                      | - User details         | - Created user profile           | ***Admin***    |
| PUT    |  /api/users/:id/update       | Update profile information        | - Updated user details | - Updated user profile           | ***Private***  |
| DELETE |  /api/users/:id/delete       | Delete account                    | - None                 | - Deletion confirmation message  | ***Private***  |
| PATCH  |  /api/users/:id/assign_role  | Assign role to an existing user   | - Role details         | - Updated user profile with role | ***Admin***    |
| PATCH  |  /api/users/:id/revoke_role  | Revoke role from an existing user | - None                 | - Updated user profile           | ***Admin***    |

---
---

#### ***Roles :***

| Method | Endpoint                | Description                   | Request Body           | Response                        | Access Control |
| ------ | ----------------------- | ----------------------------- | ---------------------- | ------------------------------- | -------------- |
|        |                         |                               |                        |                                 |                |
|        |                         |                               |                        |                                 |                |
|        |                         |                               |                        |                                 |                |
|        |                         |                               |                        |                                 |                |
|        |                         |                               |                        |                                 |                |

---
---

#### ***Orders :***

| Method | Endpoint                     | Description                           | Access Control |
| ------ | ---------------------------- | ------------------------------------- | -------------- |
|        |                              |                                       |                |
|        |                              |                                       |                |
|        |                              |                                       |                |
|        |                              |                                       |                |
|        |                              |                                       |                |
|        |                              |                                       |                |

## Error Handling

- This API handles errors and provides appropriate error messages in JSON format. Please refer to the API documentation for specific error responses for each endpoint.

## Testing

- For testing purposes, you can use the provided test cases and use tools like Postman or cURL to interact with the API endpoints.

<br>

> For any questions or issues related to this API, please [contact the project maintainers](mailto:yhammani.student@gmail.com).
