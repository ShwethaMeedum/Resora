# University Resource Borrowing System

A comprehensive web application for managing university resource borrowing with role-based access control for students, staff, and administrators.

## Features

### 🎓 Student Features
- Browse available resources by category
- Search and filter resources
- Submit borrow requests with purpose and duration
- Track request status and borrowing history
- View overdue items

### 👨‍🏫 Staff Features
- Add, edit, and delete resources
- Manage resource categories
- Approve/reject borrow requests
- Mark items as borrowed/returned
- Change resource status (available/maintenance/retired)
- View all borrow requests and their status

### 📊 Admin Features
- Comprehensive dashboard with system statistics
- Detailed reports and analytics
- Resource utilization metrics
- User activity tracking
- Borrow history with filtering
- Export data to CSV

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

### Frontend
- **React** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **Heroicons** for icons
- **Tailwind CSS** for styling

## Project Structure

```
university-resource-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Category.js           # Resource categories
│   │   ├── Resource.js           # Resource schema
│   │   └── BorrowRequest.js      # Borrow requests
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── resourceController.js # Resource management
│   │   ├── borrowController.js   # Borrow request logic
│   │   └── reportController.js   # Reports and analytics
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication endpoints
│   │   ├── resourceRoutes.js     # Resource endpoints
│   │   ├── borrowRoutes.js       # Borrow request endpoints
│   │   └── reportRoutes.js       # Report endpoints
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT authentication
│   │   └── roleMiddleware.js     # Role-based access
│   ├── utils/
│   │   └── validators.js         # Input validation schemas
│   ├── server.js                 # Express server setup
│   ├── .env                      # Environment variables
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── student/
    │   │   │   ├── StudentDashboard.jsx
    │   │   │   ├── BrowseResources.jsx
    │   │   │   ├── BorrowForm.jsx
    │   │   │   └── MyRequests.jsx
    │   │   ├── staff/
    │   │   │   ├── StaffDashboard.jsx
    │   │   │   ├── ManageResources.jsx
    │   │   │   └── ManageRequests.jsx
    │   │   └── admin/
    │   │       ├── AdminDashboard.jsx
    │   │       └── Reports.jsx
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ResourceCard.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
MONGODB_URI=mongodb://localhost:27017/university-resource-system
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:5173`

## Default Categories

The system includes these default resource categories:
- Laptop
- Calculator
- Lab Kit
- Projector

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Resources
- `GET /api/resources` - Get all resources (with filtering)
- `POST /api/resources` - Add new resource (staff/admin only)
- `PUT /api/resources/:id` - Update resource (staff/admin only)
- `DELETE /api/resources/:id` - Delete resource (staff/admin only)
- `PUT /api/resources/:id/status` - Change resource status (staff/admin only)
- `GET /api/resources/categories` - Get all categories
- `POST /api/resources/categories` - Add new category (staff/admin only)

### Borrow Requests
- `POST /api/borrow` - Create borrow request (students/staff)
- `GET /api/borrow/my` - Get my requests (students/staff)
- `GET /api/borrow/all` - Get all requests (staff/admin only)
- `PUT /api/borrow/:id/approve` - Approve request (staff/admin only)
- `PUT /api/borrow/:id/reject` - Reject request (staff/admin only)
- `PUT /api/borrow/:id/borrowed` - Mark as borrowed (staff/admin only)
- `PUT /api/borrow/:id/return` - Mark as returned (staff/admin only)

### Reports
- `GET /api/reports/dashboard` - Get dashboard statistics (admin only)
- `GET /api/reports/borrow-history` - Get borrow history (admin only)
- `GET /api/reports/resource-utilization` - Get resource utilization (admin only)
- `GET /api/reports/user-activity` - Get user activity (admin only)

## User Roles

### Student
- Can browse and search resources
- Can submit borrow requests
- Can view their own request history
- Cannot manage resources or approve requests

### Staff
- Can perform all student actions
- Can add, edit, and delete resources
- Can approve/reject borrow requests
- Can manage resource status
- Cannot access admin reports

### Admin
- Can perform all staff actions
- Can access comprehensive reports and analytics
- Can view system-wide statistics
- Can export data

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/staff/admin),
  studentId: String (optional, for students),
  department: String,
  phone: String
}
```

### Resource Model
```javascript
{
  name: String,
  category: ObjectId (ref: Category),
  description: String,
  serialNumber: String (unique),
  condition: String (excellent/good/fair/poor),
  status: String (available/borrowed/maintenance/retired),
  location: String,
  addedBy: ObjectId (ref: User),
  totalBorrows: Number (default: 0)
}
```

### BorrowRequest Model
```javascript
{
  resource: ObjectId (ref: Resource),
  borrower: ObjectId (ref: User),
  borrowDate: Date,
  returnDate: Date,
  actualReturnDate: Date,
  status: String (pending/approved/rejected/borrowed/returned/overdue),
  purpose: String,
  approvedBy: ObjectId (ref: User),
  rejectionReason: String,
  notes: String
}
```

## Development Notes

- The system uses JWT tokens for authentication
- Passwords are hashed using bcryptjs
- All API endpoints are protected with appropriate middleware
- The frontend uses React Context for state management
- Responsive design works on desktop and mobile devices
- Real-time status updates when requests are processed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
