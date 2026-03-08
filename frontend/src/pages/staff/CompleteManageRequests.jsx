import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CompleteManageRequests = () => {
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
          maxDuration: 14
        },
        user: { 
          name: 'John Student', 
          studentId: 'STU001', 
          email: 'john@university.edu',
          department: 'Computer Science'
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
        priority: 'normal',
        renewalCount: 0
      },
      {
        _id: '2',
        resource: { 
          name: 'Dell Laptop XPS 15', 
          type: 'Laptop', 
          category: 'Technology',
          serialNumber: 'TECH-LAP-002',
          maxDuration: 7
        },
        user: { 
          name: 'Jane Smith', 
          studentId: 'STU002', 
          email: 'jane@university.edu',
          department: 'Engineering'
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
        priority: 'high',
        renewalCount: 0
      },
      {
        _id: '3',
        resource: { 
          name: 'Canon EOS DSLR', 
          type: 'Camera', 
          category: 'Photography',
          serialNumber: 'PHOTO-CAM-003',
          maxDuration: 3
        },
        user: { 
          name: 'Mike Johnson', 
          studentId: 'STU003', 
          email: 'mike@university.edu',
          department: 'Media Arts'
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
          maxDuration: 14
        },
        user: { 
          name: 'Alice Brown', 
          studentId: 'STU004', 
          email: 'alice@university.edu',
          department: 'Computer Science'
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
          maxDuration: 7
        },
        user: { 
          name: 'Bob Wilson', 
          studentId: 'STU005', 
          email: 'bob@university.edu',
          department: 'Business'
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
          maxDuration: 14
        },
        user: { 
          name: 'Carol Davis', 
          studentId: 'STU006', 
          email: 'carol@university.edu',
          department: 'Physics'
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return { bg: '#fee2e2', color: '#991b1b' };
      case 'normal': return { bg: '#fef3c7', color: '#92400e' };
      case 'low': return { bg: '#f3f4f6', color: '#374151' };
      default: return { bg: '#f3f4f6', color: '#374151' };
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

  const stats = getStats();

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
        <h1 className="clean-title">📋 Manage Requests</h1>
        <p className="clean-subtitle">Approve, reject, and monitor all borrowing requests</p>

        {/* Statistics Overview */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="clean-section-title">📊 Request Statistics</h2>
          <div className="clean-stats">
            <div className="clean-stat-card">
              <div className="clean-stat-icon">📋</div>
              <div className="clean-stat-value">{stats.total}</div>
              <div className="clean-stat-label">Total Requests</div>
            </div>
            <div className="clean-stat-card">
              <div className="clean-stat-icon">⏳</div>
              <div className="clean-stat-value">{stats.pending}</div>
              <div className="clean-stat-label">Pending Approval</div>
            </div>
            <div className="clean-stat-card">
              <div className="clean-stat-icon">✅</div>
              <div className="clean-stat-value">{stats.approved}</div>
              <div className="clean-stat-label">Approved</div>
            </div>
            <div className="clean-stat-card">
              <div className="clean-stat-icon">📚</div>
              <div className="clean-stat-value">{stats.borrowed}</div>
              <div className="clean-stat-label">Currently Borrowed</div>
            </div>
            <div className="clean-stat-card">
              <div className="clean-stat-icon">⚠️</div>
              <div className="clean-stat-value">{stats.overdue}</div>
              <div className="clean-stat-label">Overdue</div>
            </div>
            <div className="clean-stat-card">
              <div className="clean-stat-icon">❌</div>
              <div className="clean-stat-value">{stats.rejected}</div>
              <div className="clean-stat-label">Rejected</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <Link to="/staff/resources" className="clean-button">
              📦 Manage Resources
            </Link>
            <button className="clean-button clean-button-success">
              📧 Send Reminders
            </button>
            <button className="clean-button clean-button-warning">
              📊 Generate Report
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Search requests..."
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
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>
            📋 Requests ({filteredRequests.length} found)
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
                      {request.priority !== 'normal' && (
                        <span style={{ 
                          background: getPriorityColor(request.priority).bg, 
                          color: getPriorityColor(request.priority).color,
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '4px', 
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {request.priority.toUpperCase()}
                        </span>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      <span><strong>Student:</strong> {request.user.name}</span>
                      <span><strong>ID:</strong> {request.user.studentId}</span>
                      <span><strong>Dept:</strong> {request.user.department}</span>
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
                      <div>
                        <strong>Borrow Date:</strong> {new Date(request.borrowDate).toLocaleDateString()}
                      </div>
                      <div>
                        <strong>Return Date:</strong> {new Date(request.returnDate).toLocaleDateString()}
                      </div>
                      <div>
                        <strong>Duration:</strong> {request.resource.maxDuration} days
                      </div>
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
                        ⚠️ This item is {request.daysOverdue} days overdue!
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
                        <strong>Renewals:</strong> {request.renewalCount}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  {request.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApproveReject(request, 'approve')}
                        className="clean-button clean-button-success"
                        style={{ fontSize: '0.875rem' }}
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => handleApproveReject(request, 'reject')}
                        className="clean-button clean-button-danger"
                        style={{ fontSize: '0.875rem' }}
                      >
                        ❌ Reject
                      </button>
                    </>
                  )}
                  {request.status === 'approved' && (
                    <button className="clean-button clean-button-warning" style={{ fontSize: '0.875rem' }}>
                      📤 Confirm Borrow
                    </button>
                  )}
                  {request.status === 'borrowed' && (
                    <>
                      <button
                        onClick={() => handleReturnConfirmation(request._id)}
                        className="clean-button clean-button-success"
                        style={{ fontSize: '0.875rem' }}
                      >
                        ↩️ Confirm Return
                      </button>
                      {request.renewalCount < 2 && (
                        <button
                          onClick={() => handleRenewal(request._id)}
                          className="clean-button"
                          style={{ fontSize: '0.875rem', background: '#8b5cf6' }}
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
                        className="clean-button clean-button-danger"
                        style={{ fontSize: '0.875rem' }}
                      >
                        ⚠️ Mark Returned
                      </button>
                      <button className="clean-button" style={{ fontSize: '0.875rem', background: '#f59e0b' }}>
                        📧 Send Reminder
                      </button>
                    </>
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
                ? "There are no borrowing requests at this time" 
                : `No ${filter} requests found`}
            </p>
          </div>
        )}
      </div>

      {/* Approval/Rejection Modal */}
      {showApprovalModal && selectedRequest && (
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
            <h3 style={{ marginBottom: '1.5rem' }}>
              {approvalAction === 'approve' ? '✅ Approve Request' : '❌ Reject Request'}
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                  Request Details
                </h4>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  <div><strong>Resource:</strong> {selectedRequest.resource.name}</div>
                  <div><strong>Student:</strong> {selectedRequest.user.name} ({selectedRequest.user.studentId})</div>
                  <div><strong>Purpose:</strong> {selectedRequest.purpose}</div>
                  <div><strong>Duration:</strong> {selectedRequest.resource.maxDuration} days</div>
                </div>
              </div>
              
              {approvalAction === 'reject' && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                    Rejection Reason *
                  </label>
                  <textarea
                    value={approvalNote}
                    onChange={(e) => setApprovalNote(e.target.value)}
                    placeholder="Please provide a reason for rejection..."
                    rows={4}
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
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowApprovalModal(false);
                  setSelectedRequest(null);
                  setApprovalAction('');
                  setApprovalNote('');
                }}
                className="clean-button"
                style={{ background: '#6b7280' }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApproval}
                className={`clean-button ${approvalAction === 'approve' ? 'clean-button-success' : 'clean-button-danger'}`}
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

export default CompleteManageRequests;
