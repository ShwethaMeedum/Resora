import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getResources, getCategories } from '../../utils/dataManager';

const CompleteBrowseResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [user, setUser] = useState(null);
  const [borrowingLimit, setBorrowingLimit] = useState(5);
  const [currentBorrowed, setCurrentBorrowed] = useState(2);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // Load data from data manager (same as staff)
    const loadedResources = getResources();
    const loadedCategories = getCategories();
    
    setResources(loadedResources);
    setLoading(false);
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesAvailability = availabilityFilter === 'all' || 
                               (availabilityFilter === 'available' && resource.status === 'available') ||
                               (availabilityFilter === 'unavailable' && resource.status === 'unavailable');
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Book': return '📚';
      case 'Laptop': return '💻';
      case 'Camera': return '📷';
      case 'Tablet': return '📱';
      case 'Projector': return '📽️';
      default: return '📦';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent': return { bg: '#d1fae5', color: '#065f46' };
      case 'Very Good': return { bg: '#dbeafe', color: '#1e40af' };
      case 'Good': return { bg: '#fef3c7', color: '#92400e' };
      case 'Fair': return { bg: '#fee2e2', color: '#991b1b' };
      default: return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  const getStockStatus = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage === 0) return { color: '#dc2626', text: 'Out of Stock', icon: '❌' };
    if (percentage <= 25) return { color: '#f59e0b', text: 'Low Stock', icon: '⚠️' };
    if (percentage <= 50) return { color: '#3b82f6', text: 'Limited', icon: '📊' };
    return { color: '#10b981', text: 'Available', icon: '✅' };
  };

  const handleBorrowRequest = (resourceId) => {
    // Mock borrow request logic
    const resource = resources.find(r => r._id === resourceId);
    if (resource && resource.status === 'available') {
      alert(`Borrow request sent for ${resource.name}. You will be notified when it's approved.`);
    }
  };

  // Refresh data function
  const refreshData = () => {
    const updatedResources = getResources();
    setResources(updatedResources);
  };

  if (loading) {
    return (
      <div className="premium-container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          flexDirection: 'column'
        }}>
          <div className="premium-spinner"></div>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
            Loading resources...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-container">
      {/* Premium Navbar */}
      <nav className="premium-navbar">
        <div className="premium-navbar-content">
          <div className="premium-brand">
            🎓 Academic Resource System
          </div>
          <div className="premium-user-section">
            <div className="premium-user-info">
              <div className="premium-user-avatar">👨‍🎓</div>
              <div className="premium-user-details">
                <div className="premium-user-name">{user?.name || 'Student'}</div>
                <div className="premium-user-role">Student</div>
              </div>
            </div>
            <Link to="/student/dashboard" className="premium-button premium-button-ghost">
              📊 Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Browse Content */}
      <div className="premium-card">
        <div className="premium-card-header">
          <h1 className="premium-card-title">📚 Browse Resources</h1>
          <p className="premium-card-subtitle">
            Discover and borrow resources with photos for easy identification.
          </p>
        </div>

        {/* User Stats */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">📊 Your Borrowing Status</h2>
          </div>
          <div className="premium-stats-grid">
            <div className="premium-stat-card">
              <div className="premium-stat-icon">📚</div>
              <div className="premium-stat-value">{currentBorrowed}</div>
              <div className="premium-stat-label">Currently Borrowed</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">📋</div>
              <div className="premium-stat-value">{borrowingLimit}</div>
              <div className="premium-stat-label">Borrowing Limit</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">✅</div>
              <div className="premium-stat-value">{borrowingLimit - currentBorrowed}</div>
              <div className="premium-stat-label">Available Slots</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="premium-section">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <input
              type="text"
              placeholder="🔍 Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="premium-form-input"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="premium-form-select"
            >
              <option value="all">All Categories</option>
              <option value="Computer Science">💻 Computer Science</option>
              <option value="Technology">📱 Technology</option>
              <option value="Photography">📷 Photography</option>
              <option value="Physics">⚛️ Physics</option>
              <option value="Mathematics">📐 Mathematics</option>
            </select>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="premium-form-select"
            >
              <option value="all">All Resources</option>
              <option value="available">✅ Available Only</option>
              <option value="unavailable">❌ Unavailable</option>
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">📦 Available Resources ({filteredResources.length} found)</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {filteredResources.map((resource) => {
              const stockStatus = getStockStatus(resource.availableQuantity, resource.totalQuantity);
              return (
                <div key={resource._id} className="premium-card" style={{ padding: '1.5rem' }}>
                  {/* Resource Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '2.5rem' }}>{resource.icon}</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                        {resource.name}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {resource.type} • {resource.category}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ 
                        color: stockStatus.color, 
                        fontWeight: '600',
                        fontSize: '0.875rem'
                      }}>
                        {stockStatus.icon} {stockStatus.text}
                      </span>
                    </div>
                  </div>

                  {/* Photo Gallery */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      📸 Photos ({resource.photos ? resource.photos.length : 0})
                    </div>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
                      gap: '0.5rem',
                      padding: '1rem',
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--primary-color, 0.1)'
                    }}>
                      {resource.photos && resource.photos.length > 0 ? (
                        resource.photos.map((photo, index) => (
                          <div key={index}>
                            <img 
                              src={photo} 
                              alt={`Resource photo ${index + 1}`}
                              style={{ 
                                width: '100%', 
                                height: '100px', 
                                objectFit: 'cover',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--primary-color, 0.2)',
                                cursor: 'pointer',
                                transition: 'transform 0.2s'
                              }}
                              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                            />
                          </div>
                        ))
                      ) : (
                        <div style={{ 
                          textAlign: 'center', 
                          color: 'var(--text-tertiary)', 
                          fontSize: '0.875rem',
                          padding: '2rem',
                          border: '2px dashed var(--primary-color, 0.3)',
                          borderRadius: 'var(--radius-md)'
                        }}>
                          📷 No photos available
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Resource Details */}
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                      {resource.description}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      <div><strong>Serial:</strong> {resource.serialNumber}</div>
                      <div><strong>Location:</strong> {resource.location}</div>
                      <div><strong>Condition:</strong> 
                        <span style={{ 
                          background: getConditionColor(resource.condition).bg, 
                          color: getConditionColor(resource.condition).color,
                          padding: '0.125rem 0.5rem', 
                          borderRadius: '4px', 
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          marginLeft: '0.25rem'
                        }}>
                          {resource.condition}
                        </span>
                      </div>
                      <div><strong>Max Duration:</strong> {resource.maxDuration} days</div>
                    </div>
                  </div>

                  {/* Stock Information */}
                  <div style={{ 
                    background: 'var(--bg-secondary)', 
                    padding: '1rem', 
                    borderRadius: 'var(--radius-lg)', 
                    marginBottom: '1rem',
                    border: '1px solid var(--primary-color, 0.1)'
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
                      <div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                          {resource.totalQuantity}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
                          {resource.availableQuantity}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Available</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--warning-color)' }}>
                          {resource.borrowedQuantity}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Borrowed</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {resource.status === 'available' && currentBorrowed < borrowingLimit ? (
                      <button
                        onClick={() => handleBorrowRequest(resource._id)}
                        className="premium-button premium-button-primary"
                        style={{ fontSize: '0.875rem', flex: 1 }}
                      >
                        📋 Borrow Request
                      </button>
                    ) : resource.status === 'unavailable' ? (
                      <button 
                        className="premium-button" 
                        disabled
                        style={{ fontSize: '0.875rem', flex: 1, background: 'var(--text-tertiary)' }}
                      >
                        ❌ Unavailable
                      </button>
                    ) : (
                      <button 
                        className="premium-button" 
                        disabled
                        style={{ fontSize: '0.875rem', flex: 1, background: 'var(--text-tertiary)' }}
                      >
                        📚 Limit Reached
                      </button>
                    )}
                    <Link 
                      to={`/student/borrow/${resource._id}`}
                      className="premium-button premium-button-ghost"
                      style={{ fontSize: '0.875rem' }}
                    >
                      📄 Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">🚀 Quick Actions</h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/student/my-requests" className="premium-button premium-button-outline">
              📋 My Requests
            </Link>
            <Link to="/student/dashboard" className="premium-button premium-button-outline">
              📊 Dashboard
            </Link>
            <button className="premium-button premium-button-outline">
              📧 Help Center
            </button>
            <button
              onClick={refreshData}
              className="premium-button premium-button-outline"
              style={{ background: 'var(--gradient-info)' }}
            >
              🔄 Refresh Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteBrowseResources;
