# Plumbing Fixtures E-Commerce Project

A full-stack MERN e-commerce application for plumbing fixtures with admin dashboard.

## Features

### Frontend
- React + Vite
- TailwindCSS
- Context API for cart management
- Admin dashboard with nested routing
- Products page with filtering + pagination
- Orders page connected to sales API

### Backend
- Express.js REST API
- MongoDB with Mongoose
- JWT Authentication
- Image upload support
- Stock auto-reduction after sale

## Project Structure

```
plumbing-fixtures/
├── backend/
│   ├── config/          # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Express middleware
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   └── server.js      # Express app entry
│
└── frontend/
    ├── src/
    │   ├── components/ # React components
    │   ├── context/   # React Context (Cart)
    │   ├── layouts/   # Layout components
    │   ├── pages/     # Page components
    │   ├── routes/   # Route definitions
    │   ├── services/  # API service layer
    │   └── config/    # App configuration
    └── index.html
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```
bash
cd backend
```

2. Install dependencies:
```
bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```
env
PORT=5000
MONGO_URI=mongodb://localhost:27017/plumbpro
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLIENT_URL=http://localhost:5173
```

4. Seed admin user:
```
bash
node seedAdmin.js
```

5. Start the server:
```
bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```
bash
cd frontend
```

2. Install dependencies:
```
bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```
env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```
bash
npm run dev
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Auth
- `POST /api/auth/login` - Admin login

### Sales
- `POST /api/sales` - Create sale (public)
- `GET /api/sales` - Get all sales (admin)

### Admin
- `GET /api/admin/stats` - Get dashboard stats (admin)

## Improvements Made

### Backend
1. **Database Models** - Added validation, indexes, and proper schema definitions
2. **Rate Limiting** - Added express-rate-limit for API protection
3. **Error Handling** - Improved error messages and status codes
4. **Health Check** - Added `/health` endpoint
5. **CORS Configuration** - Made configurable via environment variable
6. **Stock Management** - Fixed sale route to auto-reduce stock
7. **Pagination** - Added pagination support to products and sales

### Frontend
1. **API Service Layer** - Centralized API calls with error handling
2. **Cart Persistence** - Cart now persists to localStorage
3. **Token Validation** - Admin route now validates token expiration
4. **Loading States** - Added loading indicators
5. **Error Handling** - Improved user feedback
6. **Code Consistency** - Standardized component patterns

### Security
1. JWT authentication for admin routes
2. Rate limiting on all API routes
3. Input validation on backend models
4. Proper error messages without exposing internals

### Performance
1. MongoDB indexes on frequently queried fields
2. Pagination to limit data transfer
3. Optimized frontend re-renders

## Deployment Recommendations

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS
- [ ] Configure proper CORS origins
- [ ] Set up MongoDB connection pooling
- [ ] Add logging (e.g., morgan)
- [ ] Consider using PM2 for process management
- [ ] Set up monitoring and alerts
- [ ] Configure proper file storage (S3/Cloudinary)

### Scaling Recommendations
1. Add caching with Redis
2. Implement CDN for static assets
3. Use load balancer for multiple instances
4. Consider MongoDB Atlas for managed database
5. Add authentication rate limiting

## License

MIT
