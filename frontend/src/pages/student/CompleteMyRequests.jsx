import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CompleteMyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState(null);

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

    // Mock comprehensive borrowing history
    const mockRequests = [
      { 
        _id: '1', 
        resource: { 
          name: 'Introduction to Algorithms', 
          type: 'Book', 
          category: 'Computer Science',
          serialNumber: 'CS-BOOK-001'
        }, 
        status: 'approved', 
        createdAt: new Date('2024-01-15'), 
        borrowDate: new Date('2024-01-16'),
        dueDate: new Date('2024-01-30'),
        returnDate: null,
        purpose: 'Study for algorithms midterm exam',
        specialRequirements: 'Need access to chapter 5-8',
        approvedBy: 'Dr. Smith',
        approvedAt: new Date('2024-01-15 14:30'),
        actualReturnDate: null,
        overdueDays: 0,
        renewalCount: 0
      },
      { 
        _id: '2', 
        resource: { 
          name: 'Dell Laptop Model XPS', 
          type: 'Laptop', 
          category: 'Technology',
          serialNumber: 'TECH-LAP-002'
        }, 
        status: 'borrowed', 
        createdAt: new Date('2024-01-20'), 
        borrowDate: new Date('2024-01-21'),
        dueDate: new Date('2024-01-28'),
        returnDate: null,
        purpose: 'Final project development for CS301',
        specialRequirements: 'Need with Visual Studio installed',
        approvedBy: 'Jane Staff',
        approvedAt: new Date('2024-01-20 10:15'),
        actualReturnDate: null,
        overdueDays: 0,
        renewalCount: 1
      },
      { 
        _id: '3', 
        resource: { 
          name: 'Canon DSLR Camera', 
          type: 'Camera', 
          category: 'Photography',
          serialNumber: 'PHOTO-CAM-003'
        }, 
        status: 'pending', 
        createdAt: new Date('2024-01-22'), 
        borrowDate: null,
        dueDate: null,
        returnDate: null,
        purpose: 'Photography project documentation',
        specialRequirements: 'Need tripod and additional lenses',
        approvedBy: null,
        approvedAt: null,
        actualReturnDate: null,
        overdueDays: 0,
        renewalCount: 0
      },
      { 
        _id: '4', 
        resource: { 
          name: 'Physics Textbook', 
          type: 'Book', 
          category: 'Physics',
          serialNumber: 'PHY-BOOK-006'
        }, 
        status: 'returned', 
        createdAt: new Date('2024-01-10'), 
        borrowDate: new Date('2024-01-11'),
        dueDate: new Date('2024-01-25'),
        returnDate: new Date('2024-01-24'),
        purpose: 'Physics lab work and assignments',
        specialRequirements: null,
        approvedBy: 'Dr. Johnson',
        approvedAt: new Date('2024-01-10 16:45'),
        actualReturnDate: new Date('2024-01-24'),
        overdueDays: 0,
        renewalCount: 0
      },
      { 
        _id: '5', 
        resource: { 
          name: 'iPad Pro', 
          type: 'Tablet', 
          category: 'Technology',
          serialNumber: 'TECH-TAB-005'
        }, 
        status: 'rejected', 
        createdAt: new Date('2024-01-05'), 
        borrowDate: null,
        dueDate: null,
        returnDate: null,
        purpose: 'Personal use',
        specialRequirements: null,
        approvedBy: 'Jane Staff',
        approvedAt: new Date('2024-01-05 09:30'),
        actualReturnDate: null,
        overdueDays: 0,
        renewalCount: 0,
        rejectionReason: 'Purpose not academic-related'
      },
      { 
        _id: '6', 
        resource: { 
          name: 'Data Structures Book', 
          type: 'Book', 
          category: 'Computer Science',
          serialNumber: 'CS-BOOK-004'
        }, 
        status: 'overdue', 
        createdAt: new Date('2023-12-15'), 
        borrowDate: new Date('2023-12-16'),
        dueDate: new Date('2023-12-30'),
        returnDate: null,
        purpose: 'Study for final exams',
        specialRequirements: null,
        approvedBy: 'Dr. Smith',
        approvedAt: new Date('2023-12-15 11:20'),
        actualReturnDate: null,
        overdueDays: 15,
        renewalCount: 2
      }
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
      case 'rejected': return '❌';
      case 'overdue': return '⚠️';
      default: return '📋';
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: { bg: '#f59e0b', color: '#92400e' },
      approved: { bg: '#10b981', color: '#065f46' },
      borrowed: { bg: '#3b82f6', color: '#1e40af' },
      returned: { bg: '#6b7280', color: '#374151' },
      rejected: { bg: '#ef4444', color: '#991b1b' },
      overdue: { bg: '#dc2626', color: '#ffffff' }
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

  const getDaysRemaining = (dueDate, status) => {
    if (status !== 'borrowed' && status !== 'approved') return null;
    
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)} days overdue`, color: '#dc2626' };
    } else if (diffDays === 0) {
      return { text: 'Due today', color: '#f59e0b' };
    } else if (diffDays <= 3) {
      return { text: `${diffDays} days left`, color: '#f59e0b' };
    } else {
      return { text: `${diffDays} days left`, color: '#10b981' };
    }
  };

  const getStats = () => {
    const stats = {
      total: requests.length,
      pending: requests.filter(r => r.status === 'pending').length,
      active: requests.filter(r => r.status === 'borrowed' || r.status === 'approved').length,
      overdue: requests.filter(r => r.status === 'overdue').length,
      returned: requests.filter(r => r.status === 'returned').length,
      rejected: requests.filter(r => r.status === 'rejected').length
    };
    return stats;
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="clean-container">
        <div className="clean-card">
          <h2>Loading borrowing history...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="clean-container">
      <div className="clean-card">
        <h1 className="clean-title">📋 My Borrowing History</h1>
        <p className="clean-subtitle">Track all your borrowing requests and their status</p>

        {/* Statistics Overview */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="clean-section-title">📊 Borrowing Statistics</h2>
          <div className="clean-stats">
            <div className="clean-stat-card">
              <div className="clean-stat-icon">📚</div>
              <div className="clean-stat-value">{stats.total}</div>
              <div className="clean-stat-label">Total Requests</div>
            </div>
            <div className="clean-stat-card">
              <div className="clean-stat-icon">⏳</div>
              <div className="clean-stat-value">{stats.pending}</div>
              <div className="clean-stat-label">Pending</div>
            </div>
            <div className="clean-stat-card">
              <div className="clean-stat-icon">📖</div>
              <div className="clean-stat-value">{stats.active}</div>
              <div className="clean-stat-label">Active</div>
            </div>
            <div className="clean-stat-card">
              <div className="clean-stat-icon">⚠️</div>
              <div className="clean-stat-value">{stats.overdue}</div>
              <div className="clean-stat-label">Overdue</div>
            </div>
            <div className="clean-stat-card">
              <div className="clean-stat-icon">↩️</div>
              <div className="clean-stat-value">{stats.returned}</div>
              <div className="clean-stat-label">Returned</div>
            </div>
            <div className="clean-stat-card">
              <div className="clean-stat-icon">❌</div>
              <div className="clean-stat-value">{stats.rejected}</div>
              <div className="clean-stat-label">Rejected</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>🔍 Filter Requests</h3>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {['all', 'pending', 'approved', 'borrowed', 'returned', 'rejected', 'overdue'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className="clean-button"
                style={{
                  background: filter === status ? '#3b82f6' : '#e5e7eb',
                  color: filter === status ? 'white' : '#374151',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem'
                }}
              >
                {getStatusIcon(status)} {status.charAt(0).toUpperCase() + status.slice(1)} 
                {status !== 'all' && (
                  <span style={{ 
                    background: 'rgba(255,255,255,0.2)', 
                    padding: '0.125rem 0.375rem', 
                    borderRadius: '9999px', 
                    marginLeft: '0.5rem',
                    fontSize: '0.75rem'
                  }}>
                    {getStats()[status] || 0}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>
            📋 Request History ({filteredRequests.length} found)
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {filteredRequests.map((request) => (
              <div key={request._id} className="clean-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937' }}>
                        {getTypeIcon(request.resource.type)} {request.resource.name}
                      </h4>
                      {getStatusBadge(request.status)}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      <span><strong>Type:</strong> {request.resource.type}</span>
                      <span><strong>Category:</strong> {request.resource.category}</span>
                      <span><strong>Serial:</strong> {request.resource.serialNumber}</span>
                    </div>
                    
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      <strong>Purpose:</strong> {request.purpose}
                    </div>
                    
                    {request.specialRequirements && (
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                        <strong>Special Requirements:</strong> {request.specialRequirements}
                      </div>
                    )}
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      <div>
                        <strong>Requested:</strong> {new Date(request.createdAt).toLocaleDateString()}
                      </div>
                      {request.borrowDate && (
                        <div>
                          <strong>Borrow Date:</strong> {new Date(request.borrowDate).toLocaleDateString()}
                        </div>
                      )}
                      {request.dueDate && (
                        <div>
                          <strong>Due Date:</strong> {new Date(request.dueDate).toLocaleDateString()}
                        </div>
                      )}
                      {request.actualReturnDate && (
                        <div>
                          <strong>Returned:</strong> {new Date(request.actualReturnDate).toLocaleDateString()}
                        </div>
                      )}
                      {request.approvedBy && (
                        <div>
                          <strong>Approved By:</strong> {request.approvedBy}
                        </div>
                      )}
                      {request.approvedAt && (
                        <div>
                          <strong>Approved At:</strong> {new Date(request.approvedAt).toLocaleString()}
                        </div>
                      )}
                    </div>
                    
                    {/* Days Remaining/Overdue */}
                    {getDaysRemaining(request.dueDate, request.status) && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <span style={{ 
                          color: getDaysRemaining(request.dueDate, request.status).color,
                          fontWeight: '600',
                          fontSize: '0.875rem'
                        }}>
                          {getDaysRemaining(request.dueDate, request.status).text}
                        </span>
                      </div>
                    )}
                    
                    {/* Overdue Warning */}
                    {request.status === 'overdue' && (
                      <div style={{ 
                        marginTop: '0.5rem',
                        padding: '0.5rem',
                        background: '#fee2e2',
                        color: '#991b1b',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        ⚠️ This item is {request.overdueDays} days overdue! Please return it immediately.
                      </div>
                    )}
                    
                    {/* Rejection Reason */}
                    {request.status === 'rejected' && request.rejectionReason && (
                      <div style={{ 
                        marginTop: '0.5rem',
                        padding: '0.5rem',
                        background: '#fee2e2',
                        color: '#991b1b',
                        borderRadius: '4px',
                        fontSize: '0.875rem'
                      }}>
                        <strong>Rejection Reason:</strong> {request.rejectionReason}
                      </div>
                    )}
                    
                    {/* Renewal Count */}
                    {request.renewalCount > 0 && (
                      <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                        <strong>Renewals:</strong> {request.renewalCount} / 2
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  {request.status === 'pending' && (
                    <>
                      <button className="clean-button clean-button-danger" style={{ fontSize: '0.875rem' }}>
                        ❌ Cancel Request
                      </button>
                    </>
                  )}
                  {request.status === 'approved' && (
                    <button className="clean-button clean-button-success" style={{ fontSize: '0.875rem' }}>
                      ✅ Confirm Borrow
                    </button>
                  )}
                  {request.status === 'borrowed' && (
                    <>
                      <button className="clean-button clean-button-warning" style={{ fontSize: '0.875rem' }}>
                        📤 Return Item
                      </button>
                      {request.renewalCount < 2 && (
                        <button className="clean-button" style={{ fontSize: '0.875rem', background: '#8b5cf6' }}>
                          🔄 Renew Request
                        </button>
                      )}
                    </>
                  )}
                  {request.status === 'overdue' && (
                    <button className="clean-button clean-button-danger" style={{ fontSize: '0.875rem' }}>
                      📤 Return Immediately
                    </button>
                  )}
                  <button className="clean-button" style={{ fontSize: '0.875rem', background: '#6b7280' }}>
                    📄 View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredRequests.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ color: '#6b7280', marginBottom: '1rem' }}>No requests found</h3>
            <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
              {filter === 'all' 
                ? "You haven't made any borrowing requests yet" 
                : `No ${filter} requests found`}
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

export default CompleteMyRequests;
