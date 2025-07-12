import React from 'react';

export default function BottomSheet() {
  const containerStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100vh',
    overflow: 'hidden',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  };

  const sheetStyle = {
    width: '100%',
    maxWidth: '600px',
    height: '90vh',
    background: '#fff',
    borderRadius: '16px 16px 0 0',
    boxShadow: '0 -4px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
    transform: 'translateY(0)',
  };

  const handleStyle = {
    width: '40px',
    height: '5px',
    background: '#ccc',
    margin: '8px auto',
    borderRadius: '2.5px',
  };

  const contentStyle = {
    padding: '16px',
    textAlign: 'center',
    flex: 1,
    overflowY: 'auto',
  };

  return (
    <div style={containerStyle}>
      <div style={sheetStyle}>
        <div style={handleStyle}></div>
        <div style={contentStyle}>
          <h2>Bottom Sheet</h2>
          <p>This is the styled bottom sheet component.</p>
        </div>
      </div>
    </div>
  );
}
