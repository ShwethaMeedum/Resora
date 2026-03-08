import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ModernAdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const navigate = useNavigate();

  // Mock data
  const stats = {
    totalUsers: 1247,
    totalResources: 892,
    activeRequests: 45,
    pendingApprovals: 12,
    totalBorrowed: 234,
    overdueItems: 8,
    systemHealth: 98.5,
    monthlyGrowth: 12.3
  };

  const recentActivity = [
    {
      id: 1,
      type: 'request',
      user: 'John Student',
      action: 'requested',
      resource: 'Advanced Mathematics Textbook',
      time: '2 minutes ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'approval',
      user: 'Jane Staff',
      action: 'approved',
      resource: 'Physics Lab Equipment',
      time: '15 minutes ago',
      status: 'approved'
    },
    {
      id: 3,
      type: 'return',
      user: 'Mike Student',
      action: 'returned',
      resource: 'Programming Reference Guide',
      time: '1 hour ago',
      status: 'returned'
    },
    {
      id: 4,
      type: 'registration',
      user: 'Sarah New',
      action: 'registered',
      resource: 'New student account',
      time: '2 hours ago',
      status: 'completed'
    }
  ];

  const systemMetrics = [
    {
      title: 'User Engagement',
      value: '87.3%',
      change: '+5.2%',
      trend: 'up',
      icon: '👥'
    },
    {
      title: 'Resource Utilization',
      value: '72.8%',
      change: '+3.1%',
      trend: 'up',
      icon: '📚'
    },
    {
      title: 'Request Processing',
      value: '94.5%',
      change: '-1.2%',
      trend: 'down',
      icon: '⚡'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '0%',
      trend: 'stable',
      icon: '🔧'
    }
  ];

  const topResources = [
    {
      name: 'Advanced Mathematics Textbook',
      category: 'Mathematics',
      borrowCount: 156,
      rating: 4.8,
      trend: 'up'
    },
    {
      name: 'Physics Lab Equipment',
      category: 'Science',
      borrowCount: 134,
      rating: 4.6,
      trend: 'up'
    },
    {
      name: 'Programming Reference Guide',
      category: 'Computer Science',
      borrowCount: 128,
      rating: 4.9,
      trend: 'stable'
    },
    {
      name: 'Chemistry Research Papers',
      category: 'Research',
      borrowCount: 98,
      rating: 4.5,
      trend: 'down'
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
      if (parsedUser.role !== 'admin') {
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

  const getActivityIcon = (type) => {
    const icons = {
      request: '📋',
      approval: '✅',
      return: '📚',
      registration: '👤',
      maintenance: '🔧',
      overdue: '⚠️'
    };
    return icons[type] || '📄';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: { background: 'var(--warning-lightest)', color: 'var(--warning-dark)' },
      approved: { background: 'var(--success-lightest)', color: 'var(--success-dark)' },
      returned: { background: 'var(--info-lightest)', color: 'var(--info-dark)' },
      completed: { background: 'var(--success-lightest)', color: 'var(--success-dark)' },
      rejected: { background: 'var(--error-lightest)', color: 'var(--error-dark)' }
    };
    return colors[status] || { background: 'var(--gray-100)', color: 'var(--gray-700)' };
  };

  const getTrendIcon = (trend) => {
    const icons = {
      up: '📈',
      down: '📉',
      stable: '➡️'
    };
    return icons[trend] || '➡️';
  };

  const getTrendColor = (trend) => {
    const colors = {
      up: 'var(--success-color)',
      down: 'var(--error-color)',
      stable: 'var(--text-tertiary)'
    };
    return colors[trend] || 'var(--text-tertiary)';
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading admin dashboard...</p>
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
            <p className="empty-state-message">Please log in to access the admin dashboard</p>
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
            <Link to="/admin/dashboard" className="nav-link active">
              <span className="nav-icon">📊</span>
              <span>Dashboard</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/admin/users" className="nav-link">
              <span className="nav-icon">👥</span>
              <span>User Management</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/admin/resources" className="nav-link">
              <span className="nav-icon">📚</span>
              <span>Resources</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/admin/requests" className="nav-link">
              <span className="nav-icon">📋</span>
              <span>Borrow Requests</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/admin/reports" className="nav-link">
              <span className="nav-icon">📈</span>
              <span>Reports</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/admin/settings" className="nav-link">
              <span className="nav-icon">⚙️</span>
              <span>Settings</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/admin/logs" className="nav-link">
              <span className="nav-icon">📜</span>
              <span>System Logs</span>
            </Link>
          </div>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div className="user-details">
              <div className="user-name">{user.name}</div>
              <div className="user-role">Administrator</div>
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
                placeholder="Search users, resources, requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          
          <div className="nav-right">
            <div className="period-selector">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="form-select"
              >
                <option value="24hours">Last 24 Hours</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>
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
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="page-subtitle">
              Welcome back, {user.name}! Here's your system overview and key metrics.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="metrics-grid fade-in-up">
            <div className="metric-card card">
              <div className="metric-header">
                <div className="metric-icon widget-icon-primary">👥</div>
                <span className="metric-label">Total Users</span>
              </div>
              <div className="metric-value">{stats.totalUsers.toLocaleString()}</div>
              <div className="metric-change positive">
                <span>📈</span>
                <span>+{stats.monthlyGrowth}% this month</span>
              </div>
            </div>

            <div className="metric-card card">
              <div className="metric-header">
                <div className="metric-icon widget-icon-success">📚</div>
                <span className="metric-label">Total Resources</span>
              </div>
              <div className="metric-value">{stats.totalResources.toLocaleString()}</div>
              <div className="metric-change positive">
                <span>📈</span>
                <span>+12 new this week</span>
              </div>
            </div>

            <div className="metric-card card">
              <div className="metric-header">
                <div className="metric-icon widget-icon-warning">📋</div>
                <span className="metric-label">Active Requests</span>
              </div>
              <div className="metric-value">{stats.activeRequests}</div>
              <div className="metric-change neutral">
                <span>⚡</span>
                <span>{stats.pendingApprovals} pending approval</span>
              </div>
            </div>

            <div className="metric-card card">
              <div className="metric-header">
                <div className="metric-icon widget-icon-error">⚠️</div>
                <span className="metric-label">Overdue Items</span>
              </div>
              <div className="metric-value">{stats.overdueItems}</div>
              <div className="metric-change negative">
                <span>📉</span>
                <span>Requires attention</span>
              </div>
            </div>
          </div>

          {/* System Health & Quick Actions */}
          <div className="dashboard-row fade-in-up">
            <div className="system-health card">
              <div className="card-header">
                <h3 className="card-title">🔧 System Health</h3>
              </div>
              <div className="card-body">
                <div className="health-metric">
                  <div className="health-label">Overall Status</div>
                  <div className="health-value">
                    <span className="health-number">{stats.systemHealth}%</span>
                    <span className="health-status excellent">Excellent</span>
                  </div>
                </div>
                <div className="health-bar">
                  <div 
                    className="health-progress"
                    style={{ width: `${stats.systemHealth}%` }}
                  ></div>
                </div>
                <div className="health-details">
                  <div className="health-detail">
                    <span>Database</span>
                    <span className="status-good">✅ Good</span>
                  </div>
                  <div className="health-detail">
                    <span>API Response</span>
                    <span className="status-good">✅ 245ms</span>
                  </div>
                  <div className="health-detail">
                    <span>Storage</span>
                    <span className="status-warning">⚠️ 78%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="quick-actions card">
              <div className="card-header">
                <h3 className="card-title">🚀 Quick Actions</h3>
              </div>
              <div className="card-body">
                <div className="action-grid">
                  <Link to="/admin/users/new" className="action-button">
                    <span className="action-icon">👤</span>
                    <span className="action-text">Add User</span>
                  </Link>
                  <Link to="/admin/resources/new" className="action-button">
                    <span className="action-icon">📚</span>
                    <span className="action-text">Add Resource</span>
                  </Link>
                  <Link to="/admin/requests" className="action-button">
                    <span className="action-icon">📋</span>
                    <span className="action-text">Review Requests</span>
                  </Link>
                  <Link to="/admin/reports" className="action-button">
                    <span className="action-icon">📈</span>
                    <span className="action-text">Generate Report</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* System Metrics */}
          <div className="system-metrics-section fade-in-up">
            <h2 className="section-title">📊 System Performance Metrics</h2>
            <div className="metrics-grid">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="metric-widget card">
                  <div className="metric-widget-header">
                    <span className="metric-widget-icon">{metric.icon}</span>
                    <span className="metric-widget-title">{metric.title}</span>
                  </div>
                  <div className="metric-widget-value">{metric.value}</div>
                  <div className="metric-widget-change" style={{ color: getTrendColor(metric.trend) }}>
                    <span>{getTrendIcon(metric.trend)}</span>
                    <span>{metric.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="activity-section fade-in-up">
            <div className="section-header">
              <h2 className="section-title">📋 Recent Activity</h2>
              <Link to="/admin/logs" className="btn btn-ghost btn-sm">
                View All →
              </Link>
            </div>
            
            <div className="activity-list">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item card">
                  <div className="activity-icon">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="activity-content">
                    <div className="activity-header">
                      <span className="activity-user">{activity.user}</span>
                      <span className="activity-action">{activity.action}</span>
                      <span className="activity-resource">{activity.resource}</span>
                    </div>
                    <div className="activity-meta">
                      <span className="activity-time">{activity.time}</span>
                      <span 
                        className="badge"
                        style={getStatusColor(activity.status)}
                      >
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Resources */}
          <div className="top-resources-section fade-in-up">
            <div className="section-header">
              <h2 className="section-title">📚 Top Resources</h2>
              <Link to="/admin/reports" className="btn btn-ghost btn-sm">
                Full Report →
              </Link>
            </div>
            
            <div className="resources-table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Resource Name</th>
                    <th>Category</th>
                    <th>Borrow Count</th>
                    <th>Rating</th>
                    <th>Trend</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {topResources.map((resource, index) => (
                    <tr key={index}>
                      <td>
                        <div className="resource-name-cell">
                          <span className="resource-rank">#{index + 1}</span>
                          <span className="resource-name">{resource.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-gray">{resource.category}</span>
                      </td>
                      <td>
                        <span className="borrow-count">{resource.borrowCount}</span>
                      </td>
                      <td>
                        <div className="rating">
                          <span className="rating-stars">⭐ {resource.rating}</span>
                        </div>
                      </td>
                      <td>
                        <span 
                          className="trend-indicator"
                          style={{ color: getTrendColor(resource.trend) }}
                        >
                          {getTrendIcon(resource.trend)}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="btn btn-ghost btn-sm">
                            👁️
                          </button>
                          <button className="btn btn-ghost btn-sm">
                            📊
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

        .welcome-section {
          margin-bottom: var(--spacing-8);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-6);
          margin-bottom: var(--spacing-8);
        }

        .metric-card {
          padding: var(--spacing-6);
          text-align: center;
        }

        .metric-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-2);
          margin-bottom: var(--spacing-4);
        }

        .metric-icon {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--font-size-2xl);
        }

        .metric-label {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .metric-value {
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
          margin-bottom: var(--spacing-2);
          font-family: var(--font-family-display);
        }

        .metric-change {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-1);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }

        .metric-change.positive {
          color: var(--success-color);
        }

        .metric-change.negative {
          color: var(--error-color);
        }

        .metric-change.neutral {
          color: var(--text-tertiary);
        }

        .dashboard-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-6);
          margin-bottom: var(--spacing-8);
        }

        .system-health {
          padding: var(--spacing-6);
        }

        .health-metric {
          margin-bottom: var(--spacing-4);
        }

        .health-label {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          margin-bottom: var(--spacing-2);
        }

        .health-value {
          display: flex;
          align-items: baseline;
          gap: var(--spacing-3);
        }

        .health-number {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
          font-family: var(--font-family-display);
        }

        .health-status {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          padding: var(--spacing-1) var(--spacing-2);
          border-radius: var(--radius-full);
        }

        .health-status.excellent {
          background: var(--success-lightest);
          color: var(--success-dark);
        }

        .health-bar {
          width: 100%;
          height: 8px;
          background: var(--gray-200);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: var(--spacing-4);
        }

        .health-progress {
          height: 100%;
          background: var(--gradient-success);
          transition: width var(--transition-slow);
        }

        .health-details {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
        }

        .health-detail {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: var(--font-size-sm);
        }

        .status-good {
          color: var(--success-color);
          font-weight: var(--font-weight-medium);
        }

        .status-warning {
          color: var(--warning-color);
          font-weight: var(--font-weight-medium);
        }

        .quick-actions {
          padding: var(--spacing-6);
        }

        .action-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-4);
        }

        .action-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-2);
          padding: var(--spacing-4);
          background: var(--bg-tertiary);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-lg);
          text-decoration: none;
          color: var(--text-primary);
          transition: all var(--transition-normal);
        }

        .action-button:hover {
          background: var(--primary-lightest);
          border-color: var(--primary-light);
          transform: translateY(-2px);
        }

        .action-icon {
          font-size: var(--font-size-2xl);
        }

        .action-text {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }

        .system-metrics-section {
          margin-bottom: var(--spacing-8);
        }

        .metric-widget {
          padding: var(--spacing-5);
          text-align: center;
        }

        .metric-widget-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-1);
          margin-bottom: var(--spacing-3);
        }

        .metric-widget-icon {
          font-size: var(--font-size-xl);
        }

        .metric-widget-title {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          font-weight: var(--font-weight-medium);
        }

        .metric-widget-value {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
          margin-bottom: var(--spacing-2);
          font-family: var(--font-family-display);
        }

        .metric-widget-change {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-1);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }

        .activity-section {
          margin-bottom: var(--spacing-8);
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-4);
          padding: var(--spacing-4);
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--font-size-lg);
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
        }

        .activity-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          margin-bottom: var(--spacing-1);
          flex-wrap: wrap;
        }

        .activity-user {
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
        }

        .activity-action {
          color: var(--text-secondary);
        }

        .activity-resource {
          font-weight: var(--font-weight-medium);
          color: var(--primary-color);
        }

        .activity-meta {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
        }

        .activity-time {
          font-size: var(--font-size-sm);
          color: var(--text-tertiary);
        }

        .top-resources-section {
          margin-bottom: var(--spacing-8);
        }

        .resources-table-container {
          background: var(--bg-secondary);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-xl);
          overflow: hidden;
        }

        .resource-name-cell {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
        }

        .resource-rank {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: var(--primary-lightest);
          color: var(--primary-dark);
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-bold);
        }

        .resource-name {
          font-weight: var(--font-weight-medium);
          color: var(--text-primary);
        }

        .borrow-count {
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
        }

        .rating {
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
        }

        .rating-stars {
          font-size: var(--font-size-sm);
          color: var(--warning-color);
        }

        .trend-indicator {
          font-size: var(--font-size-lg);
        }

        .period-selector {
          margin-right: var(--spacing-3);
        }

        @media (max-width: 1024px) {
          .dashboard-row {
            grid-template-columns: 1fr;
          }
          
          .action-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .system-metrics-section .metrics-grid {
            grid-template-columns: 1fr;
          }
          
          .action-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .activity-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-1);
          }
          
          .activity-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-1);
          }
        }

        @media (max-width: 640px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
          
          .action-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ModernAdminDashboard;
