
import React, { useEffect, useRef } from 'react';

interface VantaBirdsBackgroundProps {
  className?: string;
}

const VantaBirdsBackground: React.FC<VantaBirdsBackgroundProps> = ({ className = "" }) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let initAttempts = 0;
    const maxAttempts = 20;
    
    const initVanta = () => {
      initAttempts++;
      console.log(`Vanta initialization attempt ${initAttempts}/${maxAttempts}`);
      console.log('VANTA available:', !!(window as any).VANTA);
      console.log('THREE available:', !!(window as any).THREE);
      console.log('Element available:', !!vantaRef.current);
      
      if (!vantaEffect.current && vantaRef.current && (window as any).VANTA?.BIRDS && (window as any).THREE) {
        try {
          console.log('Initializing Vanta Birds effect...');
          const effect = (window as any).VANTA.BIRDS({
            el: vantaRef.current,
            THREE: (window as any).THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0x000000,
            color1: 0x7C3AED,
            color2: 0xDB2777,
            colorMode: 'variance',
            birdSize: 2.0,
            wingSpan: 25,
            speedLimit: 3.0,
            separation: 20.00,
            alignment: 20.00,
            cohesion: 20.00,
            quantity: 8
          });
          
          vantaEffect.current = effect;
          console.log('Vanta Birds effect initialized successfully!', effect);
          
          // Ensure the effect persists
          if (effect && typeof effect.resize === 'function') {
            setTimeout(() => effect.resize(), 100);
          }
        } catch (error) {
          console.error('Error initializing Vanta Birds:', error);
        }
      } else if (initAttempts < maxAttempts) {
        console.log(`Retrying Vanta initialization... (${initAttempts}/${maxAttempts})`);
        timeoutId = setTimeout(initVanta, 300);
      } else {
        console.error('Failed to initialize Vanta Birds after maximum attempts');
      }
    };

    // Wait for DOM and scripts to be ready
    timeoutId = setTimeout(initVanta, 500);

    return () => {
      console.log('Cleaning up Vanta effect...');
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
          vantaEffect.current = null;
          console.log('Vanta effect destroyed');
        } catch (error) {
          console.error('Error destroying Vanta effect:', error);
        }
      }
    };
  }, []);

  return (
    <div 
      ref={vantaRef} 
      className={`fixed inset-0 z-0 ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        backgroundColor: '#000000'
      }}
    />
  );
};

export default VantaBirdsBackground;
