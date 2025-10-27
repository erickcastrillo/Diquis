# Authentication Flow Diagram

This document illustrates the authentication flow for the Diquis Football API.

## 🔄 Complete Authentication Flow

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                          AUTHENTICATION FLOW                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐
│   Client    │
│ Application │
└──────┬──────┘
       │
       │ 1. POST /auth/sign_up
       │    { "user": { "email": "...", "password": "..." } }
       ▼
┌──────────────────────────────────────────────────────────────┐
│  Auth::RegistrationsController                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 1. Validate user params                            │     │
│  │ 2. Create user in database                         │     │
│  │ 3. Hash password with bcrypt                       │     │
│  │ 4. Generate UUID slug                              │     │
│  └────────────────────────────────────────────────────┘     │
└────────────────┬─────────────────────────────────────────────┘
                 │
                 │ User created successfully
                 ▼
┌──────────────────────────────────────────────────────────────┐
│  Devise JWT Module                                            │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 1. Generate JWT token                              │     │
│  │    - Include user.id in payload                    │     │
│  │    - Sign with secret key                          │     │
│  │    - Set expiration (24 hours)                     │     │
│  └────────────────────────────────────────────────────┘     │
└────────────────┬─────────────────────────────────────────────┘
                 │
                 │ 2. Response with token
                 │    Status: 201 Created
                 │    Header: Authorization: Bearer <JWT_TOKEN>
                 │    Body: { "data": { user details }, "message": "..." }
                 ▼
       ┌─────────────────┐
       │   Client        │
       │ (Stores token)  │
       └────────┬────────┘
                │
                │ 3. POST /auth/sign_in
                │    { "user": { "email": "...", "password": "..." } }
                ▼
┌──────────────────────────────────────────────────────────────┐
│  Auth::SessionsController                                     │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 1. Find user by email                              │     │
│  │ 2. Verify password with bcrypt                     │     │
│  │ 3. Return 401 if invalid                           │     │
│  └────────────────────────────────────────────────────┘     │
└────────────────┬─────────────────────────────────────────────┘
                 │
                 │ Valid credentials
                 ▼
┌──────────────────────────────────────────────────────────────┐
│  Devise JWT Module                                            │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 1. Generate new JWT token                          │     │
│  │ 2. Return token in Authorization header            │     │
│  └────────────────────────────────────────────────────┘     │
└────────────────┬─────────────────────────────────────────────┘
                 │
                 │ 4. Response with token
                 │    Status: 200 OK
                 │    Header: Authorization: Bearer <NEW_JWT_TOKEN>
                 ▼
       ┌─────────────────┐
       │   Client        │
       │ (Updates token) │
       └────────┬────────┘
                │
                │ 5. GET /api/v1/protected_resource
                │    Header: Authorization: Bearer <JWT_TOKEN>
                ▼
┌──────────────────────────────────────────────────────────────┐
│  ApplicationController                                        │
│  ┌────────────────────────────────────────────────────┐     │
│  │ before_action :authenticate_user!                  │     │
│  └────────────────────────────────────────────────────┘     │
└────────────────┬─────────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────┐
│  Devise JWT Validation                                        │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 1. Extract token from Authorization header         │     │
│  │ 2. Verify signature with secret key                │     │
│  │ 3. Check expiration (< 24 hours)                   │     │
│  │ 4. Check if token is in denylist                   │     │
│  │ 5. Return 401 if invalid/expired/revoked           │     │
│  └────────────────────────────────────────────────────┘     │
└────────────────┬─────────────────────────────────────────────┘
                 │
                 │ Token valid
                 ▼
┌──────────────────────────────────────────────────────────────┐
│  Load current_user                                            │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 1. Decode token payload                            │     │
│  │ 2. Extract user_id from payload                    │     │
│  │ 3. Load User from database                         │     │
│  └────────────────────────────────────────────────────┘     │
└────────────────┬─────────────────────────────────────────────┘
                 │
                 │ 6. Process request with authenticated user
                 │    Status: 200 OK
                 │    Body: { requested data }
                 ▼
       ┌─────────────────┐
       │   Client        │
       │ (Uses response) │
       └────────┬────────┘
                │
                │ 7. DELETE /auth/sign_out
                │    Header: Authorization: Bearer <JWT_TOKEN>
                ▼
┌──────────────────────────────────────────────────────────────┐
│  Auth::SessionsController                                     │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 1. Validate token and load current_user            │     │
│  │ 2. Return 401 if invalid                           │     │
│  └────────────────────────────────────────────────────┘     │
└────────────────┬─────────────────────────────────────────────┘
                 │
                 │ Valid token
                 ▼
┌──────────────────────────────────────────────────────────────┐
│  Devise JWT Revocation                                        │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 1. Extract jti (JWT ID) from token                 │     │
│  │ 2. Add to jwt_denylists table                      │     │
│  │ 3. Token now invalid for future requests           │     │
│  └────────────────────────────────────────────────────┘     │
└────────────────┬─────────────────────────────────────────────┘
                 │
                 │ 8. Response
                 │    Status: 200 OK
                 │    Body: { "message": "Logged out successfully" }
                 ▼
       ┌─────────────────┐
       │   Client        │
       │ (Clears token)  │
       └─────────────────┘
