import React from 'react';

const spinnerStyle: React.CSSProperties = {
  width: '64px',
  height: '64px',
  border: '8px solid #f3f3f3',
  borderTop: '8px solid #ffb300',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '0 auto',
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '40vh',
  width: '100%',
};

const textStyle: React.CSSProperties = {
  marginTop: '18px',
  fontSize: '1.2rem',
  color: '#ffb300',
  fontWeight: 500,
  letterSpacing: '0.5px',
};

export default function LoadingIndicator({ text = 'Loading...' }: { text?: string }) {
  return (
    <div style={containerStyle}>
      <div style={spinnerStyle} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      {text && <div style={textStyle}>{text}</div>}
    </div>
  );
} 