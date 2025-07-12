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
  const overlayVisible = snapHeights[currentIndex] > 10 || dragPosition !== null;

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: overlayVisible ? 'rgba(0,0,0,0.5)' : 'transparent',
    transition: 'background-color 0.3s ease',
    pointerEvents: overlayVisible ? 'auto' : 'none',
    zIndex: 99,
  };

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
    background: 'linear-gradient(180deg, #1f2937 0%, #1e293b 100%)',
    borderRadius: '20px 20px 0 0',
    boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    transform: `translateY(${translateY}vh)`,
    touchAction: 'none',
    color: '#f9fafb',
  };  

  const handleStyle = {
    width: '50px',
    height: '6px',
    background: '#9ca3af',
    margin: '14px auto 10px',
    borderRadius: '3px',
    cursor: 'grab',
  };

  const contentStyle = {
    padding: '24px 20px',
    textAlign: 'center',
    flex: 1,
    overflowY: 'auto',
    fontFamily: 'system-ui, sans-serif',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    marginBottom: '12px',
    fontWeight: '600',
  };

  const descriptionStyle = {
    fontSize: '1rem',
    marginBottom: '24px',
    lineHeight: 1.6,
    color: '#d1d5db',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '16px',
  };

  const buttonStyle = {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '20px',
    background: 'linear-gradient(90deg, #10b981, #059669)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '500',
    boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
    transition: 'background 0.3s ease',
  };

  return (
    <>
      <div style={overlayStyle}></div>
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
            <h2 style={titleStyle}>Bottom Sheet</h2>
            <p style={descriptionStyle}>
              Drag this sheet or use the buttons below to adjust its position.
            </p>
            <div style={buttonContainerStyle}>
              <button style={buttonStyle} onClick={() => setCurrentIndex(0)}>Close</button>
              <button style={buttonStyle} onClick={() => setCurrentIndex(1)}>Half</button>
              <button style={buttonStyle} onClick={() => setCurrentIndex(2)}>Open</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
