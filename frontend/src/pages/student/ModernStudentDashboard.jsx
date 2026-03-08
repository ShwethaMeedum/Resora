import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ModernStudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Mock data
  const stats = {
    totalResources: 1247,
    availableResources: 892,
    myActiveRequests: 3,
    myBorrowedItems: 2
  };

  const recentRequests = [
    {
      _id: '1',
      resource: { name: 'Advanced Mathematics Textbook', type: 'book' },
      status: 'approved',
      createdAt: '2024-01-15',
      dueDate: '2024-01-22'
    },
    {
      _id: '2',
      resource: { name: 'Physics Lab Equipment', type: 'equipment' },
      status: 'pending',
      createdAt: '2024-01-14',
      dueDate: null
    },
    {
      _id: '3',
      resource: { name: 'Programming Reference Guide', type: 'book' },
      status: 'borrowed',
      createdAt: '2024-01-10',
      dueDate: '2024-01-17'
    }
  ];

  const availableResources = [
    {
      _id: '1',
      name: 'Data Structures Handbook',
      category: 'Computer Science',
      type: 'book',
      status: 'available'
    },
    {
      _id: '2',
      name: 'Chemistry Lab Kit',
      category: 'Science',
      type: 'equipment',
      status: 'available'
    },
    {
      _id: '3',
      name: 'Engineering Calculator',
      category: 'Mathematics',
      type: 'equipment',
      status: 'available'
    },
    {
      _id: '4',
      name: 'Research Papers Collection',
      category: 'Research',
      type: 'digital',
      status: 'available'
    }
  ];

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'student') {
        navigate('/login');
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      approved: '✅',
      borrowed: '📚',
      returned: '✅',
      rejected: '❌'
    };
    return icons[status] || '📋';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: { background: 'var(--warning-lightest)', color: 'var(--warning-dark)' },
      approved: { background: 'var(--success-lightest)', color: 'var(--success-dark)' },
      borrowed: { background: 'var(--info-lightest)', color: 'var(--info-dark)' },
      returned: { background: 'var(--success-lightest)', color: 'var(--success-dark)' },
      rejected: { background: 'var(--error-lightest)', color: 'var(--error-dark)' }
    };
    return colors[status] || { background: 'var(--gray-100)', color: 'var(--gray-700)' };
  };

  const getTypeIcon = (type) => {
    const icons = {
      book: '📚',
      equipment: '🔬',
      digital: '💻',
      journal: '📖',
      other: '📦'
    };
    return icons[type] || '📦';
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app-container">
        <div className="content-area">
          <div className="empty-state">
            <div className="empty-state-icon">🔐</div>
            <h2 className="empty-state-title">Authentication Required</h2>
            <p className="empty-state-message">Please log in to access your dashboard</p>
            <Link to="/login" className="btn btn-primary">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span>🎓</span>
            <span>Academic Hub</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-item">
            <Link to="/student/dashboard" className="nav-link active">
              <span className="nav-icon">📊</span>
              <span>Dashboard</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/student/browse" className="nav-link">
              <span className="nav-icon">📚</span>
              <span>Browse Resources</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/student/requests" className="nav-link">
              <span className="nav-icon">📋</span>
              <span>My Requests</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/student/borrowed" className="nav-link">
              <span className="nav-icon">📖</span>
              <span>Borrowed Items</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/student/history" className="nav-link">
              <span className="nav-icon">📜</span>
              <span>History</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/student/profile" className="nav-link">
              <span className="nav-icon">👤</span>
              <span>Profile</span>
            </Link>
          </div>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div className="user-details">
              <div className="user-name">{user.name}</div>
              <div className="user-role">Student</div>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-ghost btn-sm">
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Navigation */}
        <header className="top-nav">
          <div className="nav-left">
            <button 
              className="btn btn-ghost btn-icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span>☰</span>
            </button>
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          
          <div className="nav-right">
            <button className="btn btn-ghost btn-icon">
              <span>🔔</span>
            </button>
            <div className="user-menu">
              <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="content-area">
          {/* Welcome Section */}
          <div className="welcome-section fade-in">
            <h1 className="page-title">Welcome back, {user.name}! 👋</h1>
            <p className="page-subtitle">Here's what's happening with your academic resources today.</p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid fade-in-up">
            <div className="widget">
              <div className="widget-header">
                <span className="widget-title">Total Resources</span>
                <div className="widget-icon widget-icon-primary">📚</div>
              </div>
              <div className="widget-value">{stats.totalResources.toLocaleString()}</div>
              <div className="widget-label">Available in library</div>
            </div>
            
            <div className="widget">
              <div className="widget-header">
                <span className="widget-title">Available</span>
                <div className="widget-icon widget-icon-success">✅</div>
              </div>
              <div className="widget-value">{stats.availableResources.toLocaleString()}</div>
              <div className="widget-label">Ready to borrow</div>
            </div>
            
            <div className="widget">
              <div className="widget-header">
                <span className="widget-title">Active Requests</span>
                <div className="widget-icon widget-icon-warning">⏳</div>
              </div>
              <div className="widget-value">{stats.myActiveRequests}</div>
              <div className="widget-label">Pending approval</div>
            </div>
            
            <div className="widget">
              <div className="widget-header">
                <span className="widget-title">Borrowed Items</span>
                <div className="widget-icon widget-icon-info">📖</div>
              </div>
              <div className="widget-value">{stats.myBorrowedItems}</div>
              <div className="widget-label">Currently borrowed</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions fade-in-up">
            <h2 className="section-title">🚀 Quick Actions</h2>
            <div className="action-grid">
              <Link to="/student/browse" className="action-card">
                <div className="action-icon">📚</div>
                <h3 className="action-title">Browse Resources</h3>
                <p className="action-description">Explore our extensive collection</p>
              </Link>
              
              <Link to="/student/requests/new" className="action-card">
                <div className="action-icon">➕</div>
                <h3 className="action-title">New Request</h3>
                <p className="action-description">Request a new resource</p>
              </Link>
              
              <Link to="/student/requests" className="action-card">
                <div className="action-icon">📋</div>
                <h3 className="action-title">My Requests</h3>
                <p className="action-description">Track your borrowing requests</p>
              </Link>
              
              <Link to="/student/profile" className="action-card">
                <div className="action-icon">👤</div>
                <h3 className="action-title">Profile Settings</h3>
                <p className="action-description">Update your information</p>
              </Link>
            </div>
          </div>

          {/* Recent Requests */}
          <div className="recent-requests fade-in-up">
            <div className="section-header">
              <h2 className="section-title">📋 Recent Requests</h2>
              <Link to="/student/requests" className="btn btn-ghost btn-sm">
                View All →
              </Link>
            </div>
            
            <div className="request-list">
              {recentRequests.map((request) => (
                <div key={request._id} className="request-card card">
                  <div className="request-content">
                    <div className="request-header">
                      <div className="request-title">
                        <span className="resource-icon">{getTypeIcon(request.resource.type)}</span>
                        <span>{request.resource.name}</span>
                      </div>
                      <span 
                        className="badge"
                        style={getStatusColor(request.status)}
                      >
                        <span>{getStatusIcon(request.status)}</span>
                        <span>{request.status}</span>
                      </span>
                    </div>
                    <div className="request-meta">
                      <span>Requested: {new Date(request.createdAt).toLocaleDateString()}</span>
                      {request.dueDate && (
                        <span>Due: {new Date(request.dueDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Resources */}
          <div className="available-resources fade-in-up">
            <div className="section-header">
              <h2 className="section-title">📚 Available Resources</h2>
              <Link to="/student/browse" className="btn btn-ghost btn-sm">
                Browse All →
              </Link>
            </div>
            
            <div className="resource-grid">
              {availableResources.map((resource) => (
                <div key={resource._id} className="resource-card card">
                  <div className="resource-icon">{getTypeIcon(resource.type)}</div>
                  <h3 className="resource-name">{resource.name}</h3>
                  <p className="resource-category">{resource.category}</p>
                  <Link 
                    to={`/student/borrow/${resource._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Request
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          gap: var(--spacing-4);
        }

        .loading-container .loading-spinner {
          width: 40px;
          height: 40px;
        }

        .welcome-section {
          margin-bottom: var(--spacing-8);
        }

        .page-title {
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
          margin-bottom: var(--spacing-2);
          font-family: var(--font-family-display);
        }

        .page-subtitle {
          font-size: var(--font-size-lg);
          color: var(--text-secondary);
          margin-bottom: 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-6);
          margin-bottom: var(--spacing-10);
        }

        .quick-actions {
          margin-bottom: var(--spacing-10);
        }

        .section-title {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin-bottom: var(--spacing-6);
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-6);
        }

        .action-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-4);
        }

        .action-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: var(--spacing-6);
          background: var(--bg-secondary);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-xl);
          text-decoration: none;
          color: var(--text-primary);
          transition: all var(--transition-normal);
          box-shadow: var(--shadow-sm);
        }

        .action-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-light);
        }

        .action-icon {
          font-size: var(--font-size-3xl);
          margin-bottom: var(--spacing-3);
        }

        .action-title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--spacing-2);
        }

        .action-description {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          margin-bottom: 0;
        }

        .recent-requests {
          margin-bottom: var(--spacing-10);
        }

        .request-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .request-card {
          padding: var(--spacing-5);
        }

        .request-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-2);
        }

        .request-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
        }

        .resource-icon {
          font-size: var(--font-size-lg);
        }

        .request-meta {
          display: flex;
          gap: var(--spacing-4);
          font-size: var(--font-size-sm);
          color: var(--text-tertiary);
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-1);
          padding: var(--spacing-1) var(--spacing-2);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .available-resources {
          margin-bottom: var(--spacing-10);
        }

        .resource-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-4);
        }

        .resource-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: var(--spacing-5);
        }

        .resource-card .resource-icon {
          font-size: var(--font-size-2xl);
          margin-bottom: var(--spacing-3);
        }

        .resource-name {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--spacing-1);
          color: var(--text-primary);
        }

        .resource-category {
          font-size: var(--font-size-sm);
          color: var(--text-tertiary);
          margin-bottom: var(--spacing-4);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          margin-bottom: var(--spacing-3);
        }

        .user-details {
          flex: 1;
        }

        .user-name {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
        }

        .user-role {
          font-size: var(--font-size-xs);
          color: var(--text-tertiary);
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: var(--spacing-4);
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .action-grid {
            grid-template-columns: 1fr;
          }
          
          .resource-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
          
          .request-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-2);
          }
          
          .request-meta {
            flex-direction: column;
            gap: var(--spacing-1);
          }
          
          .page-title {
            font-size: var(--font-size-3xl);
          }
        }
      `}</style>
    </div>
  );
};

export default ModernStudentDashboard;
