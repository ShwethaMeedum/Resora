import React, { useState, useEffect } from 'react';

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Mock data
    const mockRequests = [
      {
        _id: '1',
        resource: { name: 'Introduction to Algorithms', type: 'Book' },
        user: { name: 'John Student', studentId: 'STU001', email: 'john@student.com' },
        status: 'pending',
        createdAt: new Date('2024-01-22'),
        duration: '7 days',
        purpose: 'Needed for CS301 course',
        urgent: false
      },
      {
        _id: '2',
        resource: { name: 'Dell Laptop XPS 15', type: 'Laptop' },
        user: { name: 'Jane Smith', studentId: 'STU002', email: 'jane@student.com' },
        status: 'pending',
        createdAt: new Date('2024-01-23'),
        duration: '14 days',
        purpose: 'For final year project',
        urgent: true
      },
      {
        _id: '3',
        resource: { name: 'Canon EOS DSLR', type: 'Camera' },
        user: { name: 'Mike Johnson', studentId: 'STU003', email: 'mike@student.com' },
        status: 'approved',
        createdAt: new Date('2024-01-21'),
        duration: '3 days',
        purpose: 'Photography club event',
        urgent: false
      },
      {
        _id: '4',
        resource: { name: 'Data Structures Book', type: 'Book' },
        user: { name: 'Alice Brown', studentId: 'STU004', email: 'alice@student.com' },
        status: 'borrowed',
        createdAt: new Date('2024-01-15'),
        duration: '7 days',
        purpose: 'Course study material',
        urgent: false
      },
      {
        _id: '5',
        resource: { name: 'iPad Pro 12.9', type: 'Tablet' },
        user: { name: 'Bob Wilson', studentId: 'STU005', email: 'bob@student.com' },
        status: 'rejected',
        createdAt: new Date('2024-01-20'),
        duration: '7 days',
        purpose: 'Personal use',
        urgent: false
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
    rejected: requests.filter(r => r.status === 'rejected').length,
    returned: requests.filter(r => r.status === 'returned').length,
  };

  const handleApprove = (requestId) => {
    setRequests(requests.map(r => 
      r._id === requestId ? { ...r, status: 'approved' } : r
    ));
  };

  const handleReject = (requestId) => {
    const reason = prompt('Reason for rejection:');
    if (reason) {
      setRequests(requests.map(r => 
        r._id === requestId ? { ...r, status: 'rejected', rejectionReason: reason } : r
      ));
    }
  };

  const handleMarkBorrowed = (requestId) => {
    setRequests(requests.map(r => 
      r._id === requestId ? { ...r, status: 'borrowed' } : r
    ));
  };

  const handleMarkReturned = (requestId) => {
    setRequests(requests.map(r => 
      r._id === requestId ? { ...r, status: 'returned' } : r
    ));
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
        📋 Manage Requests
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

      {/* Requests Table */}
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
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Student</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Purpose</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Duration</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Requested</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => {
              const statusStyle = getStatusColor(request.status);
              return (
                <tr key={request._id} style={{ borderTop: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>{getTypeIcon(request.resource.type)}</span>
                      <div>
                        <p style={{ fontWeight: '600', color: '#1f2937', margin: 0 }}>{request.resource.name}</p>
                        <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>{request.resource.type}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div>
                      <p style={{ fontWeight: '600', color: '#1f2937', margin: 0 }}>{request.user.name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>{request.user.studentId}</p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>{request.user.email}</p>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div>
                      <p style={{ fontSize: '0.875rem', color: '#374151', margin: 0 }}>{request.purpose}</p>
                      {request.urgent && (
                        <span style={{
                          padding: '0.125rem 0.5rem',
                          background: '#fef3c7',
                          color: '#92400e',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          ⚡ Urgent
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: '#6b7280' }}>{request.duration}</td>
                  <td style={{ padding: '1rem', color: '#6b7280' }}>
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: statusStyle.bg,
                      color: statusStyle.color,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      width: 'fit-content'
                    }}>
                      {getStatusIcon(request.status)} {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(request._id)}
                            style={{
                              padding: '0.375rem 0.75rem',
                              background: '#10b981',
                              color: 'white',
                              border: 'none',
                              borderRadius: '0.25rem',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            ✅ Approve
                          </button>
                          <button
                            onClick={() => handleReject(request._id)}
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
                            ❌ Reject
                          </button>
                        </>
                      )}
                      {request.status === 'approved' && (
                        <button
                          onClick={() => handleMarkBorrowed(request._id)}
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
                          📚 Mark Borrowed
                        </button>
                      )}
                      {request.status === 'borrowed' && (
                        <button
                          onClick={() => handleMarkReturned(request._id)}
                          style={{
                            padding: '0.375rem 0.75rem',
                            background: '#f59e0b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          ↩️ Mark Returned
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredRequests.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <div style={{ fontSize: '3rem', color: '#9ca3af', marginBottom: '1rem' }}>📋</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
            No {filter === 'all' ? '' : filter} requests found
          </h3>
          <p style={{ color: '#6b7280' }}>
            {filter === 'all' ? 'No requests have been made yet' : `No ${filter} requests to show`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageRequests;
