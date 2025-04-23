
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Tablet, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResponsiveMode } from '@/types';

interface ResponsiveToggleProps {
  value: ResponsiveMode;
  onChange: (value: ResponsiveMode) => void;
  className?: string;
}

const ResponsiveToggle: React.FC<ResponsiveToggleProps> = ({ 
  value, 
  onChange,
  className
}) => {
  const options: { value: ResponsiveMode; icon: React.ReactNode; label: string }[] = [
    { value: 'mobile', icon: <Smartphone className="w-4 h-4" />, label: 'Mobile' },
    { value: 'tablet', icon: <Tablet className="w-4 h-4" />, label: 'Tablet' },
    { value: 'desktop', icon: <Monitor className="w-4 h-4" />, label: 'Desktop' },
  ];

  return (
    <div className={cn("flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg", className)}>
      {options.map((option) => (
        <motion.button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex items-center justify-center rounded-md py-1.5 px-3 text-sm font-medium relative",
            value === option.value 
              ? "text-gray-900 dark:text-white" 
              : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
          )}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${option.label} view`}
        >
          {value === option.value && (
            <motion.div
              layoutId="responsiveToggleIndicator"
              className="absolute inset-0 bg-white dark:bg-gray-700 rounded-md z-0"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="flex items-center gap-1.5 z-10">
            {option.icon}
            <span className="hidden sm:inline">{option.label}</span>
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default ResponsiveToggle;
