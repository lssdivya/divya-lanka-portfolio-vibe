
import React, { useEffect, useRef } from 'react';

interface VantaBirdsBackgroundProps {
  className?: string;
}

const VantaBirdsBackground: React.FC<VantaBirdsBackgroundProps> = ({ className = "" }) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const initVanta = () => {
      console.log('Attempting to initialize Vanta Birds...');
      console.log('VANTA available:', !!(window as any).VANTA);
      console.log('THREE available:', !!(window as any).THREE);
      console.log('Element available:', !!vantaRef.current);
      
      if (!vantaEffect.current && vantaRef.current && (window as any).VANTA && (window as any).THREE) {
        try {
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
            backgroundColor: 0x000000,  // Changed to black for better visibility
            color1: 0x7C3AED,
            color2: 0xDB2777,
            colorMode: 'variance',
            birdSize: 2.0,  // Increased size
            wingSpan: 25,   // Increased wingspan
            speedLimit: 3.0,
            separation: 20.00,
            alignment: 20.00,
            cohesion: 20.00,
            quantity: 8     // Increased quantity
          });
          
          vantaEffect.current = effect;
          console.log('Vanta Birds effect initialized successfully:', effect);
        } catch (error) {
          console.error('Error initializing Vanta Birds:', error);
        }
      } else {
        console.log('Retrying Vanta initialization...');
        timeoutId = setTimeout(initVanta, 200);
      }
    };

    // Wait for DOM and scripts to be ready
    timeoutId = setTimeout(initVanta, 100);

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
        backgroundColor: '#000000'  // Fallback background
      }}
    />
  );
};

export default VantaBirdsBackground;
