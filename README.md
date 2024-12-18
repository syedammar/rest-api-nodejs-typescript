# Express REST API Boilerplate (TypeScript, MongoDB, JWT)

Welcome to the boilerplate for building a scalable Express-based REST API written in TypeScript. This project integrates MongoDB as the database, JWT
for authentication, and Role-Based Access Control (RBAC) for authorization.

## Features

-   **TypeScript**: Strongly typed JavaScript for improved code quality.
-   **Express.js**: Minimalist web framework for building APIs.
-   **MongoDB**: NoSQL database with Mongoose ODM for schema modeling.
-   **Authentication & Authorization**:
    -   JSON Web Tokens (JWT) for stateless authentication.
    -   Role-Based Access Control (RBAC) for fine-grained access control.
-   **Error Handling**: Centralized error handling for consistent API responses.
-   **Environment Configuration**: Easy-to-manage `.env` file for environment-specific variables.
-   **Modular Architecture**: Organized folder structure for scalability and maintainability.

---

## Prerequisites

-   Node.js (>= 20.x)
-   npm or yarn
-   MongoDB (>= 8.x)

---

## Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/syedammar/rest-api-nodejs-typescript.git
    cd your-repo-name
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Environment Configuration**: Copy the `.env.example` to `.env` and update the values as required:

    ```bash
    cp .env.example .env
    ```

4. **Run the Application**:
    ```bash
    npm run dev
    ```

---

## Scripts

-   **Development**:
    ```bash
    npm run dev
    ```
-   **Build**:
    ```bash
    npm run build
    ```
-   **Production Start**:
    ```bash
    npm start
    ```
-   **Testing**:
    ```bash
    npm test
    ```

---

## Folder Structure

```plaintext
src/
  |-- config/             # Configuration files (e.g., DB, JWT)
  |-- controllers/        # API controllers
  |-- middlewares/        # Middleware functions
  |-- models/             # Mongoose models
  |-- routes/             # API routes
  |-- server.ts           # Server entry point
```

---

## API Endpoints

### Authentication

-   **POST** `/api/auth/register` - Register a new user.
-   **POST** `/api/auth/login` - Authenticate user and get a JWT.

### Users

-   **GET** `/api/users/:id` - Get user details by ID.
-   **DELETE** `/api/users/:id` - To Delete a user (only admin)
-   **PUT** `/api/users/:id` - To Update a user

### Example Protected Route for user

-   **GET** `/api/users/protected` - Accessible only to authenticated users.

---

## Technologies Used

-   **Framework**: Express.js
-   **Language**: TypeScript
-   **Database**: MongoDB
-   **Authentication**: JWT
-   **Authorization**: Role-Based Access Control (RBAC)

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Feedback

Feel free to open an issue or submit a pull request if you have any suggestions or improvements. Happy coding! 🎉
