
import React from 'react';
import { BoxShadowProperty } from '@/types';
import { useVisualizer } from '@/context/VisualizerContext';
import PropertyControl from './property-control';
import RangeSlider from '@/components/ui/range-slider';
import ColorPicker from '@/components/ui/color-picker';
import { Square } from 'lucide-react';

const BoxShadowControl: React.FC = () => {
  const { elementProperty, updateBoxShadow } = useVisualizer();
  
  // Find box shadow property
  const boxShadow = elementProperty.properties.find(
    (prop) => prop.type === 'boxShadow'
  )?.value as BoxShadowProperty;

  if (!boxShadow) return null;

  return (
    <PropertyControl 
      title="Box Shadow" 
      icon={<Square className="h-4 w-4" />} 
      defaultOpen={true}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <RangeSlider
            label="H-Offset"
            min={-50}
            max={50}
            value={boxShadow.horizontalOffset}
            onChange={(value) => updateBoxShadow({ horizontalOffset: value })}
            valueLabel={`${boxShadow.horizontalOffset}px`}
          />
          
          <RangeSlider
            label="V-Offset"
            min={-50}
            max={50}
            value={boxShadow.verticalOffset}
            onChange={(value) => updateBoxShadow({ verticalOffset: value })}
            valueLabel={`${boxShadow.verticalOffset}px`}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <RangeSlider
            label="Blur"
            min={0}
            max={100}
            value={boxShadow.blurRadius}
            onChange={(value) => updateBoxShadow({ blurRadius: value })}
            valueLabel={`${boxShadow.blurRadius}px`}
          />
          
          <RangeSlider
            label="Spread"
            min={-50}
            max={50}
            value={boxShadow.spreadRadius}
            onChange={(value) => updateBoxShadow({ spreadRadius: value })}
            valueLabel={`${boxShadow.spreadRadius}px`}
          />
        </div>
        
        <div className="flex flex-col items-center justify-between">
          <ColorPicker
            label="Shadow Color"
            color={boxShadow.color}
            onChange={(color) => updateBoxShadow({ color })}
          />
          
          <div className="pt-7">
            <label className="flex items-center cursor-pointer">
              <span className="text-sm mr-2 text-gray-600 dark:text-gray-300">Inset</span>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={boxShadow.inset}
                  onChange={(e) => updateBoxShadow({ inset: e.target.checked })}
                />
                <div className={`w-10 h-5 ${boxShadow.inset ? 'bg-visualizer-purple' : 'bg-gray-300 dark:bg-gray-600'} rounded-full shadow-inner transition-colors`}></div>
                <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${boxShadow.inset ? 'transform translate-x-5' : ''}`}></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </PropertyControl>
  );
};

export default BoxShadowControl;
