import React from 'react';

const TestSimple = () => {
  return (
    <div className="minimal-container">
      <div className="minimal-card">
        <h1 className="minimal-title">🎉 SIMPLE TEST PAGE</h1>
        <p className="minimal-text">If you can see this, React is working!</p>
        <p className="minimal-text">This is the simplest possible component to test if React renders.</p>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{
            background: '#007bff',
            color: 'white',
            padding: '1rem',
            borderRadius: '4px'
          }}>
            Blue Box
          </div>
          <div style={{
            background: '#28a745',
            color: 'white',
            padding: '1rem',
            borderRadius: '4px'
          }}>
            Green Box
          </div>
          <div style={{
            background: '#dc3545',
            color: 'white',
            padding: '1rem',
            borderRadius: '4px'
          }}>
            Red Box
          </div>
        </div>
        
        <button 
          onClick={() => alert('Button clicked!')}
          className="minimal-button"
        >
          Click Me!
        </button>
      </div>
    </div>
  );
};

export default TestSimple;
