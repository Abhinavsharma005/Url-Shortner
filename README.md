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

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **PostgreSQL** database (Neon account)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

2. **Setup Backend**

```bash
cd backend

# Install dependencies
pnpm install

# Create .env file
cat > .env << EOL
DATABASE_URL=postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=8000
EOL

# Push database schema
pnpm db:push

# Start development server
pnpm dev
```

3. **Setup Frontend**

```bash
cd frontend

# Install dependencies
pnpm install

# Create .env file
cat > .env << EOL
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_URL=http://localhost:5173
EOL

# Start development server
pnpm dev
```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8000

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

## 🌐 Deployment

### Deploy Backend to Render

1. **Push your code to GitHub**

2. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - **Root Directory**: `backend`
   - **Build Command**: `pnpm install`
   - **Start Command**: `pnpm start`

3. **Add Environment Variables**
   ```
   DATABASE_URL=your-neon-connection-string
   JWT_SECRET=your-secret-key
   PORT=8000
   ```

4. **Deploy** and copy your backend URL

### Deploy Frontend to Vercel

1. **Install Vercel CLI**
```bash
pnpm add -g vercel
```

2. **Deploy**
```bash
cd frontend
vercel --prod
```

3. **Set Environment Variables** in Vercel Dashboard
   ```
   VITE_API_BASE_URL=https://your-backend.onrender.com
   VITE_APP_URL=https://your-frontend.vercel.app
   ```

4. **Update CORS** in backend with your Vercel URL

## 🔧 Scripts

### Backend
```bash
pnpm dev          # Start development server
pnpm start        # Start production server
pnpm db:push      # Push schema to database
pnpm db:studio    # Open Drizzle Studio
```

### Frontend
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
```

## 🎨 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
PORT=8000
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_URL=http://localhost:5173
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

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

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
