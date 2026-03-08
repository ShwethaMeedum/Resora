import React from 'react';

const BasicTest = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A2A66',
      color: 'white',
      padding: '2rem',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#0A2A66',
          marginBottom: '1rem'
        }}>
          🎓 Premium CSS Test
        </h1>
        
        <p style={{
          fontSize: '1rem',
          color: '#64748b',
          marginBottom: '1rem'
        }}>
          If you can see this styled properly, the CSS is working!
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #0A2A66 0%, #1E3A8A 100%)',
            color: 'white',
            padding: '1rem',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '1rem',
            fontWeight: '600',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease'
          }}>
            Primary Button
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            color: 'white',
            padding: '1rem',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '1rem',
            fontWeight: '600',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease'
          }}>
            Success Button
          </div>
        </div>
        
        <div style={{
          background: '#f8fafc',
          padding: '1rem',
          borderRadius: '12px',
          border: '2px solid #0A2A66'
        }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1e293b' }}>
            Test Input
          </label>
          <input
            type="text"
            placeholder="Type something..."
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '1rem',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.3s ease'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicTest;
