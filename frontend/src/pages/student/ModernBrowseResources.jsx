import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ModernBrowseResources = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();

  // Mock data
  const allResources = [
    {
      _id: '1',
      name: 'Advanced Mathematics Textbook',
      category: 'Mathematics',
      type: 'book',
      status: 'available',
      description: 'Comprehensive guide to advanced mathematical concepts',
      author: 'Dr. Sarah Johnson',
      isbn: '978-0-123456-78-9',
      location: 'Library Shelf A-12',
      condition: 'Excellent',
      image: 'https://picsum.photos/seed/math-book/300/400.jpg'
    },
    {
      _id: '2',
      name: 'Physics Lab Equipment Kit',
      category: 'Science',
      type: 'equipment',
      status: 'available',
      description: 'Complete set of physics laboratory equipment',
      serialNumber: 'PHY-2024-001',
      location: 'Lab Room 301',
      condition: 'Good',
      image: 'https://picsum.photos/seed/physics-lab/300/400.jpg'
    },
    {
      _id: '3',
      name: 'Programming Reference Guide',
      category: 'Computer Science',
      type: 'book',
      status: 'available',
      description: 'Essential programming concepts and best practices',
      author: 'Prof. Michael Chen',
      isbn: '978-0-987654-32-1',
      location: 'Library Shelf B-05',
      condition: 'Excellent',
      image: 'https://picsum.photos/seed/programming-book/300/400.jpg'
    },
    {
      _id: '4',
      name: 'Chemistry Research Papers',
      category: 'Research',
      type: 'digital',
      status: 'available',
      description: 'Collection of recent chemistry research papers',
      format: 'Digital PDF Collection',
      location: 'Digital Library',
      condition: 'N/A',
      image: 'https://picsum.photos/seed/chemistry-papers/300/400.jpg'
    },
    {
      _id: '5',
      name: 'Engineering Calculator',
      category: 'Engineering',
      type: 'equipment',
      status: 'borrowed',
      description: 'Scientific calculator with advanced functions',
      serialNumber: 'ENG-2024-045',
      location: 'Storage Room 102',
      condition: 'Good',
      image: 'https://picsum.photos/seed/calculator/300/400.jpg'
    },
    {
      _id: '6',
      name: 'Data Structures Handbook',
      category: 'Computer Science',
      type: 'book',
      status: 'available',
      description: 'Complete reference for data structures and algorithms',
      author: 'Dr. Emily Davis',
      isbn: '978-0-456789-12-3',
      location: 'Library Shelf C-08',
      condition: 'Excellent',
      image: 'https://picsum.photos/seed/data-structures/300/400.jpg'
    },
    {
      _id: '7',
      name: 'Biology Lab Microscope',
      category: 'Science',
      type: 'equipment',
      status: 'available',
      description: 'High-resolution microscope for biological studies',
      serialNumber: 'BIO-2024-012',
      location: 'Lab Room 205',
      condition: 'Excellent',
      image: 'https://picsum.photos/seed/microscope/300/400.jpg'
    },
    {
      _id: '8',
      name: 'Statistical Analysis Software',
      category: 'Software',
      type: 'digital',
      status: 'available',
      description: 'Professional statistical analysis tools',
      format: 'Software License',
      location: 'Computer Lab 401',
      condition: 'N/A',
      image: 'https://picsum.photos/seed/statistics/300/400.jpg'
    }
  ];

  const categories = ['all', 'Mathematics', 'Science', 'Computer Science', 'Engineering', 'Research', 'Software'];
  const types = ['all', 'book', 'equipment', 'digital'];
  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'category', label: 'Category' },
    { value: 'type', label: 'Type' },
    { value: 'status', label: 'Status' }
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

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'category') return a.category.localeCompare(b.category);
    if (sortBy === 'type') return a.type.localeCompare(b.type);
    if (sortBy === 'status') return a.status.localeCompare(b.status);
    return 0;
  });

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading resources...</p>
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
            <p className="empty-state-message">Please log in to browse resources</p>
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
            <Link to="/student/dashboard" className="nav-link">
              <span className="nav-icon">📊</span>
              <span>Dashboard</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/student/browse" className="nav-link active">
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
            <div className="view-toggle">
              <button 
                className={`btn btn-ghost btn-icon ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <span>⊞</span>
              </button>
              <button 
                className={`btn btn-ghost btn-icon ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <span>☰</span>
              </button>
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
          {/* Page Header */}
          <div className="page-header fade-in">
            <h1 className="page-title">Browse Resources</h1>
            <p className="page-subtitle">Explore our extensive collection of academic resources</p>
          </div>

          {/* Filters */}
          <div className="filters-section fade-in-up">
            <div className="filters-container">
              <div className="filter-group">
                <label className="filter-label">Category</label>
                <div className="filter-options">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category === 'all' ? '📂 All' : category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Type</label>
                <div className="filter-options">
                  {types.map(type => (
                    <button
                      key={type}
                      className={`filter-chip ${selectedType === type ? 'active' : ''}`}
                      onClick={() => setSelectedType(type)}
                    >
                      {type === 'all' ? '📦 All' : `${getTypeIcon(type)} ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="results-info">
              <span className="results-count">
                {filteredResources.length} resources found
              </span>
            </div>
          </div>

          {/* Resources Grid/List */}
          {filteredResources.length === 0 ? (
            <div className="empty-state fade-in-up">
              <div className="empty-state-icon">🔍</div>
              <h2 className="empty-state-title">No Resources Found</h2>
              <p className="empty-state-message">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedType('all');
                }}
                className="btn btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={`resources-container ${viewMode} fade-in-up`}>
              {filteredResources.map((resource) => (
                <div key={resource._id} className="resource-card card">
                  <div className="resource-image">
                    <img 
                      src={resource.image} 
                      alt={resource.name}
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/seed/${resource._id}/300/400.jpg`;
                      }}
                    />
                    <div className="resource-type-badge">
                      <span>{getTypeIcon(resource.type)}</span>
                      <span>{resource.type}</span>
                    </div>
                  </div>
                  
                  <div className="resource-content">
                    <div className="resource-header">
                      <h3 className="resource-name">{resource.name}</h3>
                      <span 
                        className="badge"
                        style={getStatusColor(resource.status)}
                      >
                        {resource.status}
                      </span>
                    </div>
                    
                    <p className="resource-description">{resource.description}</p>
                    
                    <div className="resource-details">
                      <div className="detail-item">
                        <span className="detail-label">Category:</span>
                        <span className="detail-value">{resource.category}</span>
                      </div>
                      {resource.author && (
                        <div className="detail-item">
                          <span className="detail-label">Author:</span>
                          <span className="detail-value">{resource.author}</span>
                        </div>
                      )}
                      {resource.isbn && (
                        <div className="detail-item">
                          <span className="detail-label">ISBN:</span>
                          <span className="detail-value">{resource.isbn}</span>
                        </div>
                      )}
                      {resource.serialNumber && (
                        <div className="detail-item">
                          <span className="detail-label">Serial:</span>
                          <span className="detail-value">{resource.serialNumber}</span>
                        </div>
                      )}
                      <div className="detail-item">
                        <span className="detail-label">Location:</span>
                        <span className="detail-value">{resource.location}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Condition:</span>
                        <span className="detail-value">{resource.condition}</span>
                      </div>
                    </div>
                    
                    <div className="resource-actions">
                      <Link 
                        to={`/student/borrow/${resource._id}`}
                        className={`btn ${resource.status === 'available' ? 'btn-primary' : 'btn-secondary'}`}
                        disabled={resource.status !== 'available'}
                      >
                        {resource.status === 'available' ? '📋 Request' : '📚 Not Available'}
                      </Link>
                      <button className="btn btn-ghost btn-sm">
                        <span>👁️</span>
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .page-header {
          margin-bottom: var(--spacing-8);
        }

        .filters-section {
          margin-bottom: var(--spacing-8);
        }

        .filters-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
          margin-bottom: var(--spacing-4);
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-3);
        }

        .filter-label {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
        }

        .filter-options {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-2);
        }

        .filter-chip {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-1);
          padding: var(--spacing-2) var(--spacing-3);
          background: var(--bg-secondary);
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-full);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .filter-chip:hover {
          border-color: var(--primary-light);
          background: var(--primary-lightest);
          color: var(--primary-dark);
        }

        .filter-chip.active {
          border-color: var(--primary-color);
          background: var(--primary-color);
          color: var(--text-inverse);
        }

        .results-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-3) 0;
          border-top: 1px solid var(--gray-200);
        }

        .results-count {
          font-size: var(--font-size-sm);
          color: var(--text-tertiary);
        }

        .view-toggle {
          display: flex;
          gap: var(--spacing-1);
          background: var(--bg-tertiary);
          padding: var(--spacing-1);
          border-radius: var(--radius-lg);
        }

        .view-toggle .btn.active {
          background: var(--bg-secondary);
          box-shadow: var(--shadow-sm);
        }

        .resources-container {
          display: grid;
          gap: var(--spacing-6);
        }

        .resources-container.grid {
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        }

        .resources-container.list {
          grid-template-columns: 1fr;
        }

        .resource-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all var(--transition-normal);
        }

        .resources-container.list .resource-card {
          flex-direction: row;
          align-items: center;
        }

        .resource-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .resource-image {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: var(--bg-tertiary);
        }

        .resources-container.list .resource-image {
          width: 120px;
          height: 120px;
          aspect-ratio: 1;
          flex-shrink: 0;
        }

        .resource-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-normal);
        }

        .resource-card:hover .resource-image img {
          transform: scale(1.05);
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

        .resource-content {
          flex: 1;
          padding: var(--spacing-5);
          display: flex;
          flex-direction: column;
        }

        .resources-container.list .resource-content {
          padding: var(--spacing-4);
        }

        .resource-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: var(--spacing-3);
        }

        .resources-container.list .resource-header {
          margin-bottom: var(--spacing-2);
        }

        .resource-name {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin-bottom: 0;
          line-height: var(--line-height-tight);
        }

        .resources-container.list .resource-name {
          font-size: var(--font-size-base);
        }

        .resource-description {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          margin-bottom: var(--spacing-4);
          line-height: var(--line-height-normal);
        }

        .resources-container.list .resource-description {
          margin-bottom: var(--spacing-2);
        }

        .resource-details {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
          margin-bottom: var(--spacing-4);
        }

        .resources-container.list .resource-details {
          margin-bottom: var(--spacing-3);
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: var(--font-size-sm);
        }

        .detail-label {
          color: var(--text-tertiary);
          font-weight: var(--font-weight-medium);
        }

        .detail-value {
          color: var(--text-primary);
          font-weight: var(--font-weight-medium);
        }

        .resource-actions {
          display: flex;
          gap: var(--spacing-2);
          margin-top: auto;
        }

        .resources-container.list .resource-actions {
          flex-direction: column;
          align-items: flex-end;
        }

        @media (max-width: 768px) {
          .resources-container.grid {
            grid-template-columns: 1fr;
          }
          
          .resources-container.list .resource-card {
            flex-direction: column;
          }
          
          .resources-container.list .resource-image {
            width: 100%;
            height: 200px;
            aspect-ratio: 16/9;
          }
          
          .filter-options {
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: var(--spacing-2);
          }
          
          .results-info {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-2);
          }
        }

        @media (max-width: 640px) {
          .resource-actions {
            flex-direction: column;
          }
          
          .resources-container.list .resource-actions {
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
};

export default ModernBrowseResources;
