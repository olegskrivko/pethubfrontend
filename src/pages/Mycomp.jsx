import React, { useState } from 'react';

export default function RateLimitTester() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const callApi = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/test-rate-limit/');
      if (res.status === 429) {
        const data = await res.json();
        setMessage(data.error || 'Rate limit exceeded. Please wait and try again.');
        setError(true);
      } else if (res.ok) {
        const data = await res.json();
        setMessage(data.message || 'Success!');
        setError(false);
      } else {
        setMessage('Something went wrong.');
        setError(true);
      }
    } catch (e) {
      setMessage('Network error.');
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '20px auto',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2>Test Rate Limit API</h2>
      <button
        onClick={callApi}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Loading...' : 'Call API'}
      </button>
      {message && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            borderRadius: 6,
            color: error ? '#a94442' : '#3c763d',
            backgroundColor: error ? '#f2dede' : '#dff0d8',
            border: `1px solid ${error ? '#ebccd1' : '#d6e9c6'}`,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
