import { useState, useEffect, useRef } from 'react';

interface UseAnimatedCounterOptions {
  targetValue: number;
  duration?: number; // Duration in milliseconds
  startOnView?: boolean; // Start animation when element comes into view
  decimals?: number; // Number of decimal places
}

export function useAnimatedCounter({
  targetValue,
  duration = 2000,
  startOnView = true,
  decimals = 0,
}: UseAnimatedCounterOptions) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView || hasStarted) {
      // Start animation immediately or if already started
      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (targetValue - startValue) * easeOut;

        setCount(parseFloat(currentValue.toFixed(decimals)));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(targetValue);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [targetValue, duration, decimals, startOnView, hasStarted]);

  // Intersection Observer for startOnView
  useEffect(() => {
    if (!startOnView || hasStarted || !elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [startOnView, hasStarted]);

  return { count, elementRef };
}

