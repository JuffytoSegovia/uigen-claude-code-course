'use client';

import { useState } from 'react';

export default function CounterTestPage() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Counter Component Test</h1>

      <div style={{
        padding: '40px',
        border: '2px solid #e2e8f0',
        borderRadius: '8px',
        backgroundColor: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#1e293b'
        }} data-testid="counter-value">
          {count}
        </div>

        <button
          onClick={() => setCount(count + 1)}
          data-testid="increment-button"
          style={{
            padding: '12px 24px',
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'white',
            backgroundColor: '#3b82f6',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
        >
          Increment
        </button>
      </div>
    </div>
  );
}
