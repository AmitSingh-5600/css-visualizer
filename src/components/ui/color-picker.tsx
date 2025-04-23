
import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
  className?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  color, 
  onChange, 
  label,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popover = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (popover.current && !popover.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      
      <div className="flex items-center gap-2">
        <button
          className="w-9 h-9 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer shadow-sm"
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(true)}
          aria-label="Open color picker"
        />
        
        <HexColorInput
          color={color}
          onChange={onChange}
          prefixed
          className="w-28 px-2 py-1 rounded-md text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          aria-label="Color value"
        />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popover}
            className="absolute z-10 mt-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <HexColorPicker color={color} onChange={onChange} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;
