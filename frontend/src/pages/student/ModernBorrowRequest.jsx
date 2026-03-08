import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ModernBorrowRequest = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resource, setResource] = useState(null);
  const [formData, setFormData] = useState({
    purpose: '',
    startDate: '',
    endDate: '',
    additionalNotes: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { resourceId } = useParams();

  // Mock resource data
  const mockResource = {
    _id: resourceId || '1',
    name: 'Advanced Mathematics Textbook',
    category: 'Mathematics',
    type: 'book',
    status: 'available',
    description: 'Comprehensive guide to advanced mathematical concepts including calculus, linear algebra, and differential equations.',
    author: 'Dr. Sarah Johnson',
    isbn: '978-0-123456-78-9',
    location: 'Library Shelf A-12',
    condition: 'Excellent',
    image: 'https://picsum.photos/seed/math-book/400/600.jpg',
    availableQuantity: 5,
    totalQuantity: 10
  };

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
      
      // Load resource data
      setResource(mockResource);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate, resourceId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (start < today) {
        newErrors.startDate = 'Start date cannot be in the past';
      }
      
      if (end <= start) {
        newErrors.endDate = 'End date must be after start date';
      }
      
      // Check if borrowing period is reasonable (max 30 days for books, 7 days for equipment)
      const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      const maxDays = resource?.type === 'book' ? 30 : 7;
      
      if (daysDiff > maxDays) {
        newErrors.endDate = `Maximum borrowing period is ${maxDays} days for ${resource?.type}s`;
      }
    }
    
    if (formData.additionalNotes && formData.additionalNotes.length > 500) {
      newErrors.additionalNotes = 'Additional notes must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    setSuccess('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success response
      setSuccess('✅ Borrow request submitted successfully! You will be notified when it\'s approved.');
      
      // Reset form
      setFormData({
        purpose: '',
        startDate: '',
        endDate: '',
        additionalNotes: ''
      });
      
      // Redirect to requests page after delay
      setTimeout(() => {
        navigate('/student/requests');
      }, 3000);
      
    } catch (error) {
      console.error('Submit error:', error);
      setErrors({ submit: '❌ Failed to submit request. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      book: '📚',
      equipment: '🔬',
      digital: '💻',
      other: '📦'
    };
    return icons[type] || '📦';
  };

  const getStatusColor = (status) => {
    const colors = {
      available: { background: 'var(--success-lightest)', color: 'var(--success-dark)', border: 'var(--success-light)' },
      borrowed: { background: 'var(--warning-lightest)', color: 'var(--warning-dark)', border: 'var(--warning-light)' },
      maintenance: { background: 'var(--error-lightest)', color: 'var(--error-dark)', border: 'var(--error-light)' },
      reserved: { background: 'var(--info-lightest)', color: 'var(--info-dark)', border: 'var(--info-light)' }
    };
    return colors[status] || { background: 'var(--gray-100)', color: 'var(--gray-700)', border: 'var(--gray-300)' };
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading request form...</p>
        </div>
      </div>
    );
  }

  if (!user || !resource) {
    return (
      <div className="app-container">
        <div className="content-area">
          <div className="empty-state">
            <div className="empty-state-icon">🔐</div>
            <h2 className="empty-state-title">Authentication Required</h2>
            <p className="empty-state-message">Please log in to submit a borrow request</p>
            <Link to="/login" className="btn btn-primary">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (resource.status !== 'available') {
    return (
      <div className="app-container">
        <div className="content-area">
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <h2 className="empty-state-title">Resource Not Available</h2>
            <p className="empty-state-message">
              This resource is currently {resource.status} and cannot be requested at this time.
            </p>
            <Link to="/student/browse" className="btn btn-primary">
              Browse Other Resources
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
            <Link to="/student/dashboard" className="nav-link">
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
            <div className="breadcrumb">
              <Link to="/student/browse" className="breadcrumb-link">Browse Resources</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">Borrow Request</span>
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
          <div className="request-container">
            {/* Resource Summary */}
            <div className="resource-summary card fade-in">
              <div className="resource-summary-content">
                <div className="resource-summary-image">
                  <img 
                    src={resource.image} 
                    alt={resource.name}
                    onError={(e) => {
                      e.target.src = `https://picsum.photos/seed/${resource._id}/400/600.jpg`;
                    }}
                  />
                  <div className="resource-type-badge">
                    <span>{getTypeIcon(resource.type)}</span>
                    <span>{resource.type}</span>
                  </div>
                </div>
                
                <div className="resource-summary-details">
                  <div className="resource-header">
                    <h1 className="resource-title">{resource.name}</h1>
                    <span 
                      className="badge"
                      style={getStatusColor(resource.status)}
                    >
                      {resource.status}
                    </span>
                  </div>
                  
                  <p className="resource-description">{resource.description}</p>
                  
                  <div className="resource-meta">
                    <div className="meta-item">
                      <span className="meta-label">Category:</span>
                      <span className="meta-value">{resource.category}</span>
                    </div>
                    {resource.author && (
                      <div className="meta-item">
                        <span className="meta-label">Author:</span>
                        <span className="meta-value">{resource.author}</span>
                      </div>
                    )}
                    {resource.isbn && (
                      <div className="meta-item">
                        <span className="meta-label">ISBN:</span>
                        <span className="meta-value">{resource.isbn}</span>
                      </div>
                    )}
                    <div className="meta-item">
                      <span className="meta-label">Location:</span>
                      <span className="meta-value">{resource.location}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Condition:</span>
                      <span className="meta-value">{resource.condition}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Availability:</span>
                      <span className="meta-value">
                        {resource.availableQuantity} of {resource.totalQuantity} available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Borrow Request Form */}
            <div className="request-form-container fade-in-up">
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">📋 Submit Borrow Request</h2>
                  <p className="card-subtitle">
                    Please fill in the details below to request this resource
                  </p>
                </div>
                
                <div className="card-body">
                  {success && (
                    <div className="alert alert-success">
                      <span className="alert-icon">✅</span>
                      <span className="alert-message">{success}</span>
                    </div>
                  )}
                  
                  {errors.submit && (
                    <div className="alert alert-error">
                      <span className="alert-icon">❌</span>
                      <span className="alert-message">{errors.submit}</span>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="borrow-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purpose">
                          Purpose of Borrowing *
                        </label>
                        <textarea
                          id="purpose"
                          name="purpose"
                          value={formData.purpose}
                          onChange={handleInputChange}
                          placeholder="Explain why you need this resource and how you plan to use it..."
                          className="form-textarea"
                          rows={4}
                          required
                        />
                        {errors.purpose && (
                          <span className="form-error">{errors.purpose}</span>
                        )}
                        <span className="form-help">
                          Be specific about your academic purpose (e.g., research, course work, project)
                        </span>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="startDate">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="form-input"
                          required
                        />
                        {errors.startDate && (
                          <span className="form-error">{errors.startDate}</span>
                        )}
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label" htmlFor="endDate">
                          End Date *
                        </label>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          min={formData.startDate || new Date().toISOString().split('T')[0]}
                          className="form-input"
                          required
                        />
                        {errors.endDate && (
                          <span className="form-error">{errors.endDate}</span>
                        )}
                        <span className="form-help">
                          Maximum borrowing period: {resource.type === 'book' ? '30 days' : '7 days'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label" htmlFor="additionalNotes">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        placeholder="Any additional information or special requirements..."
                        className="form-textarea"
                        rows={3}
                        maxLength={500}
                      />
                      {errors.additionalNotes && (
                        <span className="form-error">{errors.additionalNotes}</span>
                      )}
                      <span className="form-help">
                        {formData.additionalNotes.length}/500 characters
                      </span>
                    </div>
                    
                    {/* Borrowing Guidelines */}
                    <div className="guidelines-section">
                      <h3 className="guidelines-title">📖 Borrowing Guidelines</h3>
                      <ul className="guidelines-list">
                        <li>You must return the resource by the specified end date</li>
                        <li>Late returns may incur penalties and affect future borrowing privileges</li>
                        <li>Handle resources with care and return them in the same condition</li>
                        <li>Report any damage or issues immediately</li>
                        <li>Renewals are subject to availability and approval</li>
                      </ul>
                    </div>
                    
                    <div className="form-actions">
                      <button
                        type="button"
                        onClick={() => navigate('/student/browse')}
                        className="btn btn-secondary"
                        disabled={submitting}
                      >
                        ← Back to Browse
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <span className="loading-spinner"></span>
                            Submitting Request...
                          </>
                        ) : (
                          <>
                            📋 Submit Request
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
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

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
        }

        .breadcrumb-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: var(--font-size-sm);
          transition: color var(--transition-normal);
        }

        .breadcrumb-link:hover {
          color: var(--primary-color);
        }

        .breadcrumb-separator {
          color: var(--text-tertiary);
          font-size: var(--font-size-sm);
        }

        .breadcrumb-current {
          color: var(--text-primary);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }

        .request-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-8);
        }

        .resource-summary {
          overflow: hidden;
        }

        .resource-summary-content {
          display: flex;
          gap: var(--spacing-6);
        }

        .resource-summary-image {
          position: relative;
          width: 200px;
          height: 280px;
            border-radius: var(--radius-lg);
            overflow: hidden;
            flex-shrink: 0;
        }

        .resource-summary-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .resource-type-badge {
          position: absolute;
          top: var(--spacing-2);
          right: var(--spacing-2);
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
          padding: var(--spacing-1) var(--spacing-2);
          background: rgba(0, 0, 0, 0.7);
          color: var(--text-inverse);
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
        }

        .resource-summary-details {
          flex: 1;
        }

        .resource-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: var(--spacing-4);
        }

        .resource-title {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
          margin-bottom: 0;
          font-family: var(--font-family-display);
          line-height: var(--line-height-tight);
        }

        .resource-description {
          font-size: var(--font-size-base);
          color: var(--text-secondary);
          margin-bottom: var(--spacing-6);
          line-height: var(--line-height-relaxed);
        }

        .resource-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-4);
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-1);
        }

        .meta-label {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--text-tertiary);
        }

        .meta-value {
          font-size: var(--font-size-sm);
          color: var(--text-primary);
          font-weight: var(--font-weight-medium);
        }

        .request-form-container {
          max-width: 800px;
        }

        .borrow-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-6);
        }

        .guidelines-section {
          background: var(--bg-tertiary);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-lg);
          padding: var(--spacing-6);
        }

        .guidelines-title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin-bottom: var(--spacing-4);
        }

        .guidelines-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .guidelines-list li {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-3);
          padding: var(--spacing-2) 0;
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          border-bottom: 1px solid var(--gray-200);
        }

        .guidelines-list li:last-child {
          border-bottom: none;
        }

        .guidelines-list li::before {
          content: '✓';
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background: var(--success-light);
          color: var(--success-dark);
          border-radius: 50%;
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-bold);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--spacing-6);
          border-top: 1px solid var(--gray-200);
        }

        @media (max-width: 768px) {
          .resource-summary-content {
            flex-direction: column;
          }
          
          .resource-summary-image {
            width: 100%;
            height: 200px;
          }
          
          .resource-title {
            font-size: var(--font-size-2xl);
          }
          
          .resource-meta {
            grid-template-columns: 1fr;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            flex-direction: column;
            gap: var(--spacing-4);
          }
          
          .form-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ModernBorrowRequest;
