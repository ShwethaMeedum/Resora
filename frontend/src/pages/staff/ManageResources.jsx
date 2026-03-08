import React, { useState, useEffect } from 'react';

const ManageResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingResource, setEditingResource] = useState(null);

  useEffect(() => {
    // Mock data
    const mockResources = [
      { _id: '1', name: 'Introduction to Algorithms', type: 'Book', category: 'Computer Science', available: true, quantity: 5, borrowed: 2 },
      { _id: '2', name: 'Dell Laptop XPS 15', type: 'Laptop', category: 'Technology', available: true, quantity: 3, borrowed: 1 },
      { _id: '3', name: 'Canon EOS DSLR', type: 'Camera', category: 'Photography', available: false, quantity: 2, borrowed: 2 },
      { _id: '4', name: 'Data Structures Book', type: 'Book', category: 'Computer Science', available: true, quantity: 10, borrowed: 3 },
      { _id: '5', name: 'iPad Pro 12.9', type: 'Tablet', category: 'Technology', available: true, quantity: 4, borrowed: 1 },
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

  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddResource = (newResource) => {
    const resource = {
      ...newResource,
      _id: Date.now().toString(),
      available: true,
      borrowed: 0
    };
    setResources([...resources, resource]);
    setShowAddForm(false);
  };

  const handleEditResource = (updatedResource) => {
    setResources(resources.map(r => r._id === updatedResource._id ? updatedResource : r));
    setEditingResource(null);
  };

  const handleDeleteResource = (resourceId) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter(r => r._id !== resourceId));
    }
  };

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937' }}>
          📚 Manage Resources
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          ➕ Add Resource
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search resources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '1px solid #d1d5db',
          borderRadius: '0.5rem',
          fontSize: '1rem',
          marginBottom: '2rem'
        }}
      />

      {/* Resources Table */}
      <div style={{
        background: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Resource</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Type</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Category</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Quantity</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResources.map((resource) => (
              <tr key={resource._id} style={{ borderTop: '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>{getTypeIcon(resource.type)}</span>
                    <div>
                      <p style={{ fontWeight: '600', color: '#1f2937', margin: 0 }}>{resource.name}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem', color: '#6b7280' }}>{resource.type}</td>
                <td style={{ padding: '1rem', color: '#6b7280' }}>{resource.category}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {resource.quantity - resource.borrowed}/{resource.quantity}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    background: resource.available ? '#d1fae5' : '#fee2e2',
                    color: resource.available ? '#065f46' : '#991b1b'
                  }}>
                    {resource.available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setEditingResource(resource)}
                      style={{
                        padding: '0.375rem 0.75rem',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteResource(resource._id)}
                      style={{
                        padding: '0.375rem 0.75rem',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Resource Modal */}
      {(showAddForm || editingResource) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '0.5rem',
            width: '90%',
            maxWidth: '500px'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
              {editingResource ? 'Edit Resource' : 'Add New Resource'}
            </h2>
            <ResourceForm
              resource={editingResource}
              onSubmit={editingResource ? handleEditResource : handleAddResource}
              onCancel={() => {
                setShowAddForm(false);
                setEditingResource(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ResourceForm = ({ resource, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: resource?.name || '',
    type: resource?.type || 'Book',
    category: resource?.category || '',
    quantity: resource?.quantity || 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(resource ? { ...formData, _id: resource._id } : formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
          Resource Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '1rem'
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
          Type *
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '1rem'
          }}
        >
          <option value="Book">Book</option>
          <option value="Laptop">Laptop</option>
          <option value="Camera">Camera</option>
          <option value="Tablet">Tablet</option>
          <option value="Projector">Projector</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
          Category *
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '1rem'
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
          Quantity *
        </label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          min="1"
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '1rem'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          {resource ? 'Update' : 'Add'} Resource
        </button>
      </div>
    </form>
  );
};

export default ManageResources;
