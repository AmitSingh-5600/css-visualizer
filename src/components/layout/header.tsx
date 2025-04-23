
import React from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ui/theme-toggle';
import { useVisualizer } from '@/context/VisualizerContext';
import { RotateCcw } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const { undo, redo, resetProperties } = useVisualizer();
  const isMobile = useIsMobile();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-2 px-3 sm:py-3 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-visualizer-purple to-visualizer-teal"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            CSS Visualizer
          </motion.div>
          
          <div className={`flex items-center ml-2 sm:ml-6 space-x-1 ${isMobile ? 'hidden' : 'flex'}`}>
            <button 
              onClick={undo}
              className="p-1 sm:p-1.5 rounded-md text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Undo"
            >
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            
            <button 
              onClick={redo}
              className="p-1 sm:p-1.5 rounded-md text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Redo"
              style={{ transform: 'scaleX(-1)' }}
            >
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            
            <button 
              onClick={resetProperties}
              className="text-xs px-1 sm:px-2 py-0.5 sm:py-1 ml-0.5 sm:ml-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {isMobile && (
            <div className="flex items-center space-x-1 mr-1">
              <button 
                onClick={undo}
                className="p-1 rounded-md text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Undo"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
              
              <button 
                onClick={redo}
                className="p-1 rounded-md text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Redo"
                style={{ transform: 'scaleX(-1)' }}
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            </div>
          )}
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
