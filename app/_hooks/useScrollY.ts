import { useEffect, useState } from "react";

const useScrollY = () => {
   const isClient = typeof window !== "undefined";
   const [scrollY, setScrollY] = useState(isClient ? window.scrollY : 0);

   useEffect(() => {
      const handleScroll = () => {
         setScrollY(isClient ? window.scrollY : 0);
      };
      if (isClient) {
         window.addEventListener("scroll", handleScroll);
      }
      return () => {
         if (isClient) {
            window.removeEventListener("scroll", handleScroll);
         }
      };
   }, [isClient]);

   return scrollY;
};

export default useScrollY;
