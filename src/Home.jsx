import React, { useState, useEffect, useRef } from 'react';
import bgImage from './assets/fond-home.jpg';

const MobileUnlockInterface = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const containerRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  // Image de fond modifiable
  const backgroundImage = bgImage;

  const UNLOCK_THRESHOLD = -150; // Distance minimale pour déverrouiller

  useEffect(() => {
    // Empêcher le scroll de la page
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.margin = '0px';
    document.body.style.padding = '0px';
    
    // Vibration tactile si supportée
    const vibrate = () => {
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    };

    if (isUnlocked) {
      vibrate();
      setTimeout(() => setShowContent(true), 300);
    }

    return () => {
      // Nettoyer au démontage
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isUnlocked]);

  const handleTouchStart = (e) => {
    if (isUnlocked) return;
    
    setIsDragging(true);
    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!isDragging || isUnlocked) return;
    
    e.preventDefault();
    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;
    
    // Limiter le drag uniquement vers le haut
    if (deltaY < 0) {
      setDragY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging || isUnlocked) return;
    
    setIsDragging(false);
    
    if (dragY <= UNLOCK_THRESHOLD) {
      // Déverrouillage réussi
      setIsUnlocked(true);
      setDragY(0);
    } else {
      // Animation de retour avec effet spring
      setDragY(0);
    }
  };

  const handleMouseStart = (e) => {
    if (isUnlocked) return;
    
    setIsDragging(true);
    startY.current = e.clientY;
    currentY.current = e.clientY;
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isUnlocked) return;
    
    currentY.current = e.clientY;
    const deltaY = currentY.current - startY.current;
    
    if (deltaY < 0) {
      setDragY(deltaY);
    }
  };

  const handleMouseEnd = () => {
    if (!isDragging || isUnlocked) return;
    
    setIsDragging(false);
    
    if (dragY <= UNLOCK_THRESHOLD) {
      setIsUnlocked(true);
      setDragY(0);
    } else {
      setDragY(0);
    }
  };

  const reset = () => {
    setIsUnlocked(false);
    setShowContent(false);
    setDragY(0);
    setIsDragging(false);
  };

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    userSelect: 'none',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    opacity: isUnlocked ? 0.2 : 0.4,
    transition: 'opacity 1s ease'
  };

  const contentContainerStyle = {
    position: 'relative',
    zIndex: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 2rem',
    textAlign: 'center',
    transform: `translateY(${dragY * 0.3}px) ${isUnlocked ? 'scale(0.95)' : 'scale(1)'}`,
    transition: 'transform 0.7s ease-out'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1rem',
    lineHeight: '1.2',
    opacity: isUnlocked ? 0.7 : 1,
    filter: isUnlocked ? 'blur(2px)' : 'blur(0px)',
    transition: 'all 0.7s ease'
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '300',
    marginBottom: '4rem',
    opacity: isUnlocked ? 0.5 : 1,
    filter: isUnlocked ? 'blur(1px)' : 'blur(0px)',
    transition: 'all 0.7s ease'
  };

  const buttonContainerStyle = {
    position: 'relative',
    transform: `translateY(${dragY}px)`,
    transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  };

  const buttonStyle = {
    width: '80px',
    height: '80px',
    backgroundColor: `rgba(255, 255, 255, ${1 - Math.abs(dragY) / 300})`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    transform: isDragging ? 'scale(1.1)' : 'scale(1)',
    opacity: isUnlocked ? 0 : 1,
    transition: 'all 0.3s ease-out',
    border: 'none'
  };

  const iconStyle = {
    width: '24px',
    height: '24px',
    color: '#374151',
    transform: `translateY(${Math.min(Math.abs(dragY) / 10, 8)}px) rotate(${Math.abs(dragY) / 2}deg)`,
    transition: 'transform 0.3s ease'
  };

  const indicatorStyle = {
    position: 'absolute',
    bottom: '-2rem',
    left: '50%',
    transform: `translateX(-50%) scale(${isDragging ? 1.1 : 1})`,
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: '500',
    opacity: isDragging ? 1 : 0.5,
    transition: 'all 0.3s ease'
  };

  const unlockedContentStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    background: 'linear-gradient(135deg, #6C0F26 20%, #FFF5C2 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 2rem',
    opacity: showContent ? 1 : 0,
    transform: showContent ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
    pointerEvents: showContent ? 'auto' : 'none',
    transition: 'all 1s ease-out'
  };

  const iconContainerStyle = {
    width: '96px',
    height: '96px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    backdropFilter: 'blur(10px)'
  };

  const unlockedTitleStyle = {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1rem'
  };

  const unlockedTextStyle = {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.125rem',
    marginBottom: '2rem',
    lineHeight: '1.6'
  };

  const buttonGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '300px'
  };

  const primaryButtonStyle = {
    width: '100%',
    backgroundColor: 'white',
    color: 'black',
    fontWeight: '600',
    padding: '1rem 2rem',
    borderRadius: '1rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '1rem'
  };

  const secondaryButtonStyle = {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    fontWeight: '600',
    padding: '0.75rem 2rem',
    borderRadius: '1rem',
    border: 'none',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    fontSize: '1rem'
  };

  const indicatorsStyle = {
    position: 'absolute',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '0.5rem'
  };

  const dotStyle = (i) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: showContent ? 'white' : 'rgba(255, 255, 255, 0.5)',
    opacity: isDragging ? 1 : 0.7,
    animationDelay: `${i * 0.1}s`,
    transition: 'all 0.5s ease'
  });

  return (
    <div 
      ref={containerRef}
      style={containerStyle}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseStart}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseEnd}
      onMouseLeave={handleMouseEnd}
    >
      {/* Overlay sombre */}
      <div style={overlayStyle} />

      {/* Effet parallaxe sur le contenu principal */}
      <div style={contentContainerStyle}>
        <h1 style={titleStyle}>
          Bordeaux à travers les visages
        </h1>
        
        <p style={subtitleStyle}>
          Entrez dans l'expérience
        </p>

        {/* Bouton de déverrouillage */}
        <div style={buttonContainerStyle}>
          <div style={buttonStyle}>
            <svg 
              style={iconStyle}
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path 
                d="M7 14L12 9L17 14" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          {/* Indicateur de progression */}
          <div style={indicatorStyle}>
            {isDragging ? 'Encore' : 'Swipe'}
          </div>
        </div>
      </div>

      {/* Contenu déverrouillé */}
      <div style={unlockedContentStyle}>
        <div>
          <div style={iconContainerStyle}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{color: 'white'}}>
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          
          <h2 style={unlockedTitleStyle}>
            Welcome to Your Journey!
          </h2>
          
          <p style={unlockedTextStyle}>
            You've successfully unlocked your adventure. Let's explore new possibilities together and make every moment count.
          </p>
          
          <div style={buttonGroupStyle}>
            <button 
              style={primaryButtonStyle}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f3f4f6';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Start Your Adventure
            </button>
            
            <button 
              onClick={reset}
              style={secondaryButtonStyle}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              Reset Experience
            </button>
          </div>
        </div>
      </div>

      {/* Indicateurs visuels */}
      <div style={indicatorsStyle}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={dotStyle(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileUnlockInterface;