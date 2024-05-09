import { motion, AnimatePresence } from 'framer-motion';
import { modalProps } from '@/app/_interface';
import React, { useRef, useEffect, useState } from 'react';

type ModalProps = modalProps & {
  isOpen: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  enableScrollProp?: boolean;
};

const containerFadeIn = {
  hidden: { opacity: 0, transitionEnd: { display: 'none' } },
  visible: { opacity: 1, display: 'flex' },
};

const childrenFaceIn = {
  hidden: { opacity: 0.9, scale: 0.9, rotate: 1 },
  visible: { opacity: 1, scale: 1, rotate: 0 },
};

function preventDefault(e: Event): void {
  e = e || window.event;
  if (e.preventDefault) e.preventDefault();
  e.returnValue = false;
}

function theMouseWheel(e: WheelEvent): void {
  preventDefault(e);
}

function disableScroll(): void {
  if (window.addEventListener) {
    window.addEventListener('wheel', theMouseWheel, { passive: false } as EventListenerOptions);
  }
  document.addEventListener('wheel', theMouseWheel, { passive: false } as EventListenerOptions);
}

function enableScroll(): void {
  if (window.removeEventListener) {
    window.removeEventListener('wheel', theMouseWheel, { passive: false } as EventListenerOptions);
  }
  document.removeEventListener('wheel', theMouseWheel, { passive: false } as EventListenerOptions);
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClick,
  className,
  children,
  enableScrollProp,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModal = (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>): void => {
    if (modalRef.current && e.target === modalRef.current) {
      onClick(e);
    }
  };

  useEffect(() => {
    const navigationElement = document?.getElementById('navigation');

    if (isOpen) {
      !enableScrollProp && disableScroll();
      if (navigationElement) navigationElement.style.zIndex = '9';
    } else {
      enableScroll();
      if (navigationElement) navigationElement.style.zIndex = '15';
    }

    return () => {
      enableScroll();
    };
  }, [enableScrollProp, isOpen]);

  const [animationEnd, animationEndSet] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        onClick={closeModal}
        className={`flex items-center overflow-y-auto justify-center w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-[150] ${className} ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none opacity-0'
        }`}
        animate={isOpen ? 'visible' : 'hidden'}
        variants={containerFadeIn}
        transition={{ duration: 0.1 }}
        onTransitionEnd={() => animationEndSet(true)}
      >
        <motion.div
          className="w-fit h-fit"
          transition={{
            type: 'spring',
            duration: 0.1,
            stiffness: 200,
          }}
          animate={isOpen ? 'visible' : 'hidden'}
          variants={childrenFaceIn}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
