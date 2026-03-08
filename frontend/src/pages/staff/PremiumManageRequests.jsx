import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PremiumManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState('');
  const [approvalNote, setApprovalNote] = useState('');

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

    // Mock comprehensive requests data
    const mockRequests = [
      {
        _id: '1',
        resource: { 
          name: 'Introduction to Algorithms', 
          type: 'Book', 
          category: 'Computer Science',
          serialNumber: 'CS-BOOK-001',
          maxDuration: 14,
          icon: '📚'
        },
        user: { 
          name: 'John Student', 
          studentId: 'STU001', 
          email: 'john@university.edu',
          department: 'Computer Science',
          avatar: '👨‍🎓'
        },
        status: 'pending',
        createdAt: new Date('2024-01-22'),
        borrowDate: new Date('2024-01-23'),
        returnDate: new Date('2024-02-06'),
        purpose: 'Study for algorithms midterm exam',
        specialRequirements: 'Need access to chapter 5-8',
        approvedBy: null,
        approvedAt: null,
        rejectionReason: null,
        priority: 'high',
        renewalCount: 0
      },
      {
        _id: '2',
        resource: { 
          name: 'Dell Laptop XPS 15', 
          type: 'Laptop', 
          category: 'Technology',
          serialNumber: 'TECH-LAP-002',
          maxDuration: 7,
          icon: '💻'
        },
        user: { 
          name: 'Jane Smith', 
          studentId: 'STU002', 
          email: 'jane@university.edu',
          department: 'Engineering',
          avatar: '👩‍🎓'
        },
        status: 'pending',
        createdAt: new Date('2024-01-23'),
        borrowDate: new Date('2024-01-24'),
        returnDate: new Date('2024-01-31'),
        purpose: 'Final project development for CS301',
        specialRequirements: 'Need with Visual Studio installed',
        approvedBy: null,
        approvedAt: null,
        rejectionReason: null,
        priority: 'normal',
        renewalCount: 0
      },
      {
        _id: '3',
        resource: { 
          name: 'Canon EOS DSLR', 
          type: 'Camera', 
          category: 'Photography',
          serialNumber: 'PHOTO-CAM-003',
          maxDuration: 3,
          icon: '📷'
        },
        user: { 
          name: 'Mike Johnson', 
          studentId: 'STU003', 
          email: 'mike@university.edu',
          department: 'Media Arts',
          avatar: '👨‍🎓'
        },
        status: 'approved',
        createdAt: new Date('2024-01-21'),
        borrowDate: new Date('2024-01-22'),
        returnDate: new Date('2024-01-25'),
        purpose: 'Photography project documentation',
        specialRequirements: 'Need tripod and additional lenses',
        approvedBy: 'Dr. Smith',
        approvedAt: new Date('2024-01-21 14:30'),
        rejectionReason: null,
        priority: 'normal',
        renewalCount: 0
      },
      {
        _id: '4',
        resource: { 
          name: 'Data Structures Book', 
          type: 'Book', 
          category: 'Computer Science',
          serialNumber: 'CS-BOOK-004',
          maxDuration: 14,
          icon: '📚'
        },
        user: { 
          name: 'Alice Brown', 
          studentId: 'STU004', 
          email: 'alice@university.edu',
          department: 'Computer Science',
          avatar: '👩‍🎓'
        },
        status: 'borrowed',
        createdAt: new Date('2024-01-10'),
        borrowDate: new Date('2024-01-11'),
        returnDate: new Date('2024-01-25'),
        actualBorrowDate: new Date('2024-01-11'),
        actualReturnDate: null,
        purpose: 'Study for final exams',
        specialRequirements: null,
        approvedBy: 'Dr. Johnson',
        approvedAt: new Date('2024-01-10 16:45'),
        rejectionReason: null,
        priority: 'normal',
        renewalCount: 1,
        daysOverdue: 0
      },
      {
        _id: '5',
        resource: { 
          name: 'iPad Pro', 
          type: 'Tablet', 
          category: 'Technology',
          serialNumber: 'TECH-TAB-005',
          maxDuration: 7,
          icon: '📱'
        },
        user: { 
          name: 'Bob Wilson', 
          studentId: 'STU005', 
          email: 'bob@university.edu',
          department: 'Business',
          avatar: '👨‍🎓'
        },
        status: 'overdue',
        createdAt: new Date('2024-01-05'),
        borrowDate: new Date('2024-01-06'),
        returnDate: new Date('2024-01-13'),
        actualBorrowDate: new Date('2024-01-06'),
        actualReturnDate: null,
        purpose: 'Business presentation preparation',
        specialRequirements: null,
        approvedBy: 'Jane Staff',
        approvedAt: new Date('2024-01-05 09:30'),
        rejectionReason: null,
        priority: 'normal',
        renewalCount: 0,
        daysOverdue: 15
      },
      {
        _id: '6',
        resource: { 
          name: 'Physics Textbook', 
          type: 'Book', 
          category: 'Physics',
          serialNumber: 'PHY-BOOK-006',
          maxDuration: 14,
          icon: '⚛️'
        },
        user: { 
          name: 'Carol Davis', 
          studentId: 'STU006', 
          email: 'carol@university.edu',
          department: 'Physics',
          avatar: '👩‍🎓'
        },
        status: 'rejected',
        createdAt: new Date('2024-01-20'),
        borrowDate: null,
        returnDate: null,
        purpose: 'Personal reading',
        specialRequirements: null,
        approvedBy: 'Jane Staff',
        approvedAt: new Date('2024-01-20 11:15'),
        rejectionReason: 'Purpose not academic-related',
        priority: 'low',
        renewalCount: 0
      }
    ];

    setRequests(mockRequests);
    setLoading(false);
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.user.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || request.status === filter;
    return matchesSearch && matchesFilter;
  });

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
      pending: 'premium-badge-warning',
      approved: 'premium-badge-success',
      borrowed: 'premium-badge-info',
      returned: 'premium-badge',
      rejected: 'premium-badge-error',
      overdue: 'premium-badge-error'
    };
    return colors[status] || 'premium-badge';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return { color: '#dc2626', bg: '#fee2e2' };
      case 'normal': return { color: '#059669', bg: '#d1fae5' };
      case 'low': return { color: '#6b7280', bg: '#f3f4f6' };
      default: return { color: '#6b7280', bg: '#f3f4f6' };
    }
  };

  const getDaysRemaining = (returnDate, status) => {
    if (status !== 'borrowed' && status !== 'approved') return null;
    
    const today = new Date();
    const due = new Date(returnDate);
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
      approved: requests.filter(r => r.status === 'approved').length,
      borrowed: requests.filter(r => r.status === 'borrowed').length,
      overdue: requests.filter(r => r.status === 'overdue').length,
      rejected: requests.filter(r => r.status === 'rejected').length,
      returned: requests.filter(r => r.status === 'returned').length
    };
    return stats;
  };

  const handleApproveReject = (request, action) => {
    setSelectedRequest(request);
    setApprovalAction(action);
    setApprovalNote('');
    setShowApprovalModal(true);
  };

  const handleConfirmApproval = () => {
    if (!selectedRequest) return;

    const updatedRequests = requests.map(r => {
      if (r._id === selectedRequest._id) {
        if (approvalAction === 'approve') {
          return {
            ...r,
            status: 'approved',
            approvedBy: user?.name || 'Staff Member',
            approvedAt: new Date(),
            rejectionReason: null
          };
        } else if (approvalAction === 'reject') {
          return {
            ...r,
            status: 'rejected',
            approvedBy: user?.name || 'Staff Member',
            approvedAt: new Date(),
            rejectionReason: approvalNote
          };
        }
      }
      return r;
    });

    setRequests(updatedRequests);
    setShowApprovalModal(false);
    setSelectedRequest(null);
    setApprovalAction('');
    setApprovalNote('');
  };

  const handleReturnConfirmation = (requestId) => {
    const updatedRequests = requests.map(r => {
      if (r._id === requestId) {
        return {
          ...r,
          status: 'returned',
          actualReturnDate: new Date(),
          daysOverdue: 0
        };
      }
      return r;
    });

    setRequests(updatedRequests);
  };

  const handleRenewal = (requestId) => {
    const updatedRequests = requests.map(r => {
      if (r._id === requestId) {
        const newReturnDate = new Date(r.returnDate);
        newReturnDate.setDate(newReturnDate.getDate() + r.resource.maxDuration);
        
        return {
          ...r,
          returnDate: newReturnDate,
          renewalCount: r.renewalCount + 1
        };
      }
      return r;
    });

    setRequests(updatedRequests);
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
            Loading requests...
          </p>
        </div>
      </div>
    );
  }

  const stats = getStats();

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
          <h1 className="premium-card-title">📋 Manage Requests</h1>
          <p className="premium-card-subtitle">
            Approve, reject, and monitor all borrowing requests with advanced filtering and analytics.
          </p>
        </div>

        {/* Statistics Overview */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">📊 Request Statistics</h2>
          </div>
          <div className="premium-stats-grid">
            <div className="premium-stat-card">
              <div className="premium-stat-icon">📋</div>
              <div className="premium-stat-value">{stats.total}</div>
              <div className="premium-stat-label">Total Requests</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">⏳</div>
              <div className="premium-stat-value">{stats.pending}</div>
              <div className="premium-stat-label">Pending Approval</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">✅</div>
              <div className="premium-stat-value">{stats.approved}</div>
              <div className="premium-stat-label">Approved</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">📚</div>
              <div className="premium-stat-value">{stats.borrowed}</div>
              <div className="premium-stat-label">Currently Borrowed</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">⚠️</div>
              <div className="premium-stat-value">{stats.overdue}</div>
              <div className="premium-stat-label">Overdue</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">❌</div>
              <div className="premium-stat-value">{stats.rejected}</div>
              <div className="premium-stat-label">Rejected</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">🚀 Quick Actions</h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <Link to="/staff/resources" className="premium-button premium-button-primary">
              📦 Manage Resources
            </Link>
            <button className="premium-button premium-button-success">
              📧 Send Reminders
            </button>
            <button className="premium-button premium-button-warning">
              📊 Generate Report
            </button>
            <button className="premium-button premium-button-outline">
              📈 View Analytics
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="premium-section">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <input
              type="text"
              placeholder="🔍 Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="premium-form-input"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="premium-form-select"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending Approval</option>
              <option value="approved">Approved</option>
              <option value="borrowed">Currently Borrowed</option>
              <option value="overdue">Overdue</option>
              <option value="returned">Returned</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Requests List */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">📋 Requests ({filteredRequests.length} found)</h2>
          </div>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {filteredRequests.map((request) => (
              <div key={request._id} className="premium-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <div style={{ fontSize: '1.5rem' }}>{request.resource.icon}</div>
                      <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                          {request.resource.name}
                        </h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                          {request.resource.type} • {request.resource.category}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      <span>{request.user.avatar}</span>
                      <div>
                        <div style={{ fontWeight: '600' }}>{request.user.name}</div>
                        <div>{request.user.studentId} • {request.user.department}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status and Priority */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                    <span className={`premium-badge ${getStatusBadge(request.status)}`}>
                      {getStatusIcon(request.status)} {request.status}
                    </span>
                    <div style={{ 
                      fontSize: '0.75rem',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '4px',
                      background: getPriorityColor(request.priority).bg,
                      color: getPriorityColor(request.priority).color,
                      fontWeight: '600'
                    }}>
                      {request.priority.toUpperCase()}
                    </div>
                  </div>
                </div>
                
                {/* Request Details */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  <div><strong>Purpose:</strong> {request.purpose}</div>
                  <div><strong>Duration:</strong> {request.resource.maxDuration} days</div>
                  <div><strong>Requested:</strong> {new Date(request.createdAt).toLocaleDateString()}</div>
                  <div><strong>Borrow Date:</strong> {new Date(request.borrowDate).toLocaleDateString()}</div>
                  <div><strong>Return Date:</strong> {new Date(request.returnDate).toLocaleDateString()}</div>
                  {request.approvedBy && (
                    <div><strong>Approved By:</strong> {request.approvedBy}</div>
                  )}
                </div>
                
                {/* Days Remaining/Overdue */}
                {getDaysRemaining(request.returnDate, request.status) && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <span style={{ 
                      color: getDaysRemaining(request.returnDate, request.status).color,
                      fontWeight: '600',
                      fontSize: '0.875rem'
                    }}>
                      {getDaysRemaining(request.returnDate, request.status).text}
                    </span>
                  </div>
                )}
                
                {/* Special Requirements */}
                {request.specialRequirements && (
                  <div style={{ 
                    background: 'var(--bg-secondary)', 
                    padding: '0.5rem', 
                    borderRadius: 'var(--radius-md)', 
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--primary-color, 0.1)'
                  }}>
                    <strong>Special Requirements:</strong> {request.specialRequirements}
                  </div>
                )}
                
                {/* Rejection Reason */}
                {request.status === 'rejected' && request.rejectionReason && (
                  <div style={{ 
                    background: '#fee2e2', 
                    padding: '0.5rem', 
                    borderRadius: 'var(--radius-md)', 
                    fontSize: '0.875rem',
                    color: '#991b1b',
                    border: '1px solid #fecaca'
                  }}>
                    <strong>Rejection Reason:</strong> {request.rejectionReason}
                  </div>
                )}
                
                {/* Renewal Count */}
                {request.renewalCount > 0 && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <strong>Renewals:</strong> {request.renewalCount}
                  </div>
                )}
                
                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  {request.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApproveReject(request, 'approve')}
                        className="premium-button premium-button-success"
                        style={{ fontSize: '0.875rem' }}
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => handleApproveReject(request, 'reject')}
                        className="premium-button premium-button-error"
                        style={{ fontSize: '0.875rem' }}
                      >
                        ❌ Reject
                      </button>
                    </>
                  )}
                  
                  {request.status === 'approved' && (
                    <button className="premium-button premium-button-warning" style={{ fontSize: '0.875rem' }}>
                      📤 Confirm Borrow
                    </button>
                  )}
                  
                  {request.status === 'borrowed' && (
                    <>
                      <button
                        onClick={() => handleReturnConfirmation(request._id)}
                        className="premium-button premium-button-success"
                        style={{ fontSize: '0.875rem' }}
                      >
                        ↩️ Confirm Return
                      </button>
                      {request.renewalCount < 2 && (
                        <button
                          onClick={() => handleRenewal(request._id)}
                          className="premium-button"
                          style={{ fontSize: '0.875rem', background: 'var(--gradient-accent)' }}
                        >
                          🔄 Renew
                        </button>
                      )}
                    </>
                  )}
                  
                  {request.status === 'overdue' && (
                    <>
                      <button
                        onClick={() => handleReturnConfirmation(request._id)}
                        className="premium-button premium-button-error"
                        style={{ fontSize: '0.875rem' }}
                      >
                        ⚠️ Mark Returned
                      </button>
                      <button className="premium-button premium-button-warning" style={{ fontSize: '0.875rem' }}>
                        📧 Send Reminder
                      </button>
                    </>
                  )}
                  
                  <button className="premium-button premium-button-ghost" style={{ fontSize: '0.875rem' }}>
                    📄 Full Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Approval/Rejection Modal */}
      {showApprovalModal && selectedRequest && (
        <div className="premium-modal-overlay">
          <div className="premium-modal">
            <h3 style={{ marginBottom: '1.5rem' }}>
              {approvalAction === 'approve' ? '✅ Approve Request' : '❌ Reject Request'}
            </h3>
            
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                Request Details
              </h4>
              <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <div><strong>Resource:</strong> {selectedRequest.resource.icon} {selectedRequest.resource.name}</div>
                <div><strong>Student:</strong> {selectedRequest.user.avatar} {selectedRequest.user.name} ({selectedRequest.user.studentId})</div>
                <div><strong>Purpose:</strong> {selectedRequest.purpose}</div>
                <div><strong>Duration:</strong> {selectedRequest.resource.maxDuration} days</div>
                <div><strong>Priority:</strong> 
                  <span style={{ 
                    background: getPriorityColor(selectedRequest.priority).bg, 
                    color: getPriorityColor(selectedRequest.priority).color,
                    padding: '0.125rem 0.5rem', 
                    borderRadius: '4px', 
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {selectedRequest.priority.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            {approvalAction === 'reject' && (
              <div className="premium-form-group">
                <label className="premium-form-label">Rejection Reason *</label>
                <textarea
                  value={approvalNote}
                  onChange={(e) => setApprovalNote(e.target.value)}
                  placeholder="Please provide a reason for rejection..."
                  rows={4}
                  className="premium-form-textarea"
                />
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button
                onClick={() => {
                  setShowApprovalModal(false);
                  setSelectedRequest(null);
                  setApprovalAction('');
                  setApprovalNote('');
                }}
                className="premium-button"
                style={{ background: 'var(--text-tertiary)' }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApproval}
                className={`premium-button ${approvalAction === 'approve' ? 'premium-button-success' : 'premium-button-error'}`}
                disabled={approvalAction === 'reject' && !approvalNote.trim()}
              >
                {approvalAction === 'approve' ? '✅ Approve Request' : '❌ Reject Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumManageRequests;
