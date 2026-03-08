import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CleanBrowseResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Mock data for resources
    const mockResources = [
      { _id: '1', name: 'Introduction to Algorithms', type: 'Book', category: 'Computer Science', available: true, description: 'Comprehensive algorithms textbook' },
      { _id: '2', name: 'Dell Laptop XPS 15', type: 'Laptop', category: 'Technology', available: true, description: 'High-performance laptop for students' },
      { _id: '3', name: 'Canon EOS DSLR', type: 'Camera', category: 'Photography', available: false, description: 'Professional DSLR camera' },
      { _id: '4', name: 'Data Structures Book', type: 'Book', category: 'Computer Science', available: true, description: 'Essential data structures guide' },
      { _id: '5', name: 'iPad Pro 12.9', type: 'Tablet', category: 'Technology', available: true, description: 'Professional tablet for digital work' },
      { _id: '6', name: 'Physics Textbook', type: 'Book', category: 'Physics', available: true, description: 'Fundamental physics concepts' },
      { _id: '7', name: 'Epson Projector', type: 'Projector', category: 'Technology', available: false, description: 'HD projector for presentations' },
      { _id: '8', name: 'Calculus Book', type: 'Book', category: 'Mathematics', available: true, description: 'Advanced calculus textbook' },
      { _id: '9', name: 'Nikon DSLR Camera', type: 'Camera', category: 'Photography', available: true, description: 'Professional photography camera' },
      { _id: '10', name: 'HP Laptop EliteBook', type: 'Laptop', category: 'Technology', available: true, description: 'Business laptop for students' },
    ];

    setResources(mockResources);
    setLoading(false);
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
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

  const getStatusBadge = (available) => {
    return available ? 
      <span style={{ background: '#10b981', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
        ✅ Available
      </span> : 
      <span style={{ background: '#ef4444', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
        ❌ Unavailable
      </span>;
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
        <h1 className="clean-title">📚 Browse Resources</h1>
        <p className="clean-subtitle">Explore and request available resources</p>

        {/* Search and Filter */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                background: 'white'
              }}
            >
              <option value="all">All Categories</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Technology">Technology</option>
              <option value="Photography">Photography</option>
              <option value="Physics">Physics</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredResources.map((resource) => (
            <div key={resource._id} className="clean-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                    {getTypeIcon(resource.type)} {resource.name}
                  </h3>
                  <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                    {resource.description}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem' }}>
                    <span style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                      {resource.type}
                    </span>
                    <span style={{ background: '#e0e7ff', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                      {resource.category}
                    </span>
                  </div>
                </div>
                <div>
                  {getStatusBadge(resource.available)}
                </div>
              </div>
              
              {resource.available && (
                <Link 
                  to={`/student/borrow/${resource._id}`}
                  className="clean-button"
                  style={{ display: 'block', textAlign: 'center', marginTop: '1rem' }}
                >
                  📤 Request Resource
                </Link>
              )}
              
              {!resource.available && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '0.75rem', 
                  background: '#fef3c7', 
                  color: '#92400e', 
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  Currently Unavailable
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ color: '#6b7280', marginBottom: '1rem' }}>No resources found</h3>
            <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
              Try adjusting your search or filter criteria
            </p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="clean-button"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CleanBrowseResources;
