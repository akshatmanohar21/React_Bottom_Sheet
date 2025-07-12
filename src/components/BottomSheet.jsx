import React, { useState, useRef } from 'react';

export default function BottomSheet() {
  const snapHeights = [10, 50, 90];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(null);

  const startY = useRef(0);
  const vh = window.innerHeight;

  const handleDragStart = (e) => {
    setIsDragging(true);
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - startY.current;
    const newHeight = snapHeights[currentIndex] - (deltaY / vh) * 100;
    const clampedHeight = Math.max(0, Math.min(100, newHeight));
    setDragPosition(clampedHeight);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragPosition === null) return;
    const closestSnap = snapHeights.reduce((prev, curr) =>
      Math.abs(curr - dragPosition) < Math.abs(prev - dragPosition) ? curr : prev
    );
    setCurrentIndex(snapHeights.indexOf(closestSnap));
    setDragPosition(null);
  };

  const translateY = dragPosition !== null ? 100 - dragPosition : 100 - snapHeights[currentIndex];

  const wrapperStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100vh',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  };

  const sheetStyle = {
    width: '100%',
    maxWidth: '600px',
    height: '100vh',
    background: '#fff',
    borderRadius: '16px 16px 0 0',
    boxShadow: '0 -4px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    transform: `translateY(${translateY}vh)`,
    touchAction: 'none',
  };

  const handleStyle = {
    width: '40px',
    height: '5px',
    background: '#ccc',
    margin: '8px auto',
    borderRadius: '2.5px',
    cursor: 'grab',
  };

  const contentStyle = {
    padding: '16px',
    textAlign: 'center',
    flex: 1,
    overflowY: 'auto',
  };

  const buttonStyle = {
    margin: '8px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    background: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  };

  return (
    <div style={wrapperStyle}>
      <div
        style={sheetStyle}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div style={handleStyle}></div>
        <div style={contentStyle}>
          <h2>Bottom Sheet</h2>
          <p>Drag me or use the buttons below to change the position.</p>
          <div>
            <button style={buttonStyle} onClick={() => setCurrentIndex(0)}>Close</button>
            <button style={buttonStyle} onClick={() => setCurrentIndex(1)}>Half</button>
            <button style={buttonStyle} onClick={() => setCurrentIndex(2)}>Open</button>
          </div>
        </div>
      </div>
    </div>
  );
}
