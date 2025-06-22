
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
            backgroundColor: 0xf8fafc,
            color1: 0x7C3AED,
            color2: 0xDB2777,
            colorMode: 'variance',
            birdSize: 1.3,
            wingSpan: 20,
            speedLimit: 4.0,
            separation: 20.00,
            alignment: 20.00,
            cohesion: 20.00,
            quantity: 4
          });
          
          vantaEffect.current = effect;
          console.log('Vanta Birds effect initialized successfully');
        } catch (error) {
          console.error('Error initializing Vanta Birds:', error);
        }
      } else if (!(window as any).VANTA || !(window as any).THREE) {
        // Retry after a short delay if libraries aren't loaded yet
        timeoutId = setTimeout(initVanta, 100);
      }
    };

    // Small delay to ensure DOM is ready
    timeoutId = setTimeout(initVanta, 50);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={vantaRef} 
      className={`fixed inset-0 z-0 ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default VantaBirdsBackground;
