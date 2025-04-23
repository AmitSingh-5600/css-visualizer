
import React, { useState } from 'react';
import BoxShadowControl from '@/components/controls/box-shadow-control';
import BorderRadiusControl from '@/components/controls/border-radius-control';
import TransformControl from '@/components/controls/transform-control';
import GradientControl from '@/components/controls/gradient-control';
import FilterControl from '@/components/controls/filter-control';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Box, Circle, Pencil, Palette, Sliders, ChevronLeft, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(!isMobile);

  if (isMobile && !isVisible) {
    return (
      <button 
        onClick={() => setIsVisible(true)}
        className="fixed z-20 top-25 left-4 p-3 rounded-full bg-visualizer-purple text-white shadow-lg"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className={`overflow-y-auto py-4 px-3 bg-white dark:bg-gray-900 ${className || ''}`}>
      {isMobile && (
        <div className="flex justify-end mb-2">
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      )}
      <div className="space-y-2">
        <Collapsible defaultOpen={true}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
            <div className="flex items-center">
              <Box className="h-4 w-4 mr-2" />
              <span>Box Shadow</span>
            </div>
            <span className="text-gray-400">▼</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-2 pb-1 px-2">
              <BoxShadowControl />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
            <div className="flex items-center">
              <Circle className="h-4 w-4 mr-2" />
              <span>Border Radius</span>
            </div>
            <span className="text-gray-400">▼</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-2 pb-1 px-2">
              <BorderRadiusControl />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
            <div className="flex items-center">
              <Pencil className="h-4 w-4 mr-2" />
              <span>Transform</span>
            </div>
            <span className="text-gray-400">▼</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-2 pb-1 px-2">
              <TransformControl />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
            <div className="flex items-center">
              <Palette className="h-4 w-4 mr-2" />
              <span>Gradient</span>
            </div>
            <span className="text-gray-400">▼</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-2 pb-1 px-2">
              <GradientControl />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
            <div className="flex items-center">
              <Sliders className="h-4 w-4 mr-2" />
              <span>Filter</span>
            </div>
            <span className="text-gray-400">▼</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-2 pb-1 px-2">
              <FilterControl />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default Sidebar;
