import React from 'react';
import BottomSheet from './components/BottomSheet';

function App() {
  const appStyle = {
    backgroundColor: '#111827',
    minHeight: '100vh',
    margin: 0,
    padding: '24px',
    color: '#f9fafb',
    fontFamily: 'system-ui, sans-serif',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '16px',
    fontSize: '1.8rem',
    fontWeight: '600',
  };

  return (
    <div style={appStyle}>
      <h1 style={headingStyle}>React Custom Bottom Sheet</h1>
      <BottomSheet />
    </div>
  );
}

export default App;
