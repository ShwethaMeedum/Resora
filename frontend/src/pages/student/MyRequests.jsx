import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Mock data for requests
    const mockRequests = [
      {
        _id: '1',
        resource: { name: 'Introduction to Algorithms', type: 'Book' },
        status: 'approved',
        createdAt: new Date('2024-01-15'),
        dueDate: new Date('2024-02-15'),
        requestDate: '2024-01-15',
        notes: 'Needed for CS301 course'
      },
      {
        _id: '2',
        resource: { name: 'Dell Laptop XPS 15', type: 'Laptop' },
        status: 'borrowed',
        createdAt: new Date('2024-01-20'),
        dueDate: new Date('2024-02-20'),
        requestDate: '2024-01-18',
        notes: 'For project work'
      },
      {
        _id: '3',
        resource: { name: 'Canon EOS DSLR', type: 'Camera' },
        status: 'pending',
        createdAt: new Date('2024-01-22'),
        dueDate: null,
        requestDate: '2024-01-22',
        notes: 'Photography club project'
      },
      {
        _id: '4',
        resource: { name: 'Data Structures Book', type: 'Book' },
        status: 'returned',
        createdAt: new Date('2024-01-10'),
        dueDate: new Date('2024-01-24'),
        requestDate: '2024-01-10',
        notes: 'Completed course'
      },
      {
        _id: '5',
        resource: { name: 'iPad Pro 12.9', type: 'Tablet' },
        status: 'rejected',
        createdAt: new Date('2024-01-25'),
        dueDate: null,
        requestDate: '2024-01-25',
        notes: 'Request denied - insufficient priority'
      }
    ];

    setTimeout(() => {
      setRequests(mockRequests);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'approved': return '✅';
      case 'borrowed': return '📚';
      case 'rejected': return '❌';
      case 'returned': return '↩️';
      default: return '📋';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return { bg: '#fef3c7', color: '#92400e' };
      case 'approved': return { bg: '#d1fae5', color: '#065f46' };
      case 'borrowed': return { bg: '#dbeafe', color: '#1e40af' };
      case 'rejected': return { bg: '#fee2e2', color: '#991b1b' };
      case 'returned': return { bg: '#f3f4f6', color: '#374151' };
      default: return { bg: '#f3f4f6', color: '#374151' };
    }
  };

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

  const filteredRequests = requests.filter(request => 
    filter === 'all' || request.status === filter
  );

  const statusCounts = {
    all: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    borrowed: requests.filter(r => r.status === 'borrowed').length,
    returned: requests.filter(r => r.status === 'returned').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid #e5e7eb', borderTop: '4px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <p style={{ color: '#6b7280' }}>Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '2rem' }}>
        📋 My Requests
      </h1>

      {/* Status Filter */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              background: filter === status ? '#3b82f6' : 'white',
              color: filter === status ? 'white' : '#374151',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              if (filter !== status) {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseOut={(e) => {
              if (filter !== status) {
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredRequests.map((request) => {
          const statusStyle = getStatusColor(request.status);
          return (
            <div key={request._id} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{getTypeIcon(request.resource.type)}</span>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                      {request.resource.name}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
                      {request.resource.type}
                    </p>
                  </div>
                </div>
                
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  background: statusStyle.bg,
                  color: statusStyle.color,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  {getStatusIcon(request.status)} {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>Requested</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                    {new Date(request.requestDate).toLocaleDateString()}
                  </p>
                </div>
                {request.dueDate && (
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>Due Date</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                      {new Date(request.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>Duration</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                    {request.dueDate ? 
                      Math.ceil((new Date(request.dueDate) - new Date(request.createdAt)) / (1000 * 60 * 60 * 24)) + ' days' : 
                      'N/A'
                    }
                  </p>
                </div>
              </div>

              {request.notes && (
                <div style={{ background: '#f9fafb', padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Notes:</p>
                  <p style={{ fontSize: '0.875rem', color: '#374151', margin: 0 }}>{request.notes}</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                {request.status === 'pending' && (
                  <button style={{
                    padding: '0.5rem 1rem',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    Cancel Request
                  </button>
                )}
                {request.status === 'approved' && (
                  <button style={{
                    padding: '0.5rem 1rem',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    Confirm Pickup
                  </button>
                )}
                {request.status === 'borrowed' && (
                  <button style={{
                    padding: '0.5rem 1rem',
                    background: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    Request Return
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredRequests.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <div style={{ fontSize: '3rem', color: '#9ca3af', marginBottom: '1rem' }}>📋</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
            No {filter === 'all' ? '' : filter} requests found
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            {filter === 'all' ? 'You haven\'t made any requests yet' : `No ${filter} requests to show`}
          </p>
          <Link
            to="/student/browse"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              background: '#3b82f6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}
          >
            Browse Resources
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyRequests;
