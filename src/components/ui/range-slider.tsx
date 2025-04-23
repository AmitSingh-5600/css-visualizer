
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  valueLabel?: string;
  className?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  valueLabel,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {(label || valueLabel) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-gray-600 dark:text-gray-300">{label}</span>}
          {valueLabel && <span className="font-medium text-gray-800 dark:text-gray-200">{valueLabel}</span>}
        </div>
      )}
      
      <div 
        ref={sliderRef}
        className="relative h-8 flex items-center"
      >
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="appearance-none absolute w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full outline-none z-10"
          style={{
            WebkitAppearance: 'none',
          }}
        />
        
        {/* Track fill */}
        <div 
          className="absolute h-1.5 bg-visualizer-purple rounded-full" 
          style={{ width: `${percentage}%` }} 
        />
        
        {/* Thumb */}
        <motion.div
          className="absolute w-5 h-5 bg-white dark:bg-gray-800 rounded-full border-2 border-visualizer-purple shadow-md z-20"
          style={{ left: `calc(${percentage}% - 10px)` }}
          animate={{
            scale: isDragging ? 1.15 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
