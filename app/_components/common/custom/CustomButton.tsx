'use client';

import React, { MouseEventHandler, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CustomButtonProps {
  variant: 'primary' | 'outline';
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode | string;
  disable?: boolean;
  className?: string;
  onClick?: (e?: any) => void;
  primaryButtonStyle?: string;
  primaryButtonHoverStyle?: string;
  props?: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant,
  type = 'button',
  children,
  disable = false,
  className,
  onClick,
  primaryButtonStyle,
  primaryButtonHoverStyle,
  props,
}: CustomButtonProps) => {
  const [buttonHovered, setButtonHovered] = useState(false);

  let buttonScale = disable ? 0.5 : 0.975;
  let buttonOpacity = disable ? 0.5 : 0.95;
  let buttonBounce = disable ? undefined : 0.6;
  let buttonDamping = disable ? undefined : 7.5;

  let buttonStyles = `relative w-full h-10 flex items-center justify-center rounded-2xl overflow-hidden ${
    disable ? '!opacity-50' : '!opacity-100'
  } ${className ?? ''}`;

  let buttonHoverStyles = `w-full h-full absolute transition-all ${
    buttonHovered ? 'top-0' : 'top-full'
  }`;

  let hoverScale = 1;

  useEffect(() => {
    setButtonHovered(false);
  }, [disable]);

  switch (variant) {
    case 'primary':
      buttonStyles += ` bg-[#A29BFE] text-white ${primaryButtonStyle}`;
      buttonHoverStyles += ` bg-[rgb(0,184,148)] ${primaryButtonHoverStyle}`;
      break;

    case 'outline':
      buttonStyles += ' bg-transparent border border-text1';
      hoverScale = 0.975;
      break;

    default:
      break;
  }

  return (
    <motion.button
      // whileTap={{ scale: buttonScale, opacity: buttonOpacity }}
      transition={{
        type: 'spring',
        bounce: buttonBounce,
        damping: buttonDamping,
      }}
      className={buttonStyles}
      onMouseEnter={() => setButtonHovered(true)}
      onMouseLeave={() => setButtonHovered(false)}
      disabled={disable}
      type={type}
      whileHover={{
        scale: hoverScale,
      }}
      onClick={!disable ? onClick : () => {}}
      {...props}
    >
      <div className={buttonHoverStyles}></div>
      <div className="relative">{children}</div>
    </motion.button>
  );
};

export default CustomButton;
