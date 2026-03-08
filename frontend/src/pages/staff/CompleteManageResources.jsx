import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CompleteManageResources = () => {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingResource, setEditingResource] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
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
    status: 'available'
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });

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

    // Mock categories
    const mockCategories = [
      { _id: '1', name: 'Computer Science', description: 'Books and materials for computer science courses', resourceCount: 15 },
      { _id: '2', name: 'Technology', description: 'Electronic devices and tech equipment', resourceCount: 8 },
      { _id: '3', name: 'Photography', description: 'Cameras and photography equipment', resourceCount: 5 },
      { _id: '4', name: 'Physics', description: 'Physics textbooks and equipment', resourceCount: 6 },
      { _id: '5', name: 'Mathematics', description: 'Mathematics textbooks and materials', resourceCount: 4 }
    ];

    // Mock resources with quantity tracking
    const mockResources = [
      { 
        _id: '1', 
        name: 'Introduction to Algorithms', 
        type: 'Book', 
        category: 'Computer Science',
        description: 'Comprehensive algorithms textbook by Cormen et al.',
        serialNumber: 'CS-BOOK-001',
        condition: 'Excellent',
        location: 'Library - Section A',
        maxDuration: 14,
        totalQuantity: 5,
        availableQuantity: 3,
        borrowedQuantity: 2,
        status: 'available',
        createdAt: new Date('2024-01-01'),
        lastUpdated: new Date('2024-01-20')
      },
      { 
        _id: '2', 
        name: 'Dell Laptop XPS 15', 
        type: 'Laptop', 
        category: 'Technology',
        description: 'High-performance laptop with 16GB RAM, 512GB SSD',
        serialNumber: 'TECH-LAP-002',
        condition: 'Good',
        location: 'Tech Lab - Room 201',
        maxDuration: 7,
        totalQuantity: 3,
        availableQuantity: 1,
        borrowedQuantity: 2,
        status: 'available',
        createdAt: new Date('2024-01-02'),
        lastUpdated: new Date('2024-01-19')
      },
      { 
        _id: '3', 
        name: 'Canon EOS DSLR', 
        type: 'Camera', 
        category: 'Photography',
        description: 'Professional DSLR camera with 18-55mm lens',
        serialNumber: 'PHOTO-CAM-003',
        condition: 'Good',
        location: 'Media Lab - Room 105',
        maxDuration: 3,
        totalQuantity: 2,
        availableQuantity: 0,
        borrowedQuantity: 2,
        status: 'unavailable',
        createdAt: new Date('2024-01-03'),
        lastUpdated: new Date('2024-01-18')
      },
      { 
        _id: '4', 
        name: 'Data Structures Book', 
        type: 'Book', 
        category: 'Computer Science',
        description: 'Essential data structures and algorithms guide',
        serialNumber: 'CS-BOOK-004',
        condition: 'Very Good',
        location: 'Library - Section A',
        maxDuration: 14,
        totalQuantity: 4,
        availableQuantity: 4,
        borrowedQuantity: 0,
        status: 'available',
        createdAt: new Date('2024-01-04'),
        lastUpdated: new Date('2024-01-17')
      },
      { 
        _id: '5', 
        name: 'iPad Pro 12.9', 
        type: 'Tablet', 
        category: 'Technology',
        description: 'Professional tablet with Apple Pencil support',
        serialNumber: 'TECH-TAB-005',
        condition: 'Excellent',
        location: 'Tech Lab - Room 201',
        maxDuration: 7,
        totalQuantity: 6,
        availableQuantity: 2,
        borrowedQuantity: 4,
        status: 'available',
        createdAt: new Date('2024-01-05'),
        lastUpdated: new Date('2024-01-16')
      }
    ];

    setCategories(mockCategories);
    setResources(mockResources);
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
      status: resource.status
    });
  };

  const handleSaveResource = () => {
    if (editingResource) {
      // Update existing resource
      const updatedResources = resources.map(r => 
        r._id === editingResource._id 
          ? { ...r, ...resourceForm, lastUpdated: new Date() }
          : r
      );
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
        status: 'available'
      });
    } else {
      // Add new resource
      const newResource = {
        _id: Date.now().toString(),
        ...resourceForm,
        borrowedQuantity: 0,
        createdAt: new Date(),
        lastUpdated: new Date()
      };
      setResources([...resources, newResource]);
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
        status: 'available'
      });
    }
  };

  const handleDeleteResource = (resourceId) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter(r => r._id !== resourceId));
    }
  };

  const handleToggleStatus = (resourceId) => {
    const updatedResources = resources.map(r => {
      if (r._id === resourceId) {
        const newStatus = r.status === 'available' ? 'unavailable' : 'available';
        return {
          ...r,
          status: newStatus,
          availableQuantity: newStatus === 'available' ? r.totalQuantity : 0,
          lastUpdated: new Date()
        };
      }
      return r;
    });
    setResources(updatedResources);
  };

  const handleAddCategory = () => {
    const newCategory = {
      _id: Date.now().toString(),
      ...categoryForm,
      resourceCount: 0
    };
    setCategories([...categories, newCategory]);
    setCategoryForm({ name: '', description: '' });
    setShowCategoryForm(false);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c._id !== categoryId));
    }
  };

  if (loading) {
    return (
      <div className="clean-container">
        <div className="clean-card">
          <h2>Loading resources...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="clean-container">
      <div className="clean-card">
        <h1 className="clean-title">📦 Manage Resources</h1>
        <p className="clean-subtitle">Complete inventory management for all resources</p>

        {/* Quick Stats */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="clean-section-title">📊 Inventory Overview</h2>
          <div className="clean-stats">
            <div className="clean-stat-card">
              <div className="clean-stat-icon">📦</div>
              <div className="clean-stat-value">{resources.length}</div>
              <div className="clean-stat-label">Total Resources</div>
            </div>
            <div className="clean-stat-card">
              <div className="clean-stat-icon">✅</div>
              <div className="clean-stat-value">{resources.filter(r => r.status === 'available').length}</div>
              <div className="clean-stat-label">Available</div>
            </div>
            <div className="clean-stat-card">
              <div className="clean-stat-icon">❌</div>
              <div className="clean-stat-value">{resources.filter(r => r.status === 'unavailable').length}</div>
              <div className="clean-stat-label">Unavailable</div>
            </div>
            <div className="clean-stat-card">
              <div className="clean-stat-icon">📚</div>
              <div className="clean-stat-value">{categories.length}</div>
              <div className="clean-stat-label">Categories</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowAddForm(true)}
              className="clean-button clean-button-success"
            >
              ➕ Add New Resource
            </button>
            <button
              onClick={() => setShowCategoryForm(true)}
              className="clean-button"
              style={{ background: '#8b5cf6' }}
            >
              📁 Manage Categories
            </button>
            <Link to="/staff/requests" className="clean-button clean-button-warning">
              📋 Manage Requests
            </Link>
          </div>
        </div>

        {/* Search and Filter */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                background: 'white'
              }}
            >
              <option value="all">All Resources</option>
              <option value="available">Available Only</option>
              <option value="unavailable">Unavailable Only</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resources List */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>
            📦 Resources ({filteredResources.length} found)
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {filteredResources.map((resource) => {
              const stockStatus = getStockStatus(resource.availableQuantity, resource.totalQuantity);
              return (
                <div key={resource._id} className="clean-card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937' }}>
                          {getTypeIcon(resource.type)} {resource.name}
                        </h4>
                        <span style={{ 
                          background: stockStatus.color, 
                          color: 'white', 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '9999px', 
                          fontSize: '0.75rem', 
                          fontWeight: '600' 
                        }}>
                          {stockStatus.icon} {stockStatus.text}
                        </span>
                      </div>
                      
                      <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                        {resource.description}
                      </p>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
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
                  
                  {/* Stock Information */}
                  <div style={{ 
                    background: '#f9fafb', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    marginBottom: '1rem',
                    border: '1px solid #e5e7eb'
                  }}>
                    <h5 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                      📊 Stock Information
                    </h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
                      <div>
                        <div style={{ color: '#6b7280' }}>Total Stock</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
                          {resource.totalQuantity}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: '#6b7280' }}>Available</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' }}>
                          {resource.availableQuantity}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: '#6b7280' }}>Borrowed</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f59e0b' }}>
                          {resource.borrowedQuantity}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: '#6b7280' }}>Utilization</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#3b82f6' }}>
                          {Math.round((resource.borrowedQuantity / resource.totalQuantity) * 100)}%
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleEditResource(resource)}
                      className="clean-button"
                      style={{ fontSize: '0.875rem' }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(resource._id)}
                      className="clean-button"
                      style={{ 
                        fontSize: '0.875rem',
                        background: resource.status === 'available' ? '#f59e0b' : '#10b981'
                      }}
                    >
                      {resource.status === 'available' ? '🔒 Make Unavailable' : '🔓 Make Available'}
                    </button>
                    {resource.borrowedQuantity === 0 && (
                      <button
                        onClick={() => handleDeleteResource(resource._id)}
                        className="clean-button clean-button-danger"
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

        {/* Add/Edit Resource Form */}
        {(showAddForm || editingResource) && (
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(0,0,0,0.5)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{ 
              background: 'white', 
              padding: '2rem', 
              borderRadius: '1rem', 
              maxWidth: '600px', 
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}>
              <h3 style={{ marginBottom: '1.5rem' }}>
                {editingResource ? '✏️ Edit Resource' : '➕ Add New Resource'}
              </h3>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Resource Name *
                    </label>
                    <input
                      type="text"
                      value={resourceForm.name}
                      onChange={(e) => setResourceForm({...resourceForm, name: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Type *
                    </label>
                    <select
                      value={resourceForm.type}
                      onChange={(e) => setResourceForm({...resourceForm, type: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        background: 'white'
                      }}
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
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Category *
                    </label>
                    <select
                      value={resourceForm.category}
                      onChange={(e) => setResourceForm({...resourceForm, category: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        background: 'white'
                      }}
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Serial Number *
                    </label>
                    <input
                      type="text"
                      value={resourceForm.serialNumber}
                      onChange={(e) => setResourceForm({...resourceForm, serialNumber: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                    Description *
                  </label>
                  <textarea
                    value={resourceForm.description}
                    onChange={(e) => setResourceForm({...resourceForm, description: e.target.value})}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Location *
                    </label>
                    <input
                      type="text"
                      value={resourceForm.location}
                      onChange={(e) => setResourceForm({...resourceForm, location: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Condition *
                    </label>
                    <select
                      value={resourceForm.condition}
                      onChange={(e) => setResourceForm({...resourceForm, condition: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        background: 'white'
                      }}
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Very Good">Very Good</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Total Quantity *
                    </label>
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
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Available Quantity *
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={resourceForm.totalQuantity}
                      value={resourceForm.availableQuantity}
                      onChange={(e) => setResourceForm({...resourceForm, availableQuantity: parseInt(e.target.value) || 0})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Max Duration (days) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={resourceForm.maxDuration}
                      onChange={(e) => setResourceForm({...resourceForm, maxDuration: parseInt(e.target.value) || 1})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                    Status *
                  </label>
                  <select
                    value={resourceForm.status}
                    onChange={(e) => setResourceForm({...resourceForm, status: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  >
                    <option value="available">✅ Available</option>
                    <option value="unavailable">❌ Unavailable</option>
                  </select>
                </div>
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
                      status: 'available'
                    });
                  }}
                  className="clean-button"
                  style={{ background: '#6b7280' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveResource}
                  className="clean-button clean-button-success"
                >
                  {editingResource ? '💾 Update Resource' : '➕ Add Resource'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Management */}
        {showCategoryForm && (
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(0,0,0,0.5)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{ 
              background: 'white', 
              padding: '2rem', 
              borderRadius: '1rem', 
              maxWidth: '500px', 
              width: '90%'
            }}>
              <h3 style={{ marginBottom: '1.5rem' }}>📁 Manage Categories</h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Add New Category</h4>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Category Name *
                    </label>
                    <input
                      type="text"
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Description
                    </label>
                    <textarea
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Existing Categories</h4>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {categories.map(cat => (
                    <div key={cat._id} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '0.75rem',
                      background: '#f9fafb',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#1f2937' }}>{cat.name}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{cat.description}</div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{cat.resourceCount} resources</div>
                      </div>
                      <button
                        onClick={() => handleDeleteCategory(cat._id)}
                        className="clean-button clean-button-danger"
                        style={{ fontSize: '0.875rem' }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    setShowCategoryForm(false);
                    setCategoryForm({ name: '', description: '' });
                  }}
                  className="clean-button"
                  style={{ background: '#6b7280' }}
                >
                  Close
                </button>
                <button
                  onClick={handleAddCategory}
                  className="clean-button clean-button-success"
                >
                  ➕ Add Category
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteManageResources;
