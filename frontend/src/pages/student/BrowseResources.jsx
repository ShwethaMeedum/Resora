import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BrowseResources = () => {
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
    ];

    setTimeout(() => {
      setResources(mockResources);
      setLoading(false);
    }, 500);
  }, []);

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

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(resources.map(r => r.category))];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid #e5e7eb', borderTop: '4px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <p style={{ color: '#6b7280' }}>Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '2rem' }}>
        📚 Browse Resources
      </h1>

      {/* Search and Filter */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '1rem'
          }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            minWidth: '150px'
          }}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Resources Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredResources.map((resource) => (
          <div key={resource._id} style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem', marginRight: '0.75rem' }}>{getTypeIcon(resource.type)}</span>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                  {resource.name}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
                  {resource.type} • {resource.category}
                </p>
              </div>
            </div>
            
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.5' }}>
              {resource.description}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: resource.available ? '#d1fae5' : '#fee2e2',
                color: resource.available ? '#065f46' : '#991b1b'
              }}>
                {resource.available ? '✅ Available' : '❌ Unavailable'}
              </span>
              
              {resource.available ? (
                <Link
                  to={`/student/borrow/${resource._id}`}
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: '#3b82f6',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                >
                  Request →
                </Link>
              ) : (
                <button
                  disabled
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'not-allowed'
                  }}
                >
                  Unavailable
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <div style={{ fontSize: '3rem', color: '#9ca3af', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
            No resources found
          </h3>
          <p style={{ color: '#6b7280' }}>
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default BrowseResources;
