# 🔗 Shorty - URL Shortener

A modern, full-stack URL shortening application built with React, Express.js, and PostgreSQL. Transform long URLs into short, memorable links with custom aliases and track your link history.

## ✨ Features

- 🔐 **User Authentication** - Secure signup and login with JWT tokens
- 🎯 **Custom Aliases** - Create memorable short links with custom names
- ⚡ **Instant Shortening** - Generate short URLs in seconds
- 📊 **URL History** - Track and manage all your shortened URLs
- 🎨 **Modern UI** - Beautiful dark-themed interface with glassmorphism effects
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔄 **Real-time Updates** - See your shortened URLs immediately
- 🗑️ **URL Management** - Copy, open, or delete URLs with one click

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **Zod** - Schema validation

### Backend
- **Node.js & Express** - Server framework
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database (Neon)
- **JWT** - Authentication
- **Nanoid** - Short code generation
- **Crypto** - Password hashing

### DevOps & Hosting
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **Neon** - PostgreSQL database
- **pnpm** - Package manager

## 🔄 Project Flow

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                            USER                                 │
│                    (Browser/Mobile)                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL (Frontend)                            │
│              https://your-app.vercel.app                        │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  React SPA (Single Page Application)                      │ │
│  │  • Vite Build                                             │ │
│  │  • Redux State Management                                 │ │
│  │  • React Router (Client-side routing)                     │ │
│  │  • Tailwind CSS (Styling)                                 │ │
│  └───────────────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTPS API Calls (Axios)
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  RENDER (Backend API)                           │
│         https://url-shortener-backend.onrender.com              │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  Express.js REST API                                       │ │
│  │                                                            │ │
│  │  Public Routes:                                            │ │
│  │  • GET  /:shortCode → Redirect to original URL            │ │
│  │                                                            │ │
│  │  Auth Routes:                                              │ │
│  │  • POST /user/signup → Create account                     │ │
│  │  • POST /user/login  → Get JWT token                      │ │
│  │                                                            │ │
│  │  Protected Routes (JWT Required):                         │ │
│  │  • POST   /shorten → Create short URL                     │ │
│  │  • GET    /codes   → Get user's URLs                      │ │
│  │  • DELETE /:id     → Delete URL                           │ │
│  │                                                            │ │
│  │  Middleware:                                               │ │
│  │  • CORS (Allow Vercel origin)                             │ │
│  │  • JWT Authentication                                      │ │
│  │  • Request Validation (Zod)                               │ │
│  └───────────────────────┬───────────────────────────────────┘ │
└─────────────────────────┼────────────────────────────────────────┘
                          │
                          │ SQL Queries (Drizzle ORM)
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│               NEON (PostgreSQL Database)                        │
│      postgresql://ep-xxx.region.aws.neon.tech                  │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  Tables:                                                   │ │
│  │                                                            │ │
│  │  users                                                     │ │
│  │  ├─ id (UUID, Primary Key)                                │ │
│  │  ├─ firstname (VARCHAR)                                   │ │
│  │  ├─ lastname (VARCHAR)                                    │ │
│  │  ├─ email (VARCHAR, Unique)                               │ │
│  │  ├─ password (TEXT, Hashed)                               │ │
│  │  ├─ salt (TEXT)                                           │ │
│  │  └─ createdAt, updatedAt (TIMESTAMP)                      │ │
│  │                                                            │ │
│  │  urls                                                      │ │
│  │  ├─ id (UUID, Primary Key)                                │ │
│  │  ├─ ShortCode (VARCHAR, Unique)                           │ │
│  │  ├─ targetURL (TEXT)                                      │ │
│  │  ├─ userId (UUID, Foreign Key → users.id)                 │ │
│  │  └─ createdAt, updatedAt (TIMESTAMP)                      │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### User Journey Flow

#### 1️⃣ **User Signup Flow**

```
User fills signup form
       ↓
Frontend validates input (Zod)
       ↓
POST /user/signup {firstname, lastname, email, password}
       ↓
Backend validates request
       ↓
Hash password with random salt (HMAC-SHA256)
       ↓
Insert user into database
       ↓
Return userId
       ↓
Frontend shows success toast
       ↓
Redirect to login
```

#### 2️⃣ **User Login Flow**

```
User enters email & password
       ↓
Frontend validates input
       ↓
POST /user/login {email, password}
       ↓
Backend finds user by email
       ↓
Hash provided password with user's salt
       ↓
Compare hashed passwords
       ↓
Generate JWT token (contains user.id)
       ↓
Return token to frontend
       ↓
Store token in localStorage
       ↓
Redirect to dashboard
```

