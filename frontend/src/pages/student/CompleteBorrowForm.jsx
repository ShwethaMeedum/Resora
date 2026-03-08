import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const CompleteBorrowForm = () => {
  const { resourceId } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [borrowingHistory, setBorrowingHistory] = useState([]);
  const [borrowingLimit] = useState(5);
  
  // Form state
  const [formData, setFormData] = useState({
    borrowDate: '',
    returnDate: '',
    purpose: '',
    specialRequirements: ''
  });
  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

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

    // Mock resource data
    const mockResources = {
      '1': { 
        _id: '1', 
        name: 'Introduction to Algorithms', 
        type: 'Book', 
        category: 'Computer Science', 
        available: true, 
        condition: 'Excellent',
        maxDuration: 14,
        location: 'Library - Section A',
        serialNumber: 'CS-BOOK-001'
      },
      '2': { 
        _id: '2', 
        name: 'Dell Laptop XPS 15', 
        type: 'Laptop', 
        category: 'Technology', 
        available: true, 
        condition: 'Good',
        maxDuration: 7,
        location: 'Tech Lab - Room 201',
        serialNumber: 'TECH-LAP-002'
      },
      '3': { 
        _id: '3', 
        name: 'Canon EOS DSLR', 
        type: 'Camera', 
        category: 'Photography', 
        available: false, 
        condition: 'Good',
        maxDuration: 3,
        location: 'Media Lab - Room 105',
        serialNumber: 'PHOTO-CAM-003'
      }
    };

    // Mock borrowing history
    const mockHistory = [
      { resourceId: '4', name: 'Data Structures Book', returnDate: '2024-02-15', status: 'active' },
      { resourceId: '5', name: 'iPad Pro', returnDate: '2024-02-10', status: 'active' }
    ];

    if (mockResources[resourceId]) {
      setResource(mockResources[resourceId]);
      setBorrowingHistory(mockHistory);
      
      // Set default dates
      const today = new Date();
      const maxReturnDate = new Date(today);
      maxReturnDate.setDate(today.getDate() + mockResources[resourceId].maxDuration);
      
      setFormData({
        borrowDate: today.toISOString().split('T')[0],
        returnDate: maxReturnDate.toISOString().split('T')[0],
        purpose: '',
        specialRequirements: ''
      });
    }
    
    setLoading(false);
  }, [resourceId]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.borrowDate) {
      newErrors.borrowDate = 'Borrow date is required';
    }
    
    if (!formData.returnDate) {
      newErrors.returnDate = 'Return date is required';
    }
    
    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }
    
    if (formData.purpose.trim().length < 10) {
      newErrors.purpose = 'Purpose must be at least 10 characters';
    }
    
    // Validate dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const borrowDate = new Date(formData.borrowDate);
    const returnDate = new Date(formData.returnDate);
    
    if (borrowDate < today) {
      newErrors.borrowDate = 'Borrow date cannot be in the past';
    }
    
    if (returnDate <= borrowDate) {
      newErrors.returnDate = 'Return date must be after borrow date';
    }
    
    if (resource) {
      const maxReturnDate = new Date(borrowDate);
      maxReturnDate.setDate(borrowDate.getDate() + resource.maxDuration);
      
      if (returnDate > maxReturnDate) {
        newErrors.returnDate = `Maximum borrowing duration is ${resource.maxDuration} days`;
      }
    }
    
    // Check borrowing limit
    const currentBorrowed = borrowingHistory.filter(item => item.status === 'active').length;
    if (currentBorrowed >= borrowingLimit) {
      newErrors.limit = `You have reached your borrowing limit of ${borrowingLimit} items`;
    }
    
    // Check for double-booking
    const alreadyBorrowed = borrowingHistory.some(item => 
      item.resourceId === resourceId && item.status === 'active'
    );
    if (alreadyBorrowed) {
      newErrors.doubleBooking = 'You have already borrowed this item';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/student/requests');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting request:', error);
      setErrors({ submit: 'Failed to submit request. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (loading) {
    return (
      <div className="clean-container">
        <div className="clean-card">
          <h2>Loading resource information...</h2>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="clean-container">
        <div className="clean-card">
          <h2>Resource not found</h2>
          <p>The requested resource could not be found.</p>
          <Link to="/student/browse" className="clean-button">Back to Browse</Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="clean-container">
        <div className="clean-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', color: '#10b981', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ color: '#10b981', marginBottom: '1rem' }}>Request Submitted Successfully!</h2>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Your borrowing request for <strong>{resource.name}</strong> has been submitted.
          </p>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            You will be redirected to your requests page...
          </p>
          <div className="clean-spinner" style={{ margin: '0 auto' }}></div>
        </div>
      </div>
    );
  }

  const currentBorrowed = borrowingHistory.filter(item => item.status === 'active').length;
  const canBorrow = resource.available && currentBorrowed < borrowingLimit;

  return (
    <div className="clean-container">
      <div className="clean-card">
        <h1 className="clean-title">📤 Request Borrowing</h1>
        <p className="clean-subtitle">Submit a borrowing request for {resource.name}</p>

        {/* Resource Information */}
        <div className="clean-info-box" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>📦 Resource Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="clean-info-item">
              <strong>Name:</strong> {resource.name}
            </div>
            <div className="clean-info-item">
              <strong>Type:</strong> {resource.type}
            </div>
            <div className="clean-info-item">
              <strong>Category:</strong> {resource.category}
            </div>
            <div className="clean-info-item">
              <strong>Condition:</strong> {resource.condition}
            </div>
            <div className="clean-info-item">
              <strong>Location:</strong> {resource.location}
            </div>
            <div className="clean-info-item">
              <strong>Serial:</strong> {resource.serialNumber}
            </div>
            <div className="clean-info-item">
              <strong>Max Duration:</strong> {resource.maxDuration} days
            </div>
            <div className="clean-info-item">
              <strong>Status:</strong> 
              <span style={{ 
                color: resource.available ? '#10b981' : '#ef4444', 
                fontWeight: '600',
                marginLeft: '0.5rem'
              }}>
                {resource.available ? '✅ Available' : '❌ Unavailable'}
              </span>
            </div>
          </div>
        </div>

        {/* Borrowing Status */}
        <div className="clean-info-box" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>📊 Your Borrowing Status</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="clean-info-item">
                <strong>Current Borrowed:</strong> {currentBorrowed} / {borrowingLimit}
              </div>
              <div className="clean-info-item">
                <strong>Available Slots:</strong> {borrowingLimit - currentBorrowed}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ 
                padding: '0.5rem 1rem', 
                borderRadius: '8px',
                background: canBorrow ? '#d1fae5' : '#fee2e2',
                color: canBorrow ? '#065f46' : '#991b1b',
                fontWeight: '600'
              }}>
                {canBorrow ? '✅ Can Borrow' : '❌ Cannot Borrow'}
              </div>
            </div>
          </div>
        </div>

        {/* Error Messages */}
        {errors.limit && (
          <div style={{ 
            background: '#fee2e2', 
            color: '#991b1b', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1rem',
            border: '1px solid #fecaca'
          }}>
            ⚠️ {errors.limit}
          </div>
        )}
        
        {errors.doubleBooking && (
          <div style={{ 
            background: '#fee2e2', 
            color: '#991b1b', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1rem',
            border: '1px solid #fecaca'
          }}>
            ⚠️ {errors.doubleBooking}
          </div>
        )}

        {errors.submit && (
          <div style={{ 
            background: '#fee2e2', 
            color: '#991b1b', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1rem',
            border: '1px solid #fecaca'
          }}>
            ⚠️ {errors.submit}
          </div>
        )}

        {/* Borrowing Form */}
        {canBorrow ? (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {/* Date Selection */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                    Borrow Date *
                  </label>
                  <input
                    type="date"
                    name="borrowDate"
                    value={formData.borrowDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: errors.borrowDate ? '1px solid #ef4444' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                  {errors.borrowDate && (
                    <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {errors.borrowDate}
                    </div>
                  )}
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                    Return Date *
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    min={formData.borrowDate}
                    max={
                      new Date(new Date(formData.borrowDate).getTime() + resource.maxDuration * 24 * 60 * 60 * 1000)
                        .toISOString().split('T')[0]
                    }
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: errors.returnDate ? '1px solid #ef4444' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                  {errors.returnDate && (
                    <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {errors.returnDate}
                    </div>
                  )}
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    Maximum duration: {resource.maxDuration} days
                  </div>
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Purpose of Borrowing *
                </label>
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="Please describe why you need to borrow this resource..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: errors.purpose ? '1px solid #ef4444' : '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
                {errors.purpose && (
                  <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.purpose}
                  </div>
                )}
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  Minimum 10 characters. Be specific about your academic needs.
                </div>
              </div>

              {/* Special Requirements */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Special Requirements (Optional)
                </label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  placeholder="Any special requirements or notes..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  E.g., "Need for weekend project", "Prefer specific model", etc.
                </div>
              </div>

              {/* Business Rules Summary */}
              <div className="clean-info-box">
                <h4 style={{ marginBottom: '0.5rem' }}>📋 Business Rules</h4>
                <ul style={{ fontSize: '0.875rem', color: '#6b7280', paddingLeft: '1.5rem' }}>
                  <li>Borrow date must be today or in the future</li>
                  <li>Return date must be within {resource.maxDuration} days of borrow date</li>
                  <li>You cannot exceed your borrowing limit of {borrowingLimit} items</li>
                  <li>You cannot borrow the same item twice</li>
                  <li>All requests are subject to staff approval</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <Link to="/student/browse" className="clean-button" style={{ background: '#6b7280' }}>
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="clean-button clean-button-success"
                  style={{ 
                    opacity: submitting ? 0.7 : 1,
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? '⏳ Submitting...' : '📤 Submit Request'}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '1rem' }}>❌</div>
            <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>Cannot Borrow This Item</h3>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              {!resource.available ? 'This item is currently not available.' : 'You have reached your borrowing limit.'}
            </p>
            <Link to="/student/browse" className="clean-button">
              Back to Browse Resources
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteBorrowForm;
