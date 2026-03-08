import React, { useState, useEffect } from 'react';

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState('overview');
  const [dateRange, setDateRange] = useState('month');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const generateReport = () => {
    alert(`Generating ${reportType} report for ${dateRange}...`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid #e5e7eb', borderTop: '4px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <p style={{ color: '#6b7280' }}>Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '2rem' }}>
        📊 Reports & Analytics
      </h1>

      {/* Report Controls */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            >
              <option value="overview">System Overview</option>
              <option value="usage">Resource Usage</option>
              <option value="users">User Activity</option>
              <option value="borrowing">Borrowing Trends</option>
              <option value="overdue">Overdue Items</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateReport}
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
          📊 Generate Report
        </button>
      </div>

      {/* Report Content */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
          {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
        </h2>

        {reportType === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ textAlign: 'center', padding: '1.5rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' }}>156</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Users</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1.5rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>45</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Resources</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1.5rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>23</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Active Requests</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1.5rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>18</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Borrowed Items</div>
              </div>
            </div>
          </div>
        )}

        {reportType === 'usage' && (
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
              Most Popular Resources
            </h3>
            <div style={{ marginBottom: '2rem' }}>
              {['Introduction to Algorithms', 'Dell Laptop XPS 15', 'Canon EOS DSLR', 'Data Structures Book', 'iPad Pro 12.9'].map((resource, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span>{resource}</span>
                  <span style={{ fontWeight: '600', color: '#3b82f6' }}>{Math.floor(Math.random() * 50) + 10} times</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {reportType === 'users' && (
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
              User Activity Summary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#dbeafe', borderRadius: '0.375rem' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e40af' }}>142</div>
                <div style={{ fontSize: '0.75rem', color: '#1e40af' }}>Students</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#d1fae5', borderRadius: '0.375rem' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#065f46' }}>12</div>
                <div style={{ fontSize: '0.75rem', color: '#065f46' }}>Staff</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#ede9fe', borderRadius: '0.375rem' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#5b21b6' }}>2</div>
                <div style={{ fontSize: '0.75rem', color: '#5b21b6' }}>Admins</div>
              </div>
            </div>
          </div>
        )}

        {reportType === 'borrowing' && (
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
              Borrowing Trends
            </h3>
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Average borrowing duration by resource type:</p>
              {[
                { type: 'Books', duration: '7.2 days' },
                { type: 'Laptops', duration: '14.5 days' },
                { type: 'Cameras', duration: '3.1 days' },
                { type: 'Tablets', duration: '10.8 days' },
              ].map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span>{item.type}</span>
                  <span style={{ fontWeight: '600', color: '#3b82f6' }}>{item.duration}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {reportType === 'overdue' && (
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
              Overdue Items Analysis
            </h3>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>
                <p style={{ fontWeight: '600', color: '#92400e', margin: '0 0 0.5rem 0' }}>⚠️ Current Overdue Items: 8</p>
                <p style={{ fontSize: '0.875rem', color: '#92400e', margin: 0 }}>
                  Total value of overdue items: $2,450
                </p>
              </div>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Most common overdue resources:</p>
              {['Data Structures Book', 'iPad Pro 12.9', 'Canon EOS DSLR'].map((resource, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span>{resource}</span>
                  <span style={{ fontWeight: '600', color: '#ef4444' }}>{Math.floor(Math.random() * 5) + 1} overdue</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Options */}
        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
            Export Options
          </h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
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
              📄 Export as PDF
            </button>
            <button style={{
              padding: '0.5rem 1rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              📊 Export as Excel
            </button>
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
              📋 Export as CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
