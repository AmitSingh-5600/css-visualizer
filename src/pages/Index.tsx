
import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { VisualizerProvider } from '@/context/VisualizerContext';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import PreviewPanel from '@/components/visualizer/preview-panel';
import CodePanel from '@/components/visualizer/code-panel';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <ThemeProvider>
      <VisualizerProvider>
        <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden">
          <Header />
          
          <div className="flex flex-1 overflow-hidden">
            {/* For mobile, make sidebar conditionally show/hide */}
            <Sidebar className={`${isMobile ? 'absolute z-20 h-full' : 'w-64'} flex-shrink-0 border-r border-gray-200 dark:border-gray-800`} />
            
            <main className="flex-1 overflow-y-auto p-2 md:p-4">
              <div className="flex flex-col gap-4 md:gap-6 h-full">
                <div className="flex-1 h-full">
                  <PreviewPanel className="h-full" />
                </div>
                <CodePanel />
              </div>
            </main>
          </div>
        </div>
      </VisualizerProvider>
    </ThemeProvider>
  );
};

export default Index;
