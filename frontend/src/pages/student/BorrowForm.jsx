import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BorrowForm = () => {
  const { resourceId } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    purpose: '',
    duration: '7',
    urgent: false,
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Mock resource data
    const mockResources = {
      '1': { name: 'Introduction to Algorithms', type: 'Book', category: 'Computer Science' },
      '2': { name: 'Dell Laptop XPS 15', type: 'Laptop', category: 'Technology' },
      '3': { name: 'Canon EOS DSLR', type: 'Camera', category: 'Photography' },
      '4': { name: 'Data Structures Book', type: 'Book', category: 'Computer Science' },
      '5': { name: 'iPad Pro 12.9', type: 'Tablet', category: 'Technology' },
    };

    setTimeout(() => {
      const foundResource = mockResources[resourceId] || {
        name: 'Unknown Resource',
        type: 'Unknown',
        category: 'Unknown'
      };
      setResource(foundResource);
      setLoading(false);
    }, 500);
  }, [resourceId]);

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid #e5e7eb', borderTop: '4px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <p style={{ color: '#6b7280' }}>Loading resource details...</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', color: '#10b981', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
            Request Submitted!
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Your request for {resource.name} has been submitted successfully. You will be notified when it's approved.
          </p>
          <Link
            to="/student/requests"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              background: '#3b82f6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginRight: '0.5rem'
            }}
          >
            View My Requests
          </Link>
          <Link
            to="/student/browse"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              background: '#6b7280',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}
          >
            Browse More
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '2rem' }}>
        📝 Borrow Request
      </h1>

      {/* Resource Info */}
      {resource && (
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>{getTypeIcon(resource.type)}</span>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                {resource.name}
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
                {resource.type} • {resource.category}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Request Form */}
      <form onSubmit={handleSubmit} style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
            Purpose of Borrowing *
          </label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            placeholder="Explain why you need this resource..."
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              minHeight: '100px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
            Duration (days) *
          </label>
          <select
            name="duration"
            value={formData.duration}
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
            <option value="3">3 days</option>
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="30">30 days</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="urgent"
              checked={formData.urgent}
              onChange={handleInputChange}
              style={{ width: '1rem', height: '1rem' }}
            />
            <span style={{ fontWeight: '600', color: '#374151' }}>
              Mark as urgent request
            </span>
          </label>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem', marginLeft: '1.5rem' }}>
            Urgent requests will be prioritized but require justification
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Any additional information or special requirements..."
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              minHeight: '80px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <Link
            to="/student/browse"
            style={{
              padding: '0.75rem 1.5rem',
              background: '#6b7280',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting || !formData.purpose}
            style={{
              padding: '0.75rem 1.5rem',
              background: (submitting || !formData.purpose) ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: (submitting || !formData.purpose) ? 'not-allowed' : 'pointer'
            }}
          >
            {submitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BorrowForm;