#### 3️⃣ **URL Shortening Flow**

```
User enters long URL + optional custom alias
       ↓
Frontend validates URL format
       ↓
POST /shorten {url, code?}
Headers: Authorization: Bearer <token>
       ↓
Backend middleware validates JWT token
       ↓
Extract userId from token
       ↓
Generate shortCode:
  • If custom alias provided → use it
  • Else → generate random 6-char code (nanoid)
       ↓
Insert URL into database
  {ShortCode, targetURL, userId}
       ↓
Return {id, shortCode, targetURL}
       ↓
Frontend shows success message
       ↓
Display shortened URL with copy/open buttons
       ↓
Fetch updated URL list
```

#### 4️⃣ **URL Redirect Flow**

```
User visits: https://your-app.vercel.app/abc123
       ↓
Frontend React Router catches /:shortCode
       ↓
Frontend redirects to backend:
  window.location.href = 'https://backend.onrender.com/abc123'
       ↓
Backend receives GET /abc123
       ↓
Query database for shortCode = 'abc123'
       ↓
Find targetURL
       ↓
Return HTTP 302 Redirect to targetURL
       ↓
Browser redirects to original URL
```

#### 5️⃣ **View URL History Flow**

```
User navigates to dashboard
       ↓
Frontend loads with authentication
       ↓
GET /codes
Headers: Authorization: Bearer <token>
       ↓
Backend validates JWT token
       ↓
Extract userId from token
       ↓
Query database for all URLs where userId matches
       ↓
Return array of URL objects
       ↓
Frontend displays URLs in list
  • Short URL
  • Original URL
  • Creation time
  • Copy/Open/Delete buttons
```

#### 6️⃣ **Delete URL Flow**

```
User clicks delete button
       ↓
Frontend shows confirmation dialog
       ↓
User confirms deletion
       ↓
DELETE /:id
Headers: Authorization: Bearer <token>
       ↓
Backend validates JWT token
       ↓
Extract userId from token
       ↓
Delete URL where id matches AND userId matches
  (Ensures users can only delete their own URLs)
       ↓
Return {deleted: true}
       ↓
Frontend removes URL from Redux state
       ↓
Show success toast
```

### State Management Flow (Redux)

```
┌─────────────────────────────────────────┐
│          Redux Store                    │
│                                         │
│  authSlice:                             │
│  ├─ token: string | null                │
│  ├─ isAuthenticated: boolean            │
│  ├─ loading: boolean                    │
│  └─ error: string | null                │
│                                         │
│  urlSlice:                              │
│  ├─ urls: Array<URL>                    │
│  ├─ currentUrl: URL | null              │
│  ├─ loading: boolean                    │
│  └─ error: string | null                │
└─────────────────────────────────────────┘
         ↕                    ↕
    Components           API Calls
    (useSelector)        (dispatch)
         ↕                    ↕
    ┌─────────┐        ┌──────────┐
    │  Auth   │        │  Axios   │
    │  Page   │        │ Instance │
    └─────────┘        └──────────┘
         ↕                    ↕
    ┌─────────┐        ┌──────────┐
    │Dashboard│        │ Backend  │
    │  Page   │        │   API    │
    └─────────┘        └──────────┘
```

### Authentication Flow Details

```
┌──────────────────────────────────────────────────────────┐
│  JWT Token Structure                                     │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Header:                                                 │
│  {                                                       │
│    "alg": "HS256",                                       │
│    "typ": "JWT"                                          │
│  }                                                       │
│                                                          │
│  Payload:                                                │
│  {                                                       │
│    "id": "550e8400-e29b-41d4-a716-446655440000"         │
│  }                                                       │
│                                                          │
│  Signature:                                              │
│  HMACSHA256(                                             │
│    base64UrlEncode(header) + "." +                       │
│    base64UrlEncode(payload),                             │
│    JWT_SECRET                                            │
│  )                                                       │
│                                                          │
└──────────────────────────────────────────────────────────┘

Every protected request includes:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Backend middleware:
1. Extracts token from header
2. Verifies signature with JWT_SECRET
3. Decodes payload to get user.id
4. Attaches user to request object
5. Continues to route handler
```

### Data Flow Summary

