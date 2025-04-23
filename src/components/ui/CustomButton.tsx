
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

type ButtonProps = React.PropsWithChildren<{
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  isFullWidth?: boolean;
  disabled?: boolean;
}> & HTMLMotionProps<'button'>;

const CustomButton = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  isFullWidth = false,
  disabled,
  ...props
}: ButtonProps) => {
  // Variants
  const variantClasses = {
    primary: 'bg-visualizer-purple text-white hover:bg-visualizer-purple/90',
    secondary: 'bg-visualizer-teal text-white hover:bg-visualizer-teal/90',
    outline: 'border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
    ghost: 'bg-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
    link: 'bg-transparent text-visualizer-purple underline-offset-4 hover:underline p-0',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
  };

  // Sizes
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
    icon: 'p-2',
  };

  return (
    <motion.button
      className={cn(
        'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-visualizer-purple/50 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2',
        variantClasses[variant],
        sizeClasses[size],
        isFullWidth ? 'w-full' : '',
        className
      )}
      disabled={isLoading || disabled}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      {...props}
    >
      {isLoading && (
        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
      )}
      {!isLoading && leftIcon}
      {size === 'icon' ? null : <span>{children}</span>}
      {!isLoading && rightIcon}
    </motion.button>
  );
};

export default CustomButton;
