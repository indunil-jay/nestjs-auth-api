# NestJS Authentication Project

## Overview

This project is a comprehensive implementation of an advanced authentication and authorization system using **NestJS**, **TypeScript**, and **PostgreSQL**. The system is designed to handle a variety of modern authentication mechanisms and robust authorization strategies to secure APIs effectively.

---

## Features

### Authentication

1. **Credential-Based Login**:
   - Traditional username and password authentication.
   - Secure password hashing using bcrypt.
2. **Google OAuth Integration**:
   - Social login functionality using Google's OAuth2.0.
3. **JWT Authentication**:
   - Stateless authentication using JSON Web Tokens.
   - Includes refresh token rotation for enhanced security.

### Authorization

1. **Role-Based Access Control (RBAC)**:
   - Define user roles (e.g., Admin, User) with specific permissions.
   - Simplifies managing access at a high level.
2. **Claims-Based Authorization**:
   - Grant permissions based on user claims or attributes.
3. **Policy-Based Authorization**:
   - Implement custom policies to evaluate complex access rules.

### Security Enhancements

1. **API Keys as Secondary Credentials**:
   - Allow access to APIs using API keys in addition to primary credentials.
2. **Two-Factor Authentication (2FA)**:
   - Add an extra layer of security using OTPs.
3. **JWT Token Rotation**:
   - Automatically rotate refresh tokens upon use to prevent token reuse.
   - Invalidate old tokens securely.

---

## Technologies Used

- **NestJS**: A progressive Node.js framework for building scalable server-side applications.
- **TypeScript**: Ensures type safety and better developer productivity.
- **Bcrypt**: For securely hashing passwords.
- **JSON Web Tokens (JWT)**: For stateless authentication.
- **2FA Libraries**: For generating and validating one-time passwords.