```text

## 🔑 Token Structure

```text
JWT Token = HEADER.PAYLOAD.SIGNATURE

HEADER (Base64 encoded):
{
  "alg": "HS256",    // HMAC SHA-256 algorithm
  "typ": "JWT"       // Token type
}

PAYLOAD (Base64 encoded):
{
  "sub": "123",           // User ID (subject)
  "jti": "unique-id",     // JWT ID for revocation
  "exp": 1729584000,      // Expiration timestamp (24 hours)
  "iat": 1729497600,      // Issued at timestamp
  "scp": "user"           // Scope
}

SIGNATURE (HMAC SHA-256):
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  devise_jwt_secret_key
)
```text

## 📊 Database Tables

```text
┌─────────────────────────────────────────────────────────────┐
│ USERS TABLE                                                  │
├──────────────────┬──────────────────────────────────────────┤
│ id               │ Primary key                              │
│ email            │ Unique, required                         │
│ encrypted_password│ bcrypt hashed password                  │
│ slug             │ UUID, unique                             │
│ first_name       │ Optional                                 │
│ last_name        │ Optional                                 │
│ is_system_admin  │ Boolean, default: false                  │
│ reset_password_token │ For password recovery                │
│ remember_created_at │ For "remember me" feature            │
│ created_at       │ Timestamp                                │
│ updated_at       │ Timestamp                                │
└──────────────────┴──────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ JWT_DENYLISTS TABLE                                          │
├──────────────────┬──────────────────────────────────────────┤
│ id               │ Primary key                              │
│ jti              │ JWT ID (unique), indexed                 │
│ exp              │ Expiration timestamp                     │
│ created_at       │ Timestamp                                │
│ updated_at       │ Timestamp                                │
└──────────────────┴──────────────────────────────────────────┘
```text

## 🛡️ Security Measures

### 1. Password Security

```text
Plain Password → bcrypt hash (cost: 12) → Database
"password123" → "$2a$12$K..." → encrypted_password column
```text

### 2. Token Security

```text
User Data + Secret Key → JWT Token
Verification: JWT Token + Secret Key → User Data (if valid)
```text

### 3. Token Revocation

```text
Logout → Add JTI to denylist → Token becomes invalid
Future request with that token → 401 Unauthorized
```text

## ⏱️ Token Lifecycle

```text
Token Creation (Sign In)
       │
       ├─── Time: 0 hours ─────────────────┐
       │                                     │
       │    Token is VALID                  │
       │    Can access protected endpoints  │
       │                                     │
       ├─── Time: 23 hours ────────────────┤
       │                                     │
       │    Token is VALID                  │
       │    Will expire soon                │
       │                                     │
       ├─── Time: 24 hours ────────────────┤
       │                                     │
       │    Token EXPIRES                   │
       │    Must sign in again              │
       │                                     │
       └─────────────────────────────────────┘

OR

Token Creation (Sign In)
       │
       ├─── User logs out ──────────────────┐
       │                                     │
       │    Token added to denylist         │
       │    Token becomes INVALID           │
       │    immediately                     │
       │                                     │
       └─────────────────────────────────────┘
```text

## 🚦 HTTP Status Codes

| Status | Meaning | When |
|--------|---------|------|
| 200 OK | Success | Successful login, logout, or API call |
| 201 Created | Created | User successfully registered |
| 401 Unauthorized | Auth failed | Invalid credentials or token |
| 422 Unprocessable Entity | Validation error | Invalid registration data |
| 500 Internal Server Error | Server error | Unexpected error |

## 🔍 Request/Response Examples

### Sign Up Request

```http
POST /auth/sign_up HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "user": {
    "email": "john@example.com",
    "password": "securepass123",
    "password_confirmation": "securepass123",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```text

### Sign Up Response

```http
HTTP/1.1 201 Created
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMi...

{
  "data": {
    "id": 123,
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "message": "Signed up successfully"
}
```text

### Protected API Request

```http
GET /api/v1/academies HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMi...
Content-Type: application/json
```text

### Protected API Response (Success)

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "data": [...],
  "meta": {...}
}
```text

### Protected API Response (Unauthorized)

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "error": "You need to sign in or sign up before continuing."
}
```text

## 📝 Notes

1. **Token Storage**: Clients should store the JWT token securely (e.g., in memory, not localStorage due to XSS risks)

2. **Token Transmission**: Always send tokens in the `Authorization: Bearer <token>` header

3. **Token Expiration**: Tokens expire after 24 hours. Clients should handle 401 responses and redirect to login

4. **Token Revocation**: Logged out tokens cannot be reused, even if not yet expired

5. **HTTPS Required**: In production, all authentication requests MUST use HTTPS

6. **Stateless**: The API doesn't maintain session state. Everything needed is in the JWT token

7. **Scalability**: This approach scales horizontally since there's no server-side session storage

## 🔗 Related Documentation

- [API Documentation](./API_AUTHENTICATION.md)
- [Quick Start Guide](./AUTHENTICATION_QUICK_START.md)
- [Setup Instructions](./SETUP_AUTHENTICATION.md)
- [Implementation Checklist](./AUTHENTICATION_CHECKLIST.md)
