import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Mock staff data
  const stats = {
    totalResources: 892,
    availableResources: 645,
    pendingRequests: 28,
    approvedToday: 15
  };

  const recentRequests = [
    {
      id: '1',
      student: 'John Student',
      resource: 'Advanced Mathematics Textbook',
      requestDate: '2024-03-08',
      status: 'pending',
      priority: 'high'
    },
    {
      id: '2',
      student: 'Sarah Johnson',
      resource: 'Physics Lab Equipment',
      requestDate: '2024-03-08',
      status: 'approved',
      priority: 'medium'
    },
    {
      id: '3',
      student: 'Mike Wilson',
      resource: 'Programming Reference Guide',
      requestDate: '2024-03-07',
      status: 'borrowed',
      priority: 'low'
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
      if (parsedUser.role !== 'staff') {
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

  const getStatusColor = (status) => {
    const colors = {
      pending: { background: 'var(--warning-lightest)', color: 'var(--warning-dark)' },
      approved: { background: 'var(--success-lightest)', color: 'var(--success-dark)' },
      borrowed: { background: 'var(--info-lightest)', color: 'var(--info-dark)' },
      rejected: { background: 'var(--error-lightest)', color: 'var(--error-dark)' }
    };
    return colors[status] || { background: 'var(--gray-100)', color: 'var(--gray-700)' };
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: { background: '#fee2e2', color: '#dc2626' },
      medium: { background: '#fef3c7', color: '#d97706' },
      low: { background: '#f0f9ff', color: '#0369a1' }
    };
    return colors[priority] || { background: 'var(--gray-100)', color: 'var(--gray-700)' };
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading staff dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard">
        <div className="main">
          <div className="empty-state">
            <div className="empty-state-icon">🔐</div>
            <h2 className="empty-state-title">Authentication Required</h2>
            <p className="empty-state-message">Please log in as staff to access this dashboard</p>
            <Link to="/login" className="btn btn-primary">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo">
          🎓 Staff Portal
        </div>
        <a href="#" className="active">
          <i className="fa-solid fa-dashboard"></i>
          Dashboard
        </a>
        <a href="#">
          <i className="fa-solid fa-book"></i>
          Resources
        </a>
        <a href="#">
          <i className="fa-solid fa-clipboard-list"></i>
          Requests
        </a>
        <a href="#">
          <i className="fa-solid fa-calendar"></i>
          Schedule
        </a>
        <a href="#">
          <i className="fa-solid fa-chart-bar"></i>
          Reports
        </a>
        <a href="#">
          <i className="fa-solid fa-cog"></i>
          Settings
        </a>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div className="user-details">
              <div className="user-name">{user.name}</div>
              <div className="user-role">Staff</div>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary btn-sm">
            <i className="fa-solid fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <h2>Staff Dashboard</h2>
          <div className="search-container">
            <input 
              className="search" 
              placeholder="Search requests, resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fa-solid fa-search search-icon"></i>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <h3>Welcome back, {user.name}! 👋</h3>
          <p>Manage resource requests and monitor library activity</p>
        </div>

        {/* Stats Cards */}
        <div className="cards">
          <div className="card">
            <div className="card-icon">📚</div>
            <h3>Total Resources</h3>
            <p>{stats.totalResources}</p>
          </div>
          
          <div className="card">
            <div className="card-icon">✅</div>
            <h3>Available</h3>
            <p>{stats.availableResources}</p>
          </div>
          
          <div className="card">
            <div className="card-icon">⏳</div>
            <h3>Pending Requests</h3>
            <p>{stats.pendingRequests}</p>
          </div>
          
          <div className="card">
            <div className="card-icon">📅</div>
            <h3>Approved Today</h3>
            <p>{stats.approvedToday}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <Link to="/requests/new" className="btn btn-primary">
              <i className="fa-solid fa-plus"></i>
              New Resource
            </Link>
            <Link to="/requests/pending" className="btn btn-secondary">
              <i className="fa-solid fa-clock"></i>
              Review Requests
            </Link>
            <Link to="/reports" className="btn btn-secondary">
              <i className="fa-solid fa-chart-line"></i>
              Generate Report
            </Link>
          </div>
        </div>

        {/* Recent Requests Table */}
        <div className="table-container">
          <h3>Recent Borrow Requests</h3>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Resource</th>
                <th>Date</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <div className="student-info">
                      <i className="fa-solid fa-user-circle"></i>
                      {request.student}
                    </div>
                  </td>
                  <td>{request.resource}</td>
                  <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                  <td>
                    <span 
                      className="badge"
                      style={getStatusColor(request.status)}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="badge"
                      style={getPriorityColor(request.priority)}
                    >
                      {request.priority}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-primary btn-sm">
                        <i className="fa-solid fa-eye"></i>
                        View
                      </button>
                      {request.status === 'pending' && (
                        <button className="btn btn-success btn-sm">
                          <i className="fa-solid fa-check"></i>
                          Approve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .mobile-menu-toggle {
          display: none;
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1001;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px;
          cursor: pointer;
          font-size: 18px;
        }

        .search-container {
          position: relative;
        }

        .search-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
        }

        .welcome-section {
          margin-bottom: 30px;
        }

        .welcome-section h3 {
          font-size: var(--font-size-2xl);
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .welcome-section p {
          color: var(--text-secondary);
          font-size: var(--font-size-base);
        }

        .quick-actions {
          margin-bottom: 30px;
        }

        .quick-actions h3 {
          font-size: var(--font-size-lg);
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 15px;
        }

        .action-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .student-info,
        .resource-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card h3 {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .table-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 15px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }

        .user-details {
          flex: 1;
        }

        .user-name {
          color: white;
          font-weight: 500;
          font-size: var(--font-size-sm);
        }

        .user-role {
          color: rgba(255, 255, 255, 0.7);
          font-size: var(--font-size-xs);
        }

        .btn-sm {
          padding: 6px 12px;
          font-size: var(--font-size-xs);
        }

        .badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: var(--font-size-xs);
          font-weight: 500;
          text-transform: uppercase;
        }

        @media (max-width: 900px) {
          .mobile-menu-toggle {
            display: block;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .table-actions {
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default StaffDashboard;