```
Frontend (React)
    ↓ User Action
Redux Action Dispatched
    ↓
API Call (Axios)
    ↓ HTTP Request + JWT Token
Backend Route Handler
    ↓
Middleware (Auth + Validation)
    ↓
Business Logic
    ↓
Database Query (Drizzle ORM)
    ↓ SQL Query
PostgreSQL (Neon)
    ↓ Query Result
Backend Response
    ↓ HTTP Response
Redux State Updated
    ↓
React Component Re-renders
    ↓
UI Updates
```

## 📁 Project Structure

```
url-shortener/
├── backend/
│   ├── db/
│   │   └── index.js              # Database connection
│   ├── models/
│   │   ├── index.js
│   │   ├── user.model.js         # User schema
│   │   └── url.model.js          # URL schema
│   ├── routes/
│   │   ├── user.route.js         # Auth routes
│   │   └── url.route.js          # URL routes
│   ├── middlewares/
│   │   └── auth.middleware.js    # JWT authentication
│   ├── services/
│   │   └── user.service.js       # User business logic
│   ├── utils/
│   │   ├── hash.js               # Password hashing
│   │   └── token.js              # JWT utilities
│   ├── validation/
│   │   ├── request.validation.js # Request schemas
│   │   └── token.validation.js   # Token schemas
│   ├── index.js                  # Entry point
│   ├── drizzle.config.js         # Drizzle configuration
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Layout.jsx        # App layout
    │   │   ├── UrlForm.jsx       # URL creation form
    │   │   └── UrlList.jsx       # URL history list
    │   ├── pages/
    │   │   ├── Auth.jsx          # Login/Signup page
    │   │   ├── Dashboard.jsx     # Main dashboard
    │   │   └── Redirect.jsx      # Short URL redirect
    │   ├── store/
    │   │   ├── store.js          # Redux store
    │   │   ├── authSlice.js      # Auth state
    │   │   └── urlSlice.js       # URL state
    │   ├── api.js                # API service
    │   ├── App.jsx               # Root component
    │   ├── main.jsx              # Entry point
    │   └── index.css             # Global styles
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

## 📚 API Documentation

### Authentication

#### **POST** `/user/signup`
Create a new user account.

**Request Body:**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

#### **POST** `/user/login`
Login and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### URL Shortening

#### **POST** `/shorten`
Create a shortened URL (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "url": "https://example.com/very/long/url",
  "code": "my-link"  // optional custom alias
}
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "shortCode": "my-link",
  "targetURL": "https://example.com/very/long/url"
}
```

#### **GET** `/codes`
Get all URLs for authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "codes": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "ShortCode": "my-link",
      "targetURL": "https://example.com/very/long/url",
      "createdAt": "2026-01-17T10:30:00Z",
      "updatedAt": "2026-01-17T10:30:00Z"
    }
  ]
}
```

#### **DELETE** `/:id`
Delete a URL (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "deleted": true
}
```

#### **GET** `/:shortCode`
Redirect to original URL (public).

**Response:**
```
302 Redirect to target URL
```

## 🔒 Security Features

- ✅ **Password Hashing** - Passwords are hashed using HMAC-SHA256 with random salt
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Input Validation** - All inputs validated with Zod schemas
- ✅ **CORS Protection** - Configured to allow only trusted origins
- ✅ **SQL Injection Prevention** - Using parameterized queries with Drizzle ORM
- ✅ **HTTPS Enforced** - All production traffic over HTTPS

## 🐛 Troubleshooting

### CORS Error
**Problem**: API calls fail with CORS error

**Solution**: Update backend CORS configuration with your frontend URL

```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend.vercel.app']
}));
```

### Database Connection Failed
**Problem**: Cannot connect to database

**Solution**: Verify your Neon connection string includes `?sslmode=require`

### JWT Token Invalid
**Problem**: Authentication fails after deployment

**Solution**: Ensure `JWT_SECRET` matches between local and production

### Short URLs Not Working
**Problem**: Redirects return 404

**Solution**: 
- Check `VITE_APP_URL` is set correctly
- Verify backend redirect route is working
- Clear browser cache

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Abhinav Sharma**
- GitHub: [Abhinav Sharma](https://github.com/Abhinavsharma005)
- Email: sharmaabhinav1013@gmail.com

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI Library
- [Express.js](https://expressjs.com/) - Backend Framework
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Frontend Hosting
- [Render](https://render.com/) - Backend Hosting
- [Neon](https://neon.tech/) - PostgreSQL Database

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ using React, Express, and PostgreSQL**
