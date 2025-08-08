# OAuth2 Keycloak Demo – Node.js Frontend + Rust Backend

This is a simple **OAuth2 authentication demo** using **Keycloak**, featuring:

- A **Node.js (Express)** frontend running on `http://localhost:3000`
- A separate **Rust backend** (can be integrated with authenticated data)
- **OAuth2 Authorization Code Flow** with Keycloak

---

## 🧱 Architecture Overview

| Component       | Description                                              | URL                        |
|-----------------|----------------------------------------------------------|----------------------------|
| 🔵 Frontend     | Node.js (Express) app handling login, redirects, token exchange, and user info display | `http://localhost:3000`    |
| 🦀 Backend (API) | Rust server (can be secured using Keycloak tokens)       | `http://localhost:8001` *(example)* |
| 🔐 Identity     | Keycloak server                                           | `http://localhost:8280`    |

---

## ✅ Features

- Login via Keycloak using Authorization Code Flow
- Token exchange and access token validation
- Fetch user profile data after login
- User registration via Keycloak UI (enabled in realm settings)
- Session persistence until explicit logout
- Simple `/hello` route to test Express server responsiveness

---

## 📦 Prerequisites

- Node.js (v14+)
- Rust (optional, if integrating backend)
- Keycloak server running locally or via Docker

---

## 🗂️ Keycloak Configuration

1. **Realm**: `myrealm`
2. **Client**: `my-node-app`
   - Access Type: `confidential`
   - Valid Redirect URI: `http://localhost:3000/callback`
   - Client Secret: `hRfsDWRObeNF6yGXgu0sc5dbetGYBugD`
3. **User Registration**: Enable user registration in the realm’s Login settings for new users to sign up.
4. **Users**: Create test users or allow new users to register via Keycloak’s registration page.

---

## 🧰 Setup

### 1. Run Keycloak

```bash
docker rm -f keycloak || true
docker run -p 8280:8080 --name keycloak \
  -e KEYCLOAK_ADMIN=nafisa \
  -e KEYCLOAK_ADMIN_PASSWORD=nafisa \
  quay.io/keycloak/keycloak:24.0.1 start-dev
