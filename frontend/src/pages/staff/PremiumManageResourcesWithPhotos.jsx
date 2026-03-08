import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getResources, 
  getCategories, 
  saveResources, 
  addResource, 
  updateResource, 
  deleteResource, 
  toggleResourceStatus 
} from '../../utils/dataManager';

const PremiumManageResourcesWithPhotos = () => {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingResource, setEditingResource] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  // Form states
  const [resourceForm, setResourceForm] = useState({
    name: '',
    type: '',
    category: '',
    description: '',
    serialNumber: '',
    condition: 'Good',
    location: '',
    maxDuration: 7,
    totalQuantity: 1,
    availableQuantity: 1,
    status: 'available',
    photos: []
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });

  // Photo upload state
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

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

    // Load data from data manager
    const loadedResources = getResources();
    const loadedCategories = getCategories();
    
    setResources(loadedResources);
    setCategories(loadedCategories);
    setLoading(false);
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || resource.status === filter || resource.category === filter;
    return matchesSearch && matchesFilter;
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

  // Photo upload handlers
  const handlePhotoUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload only image files (JPG, PNG, GIF)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      setUploadingPhoto(true);
      
      // Read and convert to base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        const newPhoto = `data:${file.type};base64,${base64String.split(',')[1]}`;
        
        setResourceForm(prev => ({
          ...prev,
          photos: [...prev.photos, newPhoto]
        }));
        
        // Create preview
        setPhotoPreview(newPhoto);
        setUploadingPhoto(false);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index) => {
    setResourceForm(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
    
    if (photoPreview === resourceForm.photos[index]) {
      setPhotoPreview(null);
    }
  };

  const handleEditResource = (resource) => {
    setEditingResource(resource);
    setResourceForm({
      name: resource.name,
      type: resource.type,
      category: resource.category,
      description: resource.description,
      serialNumber: resource.serialNumber,
      condition: resource.condition,
      location: resource.location,
      maxDuration: resource.maxDuration,
      totalQuantity: resource.totalQuantity,
      availableQuantity: resource.availableQuantity,
      status: resource.status,
      photos: resource.photos || []
    });
  };

  const handleSaveResource = () => {
    if (editingResource) {
      // Update existing resource
      const updatedResource = updateResource(editingResource._id, resourceForm);
      if (updatedResource) {
        // Refresh resources list
        const updatedResources = getResources();
        setResources(updatedResources);
        setEditingResource(null);
        setResourceForm({
          name: '',
          type: '',
          category: '',
          description: '',
          serialNumber: '',
          condition: 'Good',
          location: '',
          maxDuration: 7,
          totalQuantity: 1,
          availableQuantity: 1,
          status: 'available',
          photos: []
        });
        alert('✅ Resource updated successfully! Students can now see the changes.');
      }
    } else {
      // Add new resource
      const newResource = addResource(resourceForm);
      if (newResource) {
        // Refresh resources list
        const updatedResources = getResources();
        setResources(updatedResources);
        setShowAddForm(false);
        setResourceForm({
          name: '',
          type: '',
          category: '',
          description: '',
          serialNumber: '',
          condition: 'Good',
          location: '',
          maxDuration: 7,
          totalQuantity: 1,
          availableQuantity: 1,
          status: 'available',
          photos: []
        });
        alert('✅ Resource added successfully! Students can now see this resource.');
      }
    }
  };

  const handleDeleteResource = (resourceId) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      deleteResource(resourceId);
      // Refresh resources list
      const updatedResources = getResources();
      setResources(updatedResources);
      alert('✅ Resource deleted successfully!');
    }
  };

  const handleToggleStatus = (resourceId) => {
    toggleResourceStatus(resourceId);
    // Refresh resources list
    const updatedResources = getResources();
    setResources(updatedResources);
    alert('✅ Resource status updated successfully!');
  };

  // Refresh data function
  const refreshData = () => {
    const updatedResources = getResources();
    const updatedCategories = getCategories();
    setResources(updatedResources);
    setCategories(updatedCategories);
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
              <div className="premium-user-avatar">👨‍💼</div>
              <div className="premium-user-details">
                <div className="premium-user-name">{user?.name || 'Staff Member'}</div>
                <div className="premium-user-role">Staff Member</div>
              </div>
            </div>
            <Link to="/staff/dashboard" className="premium-button premium-button-ghost">
              📊 Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="premium-card">
        <div className="premium-card-header">
          <h1 className="premium-card-title">📦 Manage Resources with Photos</h1>
          <p className="premium-card-subtitle">
            Complete inventory management with photo upload for easy device identification by students.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">📊 Inventory Overview</h2>
          </div>
          <div className="premium-stats-grid">
            <div className="premium-stat-card">
              <div className="premium-stat-icon">📦</div>
              <div className="premium-stat-value">{resources.length}</div>
              <div className="premium-stat-label">Total Resources</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">✅</div>
              <div className="premium-stat-value">{resources.filter(r => r.status === 'available').length}</div>
              <div className="premium-stat-label">Available</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">❌</div>
              <div className="premium-stat-value">{resources.filter(r => r.status === 'unavailable').length}</div>
              <div className="premium-stat-label">Unavailable</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">📸</div>
              <div className="premium-stat-value">{categories.length}</div>
              <div className="premium-stat-label">Categories</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">🚀 Quick Actions</h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowAddForm(true)}
              className="premium-button premium-button-success"
            >
              ➕ Add New Resource
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="premium-button"
              style={{ background: 'var(--gradient-secondary)' }}
            >
              📁 Manage Categories
            </button>
            <Link to="/staff/requests" className="premium-button premium-button-warning">
              📋 Manage Requests
            </Link>
            <button className="premium-button premium-button-outline">
              📊 Generate Report
            </button>
            <button
              onClick={refreshData}
              className="premium-button premium-button-outline"
              style={{ background: 'var(--gradient-info)' }}
            >
              🔄 Refresh Data
            </button>
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
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="premium-form-select"
            >
              <option value="all">All Resources</option>
              <option value="available">Available Only</option>
              <option value="unavailable">Unavailable Only</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.icon} {cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resources List */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">📦 Resources with Photos ({filteredResources.length} found)</h2>
          </div>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {filteredResources.map((resource) => {
              const stockStatus = getStockStatus(resource.availableQuantity, resource.totalQuantity);
              return (
                <div key={resource._id} className="premium-card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '2rem' }}>{resource.icon}</div>
                        <div>
                          <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                            {resource.name}
                          </h4>
                          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                            {resource.description}
                          </p>
                        </div>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <div><strong>Serial:</strong> {resource.serialNumber}</div>
                        <div><strong>Type:</strong> {resource.type}</div>
                        <div><strong>Category:</strong> {resource.category}</div>
                        <div><strong>Location:</strong> {resource.location}</div>
                        <div><strong>Max Duration:</strong> {resource.maxDuration} days</div>
                        <div>
                          <strong>Condition:</strong> 
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
                      </div>
                    </div>
                  </div>
                  
                  {/* Photo Gallery */}
                  <div style={{ marginLeft: '1rem' }}>
                    <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      📸 Photos ({resource.photos ? resource.photos.length : 0})
                    </div>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', 
                      gap: '0.5rem',
                      padding: '1rem',
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--primary-color, 0.1)'
                    }}>
                      {resource.photos && resource.photos.length > 0 ? (
                        resource.photos.map((photo, index) => (
                          <div key={index} style={{ position: 'relative' }}>
                            <img 
                              src={photo} 
                              alt={`Resource photo ${index + 1}`}
                              style={{ 
                                width: '100%', 
                                height: '80px', 
                                objectFit: 'cover',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--primary-color, 0.2)'
                              }}
                            />
                            <button
                              onClick={() => removePhoto(index)}
                              style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                background: 'var(--error-color)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              ×
                            </button>
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
                          📷 No photos uploaded
                        </div>
                      )}
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
                    <h5 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      📊 Stock Information
                    </h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      <div>
                        <div style={{ color: 'var(--text-secondary)' }}>Total Stock</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                          {resource.totalQuantity}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-secondary)' }}>Available</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                          {resource.availableQuantity}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-secondary)' }}>Borrowed</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--warning-color)' }}>
                          {resource.borrowedQuantity}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-secondary)' }}>Utilization</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--info-color)' }}>
                          {Math.round((resource.borrowedQuantity / resource.totalQuantity) * 100)}%
                        </div>
                      </div>
                    </div>
                    
                    {/* Stock Status Badge */}
                    <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                      <span style={{ 
                        color: stockStatus.color, 
                        fontWeight: '600',
                        fontSize: '0.875rem'
                      }}>
                        {stockStatus.icon} {stockStatus.text}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleEditResource(resource)}
                      className="premium-button premium-button-primary"
                      style={{ fontSize: '0.875rem' }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(resource._id)}
                      className="premium-button"
                      style={{ 
                        fontSize: '0.875rem',
                        background: resource.status === 'available' ? 'var(--gradient-warning)' : 'var(--gradient-success)'
                      }}
                    >
                      {resource.status === 'available' ? '🔒 Make Unavailable' : '🔓 Make Available'}
                    </button>
                    {resource.borrowedQuantity === 0 && (
                      <button
                        onClick={() => handleDeleteResource(resource._id)}
                        className="premium-button premium-button-error"
                        style={{ fontSize: '0.875rem' }}
                      >
                        🗑️ Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add/Edit Resource Modal */}
      {(showAddForm || editingResource) && (
        <div className="premium-modal-overlay">
          <div className="premium-modal">
            <h3 style={{ marginBottom: '1.5rem' }}>
              {editingResource ? '✏️ Edit Resource' : '➕ Add New Resource'}
            </h3>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div className="premium-form-group">
                  <label className="premium-form-label">Resource Name *</label>
                  <input
                    type="text"
                    value={resourceForm.name}
                    onChange={(e) => setResourceForm({...resourceForm, name: e.target.value})}
                    className="premium-form-input"
                  />
                </div>
                
                <div className="premium-form-group">
                  <label className="premium-form-label">Type *</label>
                  <select
                    value={resourceForm.type}
                    onChange={(e) => setResourceForm({...resourceForm, type: e.target.value})}
                    className="premium-form-select"
                  >
                    <option value="">Select Type</option>
                    <option value="Book">📚 Book</option>
                    <option value="Laptop">💻 Laptop</option>
                    <option value="Camera">📷 Camera</option>
                    <option value="Tablet">📱 Tablet</option>
                    <option value="Projector">📽️ Projector</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div className="premium-form-group">
                  <label className="premium-form-label">Category *</label>
                  <select
                    value={resourceForm.category}
                    onChange={(e) => setResourceForm({...resourceForm, category: e.target.value})}
                    className="premium-form-select"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat.name}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="premium-form-group">
                  <label className="premium-form-label">Serial Number *</label>
                  <input
                    type="text"
                    value={resourceForm.serialNumber}
                    onChange={(e) => setResourceForm({...resourceForm, serialNumber: e.target.value})}
                    className="premium-form-input"
                  />
                </div>
              </div>

              <div className="premium-form-group">
                <label className="premium-form-label">Description *</label>
                <textarea
                  value={resourceForm.description}
                  onChange={(e) => setResourceForm({...resourceForm, description: e.target.value})}
                  rows={3}
                  className="premium-form-textarea"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="premium-form-group">
                  <label className="premium-form-label">Location *</label>
                  <input
                    type="text"
                    value={resourceForm.location}
                    onChange={(e) => setResourceForm({...resourceForm, location: e.target.value})}
                    className="premium-form-input"
                  />
                </div>
                
                <div className="premium-form-group">
                  <label className="premium-form-label">Condition *</label>
                  <select
                    value={resourceForm.condition}
                    onChange={(e) => setResourceForm({...resourceForm, condition: e.target.value})}
                    className="premium-form-select"
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                <div className="premium-form-group">
                  <label className="premium-form-label">Total Quantity *</label>
                  <input
                    type="number"
                    min="1"
                    value={resourceForm.totalQuantity}
                    onChange={(e) => {
                      const total = parseInt(e.target.value) || 1;
                      setResourceForm({
                        ...resourceForm, 
                        totalQuantity: total,
                        availableQuantity: Math.min(resourceForm.availableQuantity, total)
                      });
                    }}
                    className="premium-form-input"
                  />
                </div>
                
                <div className="premium-form-group">
                  <label className="premium-form-label">Available Quantity *</label>
                  <input
                    type="number"
                    min="0"
                    max={resourceForm.totalQuantity}
                    value={resourceForm.availableQuantity}
                    onChange={(e) => setResourceForm({...resourceForm, availableQuantity: parseInt(e.target.value) || 0})}
                    className="premium-form-input"
                  />
                </div>
                
                <div className="premium-form-group">
                  <label className="premium-form-label">Max Duration (days) *</label>
                  <input
                    type="number"
                    min="1"
                    value={resourceForm.maxDuration}
                    onChange={(e) => setResourceForm({...resourceForm, maxDuration: parseInt(e.target.value) || 1})}
                    className="premium-form-input"
                  />
                </div>
              </div>

              <div className="premium-form-group">
                <label className="premium-form-label">Status *</label>
                <select
                  value={resourceForm.status}
                  onChange={(e) => setResourceForm({...resourceForm, status: e.target.value})}
                  className="premium-form-select"
                >
                  <option value="available">✅ Available</option>
                  <option value="unavailable">❌ Unavailable</option>
                </select>
              </div>
            </div>

            {/* Photo Upload Section */}
            <div style={{ 
              background: 'var(--bg-secondary)', 
              padding: '1rem', 
              borderRadius: 'var(--radius-lg)', 
              marginBottom: '1rem',
              border: '1px solid var(--primary-color, 0.1)'
            }}>
              <h4 style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                📸 Upload Photos
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Upload photos to help students easily identify the resource. Supported formats: JPG, PNG, GIF (Max 5MB per photo)
              </p>
              
              <div className="premium-form-group">
                <label className="premium-form-label">Choose Photos</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={uploadingPhoto}
                  className="premium-form-input"
                  style={{ border: '2px dashed var(--primary-color, 0.3)' }}
                />
              </div>
              
              {uploadingPhoto && (
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  <div className="premium-spinner" style={{ width: '40px', height: '40px', margin: '0 auto' }}></div>
                  <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                    Uploading photo...
                  </p>
                </div>
              )}
              
              {/* Photo Preview */}
              {photoPreview && (
                <div style={{ marginTop: '1rem' }}>
                  <h5 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    📸 Photo Preview
                  </h5>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
                    gap: '0.5rem',
                    padding: '1rem',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--primary-color, 0.1)'
                  }}>
                    {resourceForm.photos.map((photo, index) => (
                      <div key={index} style={{ position: 'relative' }}>
                        <img 
                          src={photo} 
                          alt={`Preview photo ${index + 1}`}
                          style={{ 
                            width: '100%', 
                            height: '100px', 
                            objectFit: 'cover',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--primary-color, 0.2)'
                          }}
                        />
                        <button
                          onClick={() => {
                            const newPhotos = resourceForm.photos.filter((_, i) => i !== index);
                            setResourceForm({...resourceForm, photos: newPhotos});
                            if (photoPreview === photo) {
                              setPhotoPreview(null);
                            }
                          }}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            background: 'var(--error-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingResource(null);
                  setResourceForm({
                    name: '',
                    type: '',
                    category: '',
                    description: '',
                    serialNumber: '',
                    condition: 'Good',
                    location: '',
                    maxDuration: 7,
                    totalQuantity: 1,
                    availableQuantity: 1,
                    status: 'available',
                    photos: []
                  });
                  setPhotoPreview(null);
                }}
                className="premium-button"
                style={{ background: 'var(--text-tertiary)' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveResource}
                className="premium-button premium-button-success"
              >
                {editingResource ? '💾 Update Resource' : '➕ Add Resource'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumManageResourcesWithPhotos;
