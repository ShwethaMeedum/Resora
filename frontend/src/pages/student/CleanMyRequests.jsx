import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CleanMyRequests = () => {
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
        purpose: 'Study for algorithms exam'
      },
      { 
        _id: '2', 
        resource: { name: 'Dell Laptop XPS 15', type: 'Laptop' }, 
        status: 'borrowed', 
        createdAt: new Date('2024-01-20'), 
        dueDate: new Date('2024-02-20'),
        purpose: 'Project work for computer science course'
      },
      { 
        _id: '3', 
        resource: { name: 'Canon DSLR Camera', type: 'Camera' }, 
        status: 'pending', 
        createdAt: new Date('2024-01-22'), 
        dueDate: null,
        purpose: 'Photography project documentation'
      },
      { 
        _id: '4', 
        resource: { name: 'Physics Textbook', type: 'Book' }, 
        status: 'returned', 
        createdAt: new Date('2024-01-10'), 
        dueDate: new Date('2024-01-24'),
        purpose: 'Physics lab work'
      },
    ];

    setRequests(mockRequests);
    setLoading(false);
  }, []);

  const filteredRequests = requests.filter(request => 
    filter === 'all' || request.status === filter
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'approved': return '✅';
      case 'borrowed': return '📚';
      case 'returned': return '↩️';
      default: return '📋';
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: { bg: '#f59e0b', color: '#92400e' },
      approved: { bg: '#10b981', color: '#065f46' },
      borrowed: { bg: '#3b82f6', color: '#1e40af' },
      returned: { bg: '#6b7280', color: '#374151' }
    };
    
    return (
      <span style={{ 
        background: colors[status].bg, 
        color: colors[status].color, 
        padding: '0.25rem 0.75rem', 
        borderRadius: '9999px', 
        fontSize: '0.75rem', 
        fontWeight: '600',
        textTransform: 'uppercase'
      }}>
        {getStatusIcon(status)} {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="clean-container">
        <div className="clean-card">
          <h2>Loading requests...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="clean-container">
      <div className="clean-card">
        <h1 className="clean-title">📋 My Requests</h1>
        <p className="clean-subtitle">Track your borrowing requests and their status</p>

        {/* Filter Tabs */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {['all', 'pending', 'approved', 'borrowed', 'returned'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className="clean-button"
                style={{
                  background: filter === status ? '#3b82f6' : '#e5e7eb',
                  color: filter === status ? 'white' : '#374151',
                  borderRadius: '8px 8px 0 0',
                  padding: '0.5rem 1rem'
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        <div style={{ marginBottom: '2rem' }}>
          {filteredRequests.map((request) => (
            <div key={request._id} className="clean-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                    {getStatusIcon(request.status)} {request.resource.name}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    <span style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                      {request.resource.type}
                    </span>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    <strong>Purpose:</strong> {request.purpose}
                  </p>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    <strong>Requested:</strong> {new Date(request.createdAt).toLocaleDateString()}
                    {request.dueDate && <><strong> | Due:</strong> {new Date(request.dueDate).toLocaleDateString()}</>}
                  </div>
                </div>
                <div>
                  {getStatusBadge(request.status)}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                {request.status === 'pending' && (
                  <button className="clean-button clean-button-danger" style={{ fontSize: '0.875rem' }}>
                    ❌ Cancel Request
                  </button>
                )}
                {request.status === 'approved' && (
                  <button className="clean-button clean-button-success" style={{ fontSize: '0.875rem' }}>
                    ✅ Confirm Borrow
                  </button>
                )}
                {request.status === 'borrowed' && (
                  <button className="clean-button clean-button-warning" style={{ fontSize: '0.875rem' }}>
                    📤 Return Item
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ color: '#6b7280', marginBottom: '1rem' }}>No requests found</h3>
            <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
              You haven't made any borrowing requests yet
            </p>
            <Link to="/student/browse" className="clean-button">
              📚 Browse Resources
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CleanMyRequests;
