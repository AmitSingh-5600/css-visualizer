
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface PropertyControlProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

const PropertyControl: React.FC<PropertyControlProps> = ({
  title,
  icon,
  children,
  className,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className={cn("control-panel mb-4", className)}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="control-panel-header w-full flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-t-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center gap-2 font-medium">
          {icon}
          {title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </motion.span>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden bg-white dark:bg-gray-800 rounded-b-lg border-t border-gray-100 dark:border-gray-700"
      >
        <div className="p-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyControl;
