import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalResources: 15,
    availableResources: 12,
    myActiveRequests: 3,
    myBorrowedItems: 2,
  });
  const [recentRequests, setRecentRequests] = useState([
    {
      _id: '1',
      resource: { name: 'Introduction to Algorithms', type: 'Book' },
      status: 'approved',
      createdAt: new Date('2024-01-15'),
      dueDate: new Date('2024-02-15'),
    },
    {
      _id: '2',
      resource: { name: 'Dell Laptop Model XPS', type: 'Laptop' },
      status: 'borrowed',
      createdAt: new Date('2024-01-20'),
      dueDate: new Date('2024-02-20'),
    },
    {
      _id: '3',
      resource: { name: 'Canon DSLR Camera', type: 'Camera' },
      status: 'pending',
      createdAt: new Date('2024-01-22'),
      dueDate: null,
    },
    {
      _id: '4',
      resource: { name: 'Physics Textbook', type: 'Book' },
      status: 'returned',
      createdAt: new Date('2024-01-10'),
      dueDate: new Date('2024-01-24'),
    },
  ]);
  const [availableResources, setAvailableResources] = useState([
    { _id: '1', name: 'Data Structures Book', type: 'Book', available: true, category: 'Computer Science' },
    { _id: '2', name: 'HP Laptop EliteBook', type: 'Laptop', available: true, category: 'Technology' },
    { _id: '3', name: 'Nikon DSLR Camera', type: 'Camera', available: true, category: 'Photography' },
    { _id: '4', name: 'Calculus Textbook', type: 'Book', available: true, category: 'Mathematics' },
    { _id: '5', name: 'iPad Pro', type: 'Tablet', available: true, category: 'Technology' },
  ]);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setLoading(false);
        return;
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    // If no data found initially, wait a bit and retry
    const timer = setTimeout(() => {
      const retryUserData = localStorage.getItem('user');
      const retryToken = localStorage.getItem('token');
      
      if (retryUserData && retryToken) {
        try {
          const parsedUser = JSON.parse(retryUserData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data on retry:', error);
        }
      }
      
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <span style={{ color: '#f59e0b' }}>⏳</span>;
      case 'approved':
        return <span style={{ color: '#10b981' }}>✅</span>;
      case 'borrowed':
        return <span style={{ color: '#3b82f6' }}>📚</span>;
      case 'rejected':
        return <span style={{ color: '#ef4444' }}>❌</span>;
      case 'returned':
        return <span style={{ color: '#6b7280' }}>↩️</span>;
      default:
        return <span style={{ color: '#6b7280' }}>⏳</span>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'background: #fef3c7; color: #92400e;';
      case 'approved':
        return 'background: #d1fae5; color: #065f46;';
      case 'borrowed':
        return 'background: #dbeafe; color: #1e40af;';
      case 'rejected':
        return 'background: #fee2e2; color: #991b1b;';
      case 'returned':
        return 'background: #f3f4f6; color: #374151;';
      default:
        return 'background: #f3f4f6; color: #374151;';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Book':
        return '📚';
      case 'Laptop':
        return '💻';
      case 'Camera':
        return '📷';
      case 'Tablet':
        return '📱';
      case 'Projector':
        return '📽️';
      default:
        return '📦';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="clean-container">
        <div className="clean-card">
          <h2>Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="clean-container">
        <div className="clean-card">
          <h2>Login Required</h2>
          <p>Please login to view your dashboard</p>
          <Link to="/login" className="clean-button">Go to Login</Link>
        </div>
      </div>
    );
  }

  // Check if user role matches
  if (user.role !== 'student') {
    setTimeout(() => {
      window.location.href = `/${user.role}/dashboard`;
    }, 100);
    return (
      <div className="clean-container">
        <div className="clean-card">
          <h2>Redirecting to correct dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-title">🎓 Academic Resource System</div>
        <div className="user-panel">
          <span>👤 {user.name}</span>
          <button 
            onClick={handleLogout}
            className="logout-btn"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <p>Welcome back, <strong>{user.name}</strong>! 👋</p>
      </div>

      {/* Student Information Card */}
      <div className="info-card">
        <h3>📋 Your Information</h3>
        <div className="info-row">📧 <strong>Email:</strong> {user.email}</div>
        <div className="info-row">🎓 <strong>Student ID:</strong> {user.studentId}</div>
        <div className="info-row">🏢 <strong>Department:</strong> {user.department}</div>
        <div className="info-row">📱 <strong>Phone:</strong> {user.phone}</div>
      </div>

      {/* Quick Statistics */}
      <h2 className="section-title">📊 Quick Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon icon-blue">📚</div>
          <div className="stat-number">{stats.totalResources}</div>
          <div className="stat-label">Total Resources</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-green">✅</div>
          <div className="stat-number">{stats.availableResources}</div>
          <div className="stat-label">Available</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-purple">⏳</div>
          <div className="stat-number">{stats.myActiveRequests}</div>
          <div className="stat-label">Active Requests</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-orange">📋</div>
          <div className="stat-number">{stats.myBorrowedItems}</div>
          <div className="stat-label">Borrowed Items</div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="section-title">🚀 Quick Actions</h2>
      <div style={{
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
        marginBottom: '40px'
      }}>
        <Link to="/student/browse" className="logout-btn" style={{
          background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
          textDecoration: 'none'
        }}>
          📚 Browse Resources
        </Link>
        <Link to="/student/browse" className="logout-btn" style={{
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          textDecoration: 'none'
        }}>
          ➕ New Request
        </Link>
        <Link to="/student/requests" className="logout-btn" style={{
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          textDecoration: 'none'
        }}>
          📋 My Requests
        </Link>
        <Link to="/student/profile" className="logout-btn" style={{
          background: 'linear-gradient(135deg, #6b7280, #9ca3af)',
          textDecoration: 'none'
        }}>
          👤 My Profile
        </Link>
      </div>

      {/* Recent Requests */}
      <h2 className="section-title">📋 Recent Requests</h2>
      <div style={{ display: 'grid', gap: '15px', marginBottom: '30px' }}>
        {recentRequests.slice(0, 3).map((request) => (
          <div key={request._id} className="info-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                  {getTypeIcon(request.resource.type)} {request.resource.name}
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  {new Date(request.createdAt).toLocaleDateString()}
                  {request.dueDate && ` - Due: ${new Date(request.dueDate).toLocaleDateString()}`}
                </div>
              </div>
              <span style={{ 
                padding: '5px 12px', 
                borderRadius: '20px', 
                fontSize: '12px', 
                fontWeight: '600',
                ...getStatusColor(request.status)
              }}>
                {getStatusIcon(request.status)} {request.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Link to="/student/requests" className="logout-btn" style={{
          background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
          textDecoration: 'none',
          padding: '12px 24px'
        }}>
          View All Requests →
        </Link>
      </div>

      {/* Available Resources */}
      <h2 className="section-title">📚 Available Resources</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {availableResources.slice(0, 4).map((resource) => (
          <div key={resource._id} className="info-card" style={{ padding: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
                {getTypeIcon(resource.type)}
              </div>
              <div style={{ fontWeight: '600', marginBottom: '8px' }}>
                {resource.name}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '15px' }}>
                {resource.category}
              </div>
              <Link 
                to={`/student/borrow/${resource._id}`}
                className="logout-btn"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
                  textDecoration: 'none',
                  fontSize: '12px',
                  padding: '8px 16px'
                }}
              >
                Request
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center' }}>
        <Link to="/student/browse" className="logout-btn" style={{
          background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
          textDecoration: 'none',
          padding: '12px 24px'
        }}>
          Browse All Resources →
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
