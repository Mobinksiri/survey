import { useState, useEffect, useRef } from 'react';

const useIntersectOnce = () => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [hasIntersectedOnce, setHasIntersectedOnce] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasIntersectedOnce) {
        setIsIntersecting(true);
        setHasIntersectedOnce(true);
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasIntersectedOnce]);

  return { isIntersecting, ref };
};

export default useIntersectOnce;
