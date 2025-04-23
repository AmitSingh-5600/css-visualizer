
import React from 'react';
import { BorderRadiusProperty } from '@/types';
import { useVisualizer } from '@/context/VisualizerContext';
import PropertyControl from './property-control';
import RangeSlider from '@/components/ui/range-slider';
import { Circle } from 'lucide-react';

const BorderRadiusControl: React.FC = () => {
  const { elementProperty, updateBorderRadius } = useVisualizer();
  
  // Find border radius property
  const borderRadius = elementProperty.properties.find(
    (prop) => prop.type === 'borderRadius'
  )?.value as BorderRadiusProperty;

  if (!borderRadius) return null;

  const handleAllRadiusChange = (value: number) => {
    updateBorderRadius({
      topLeft: value,
      topRight: value,
      bottomRight: value,
      bottomLeft: value,
    });
  };

  const unitOptions: { value: BorderRadiusProperty['unit']; label: string }[] = [
    { value: 'px', label: 'px' },
    { value: '%', label: '%' },
    { value: 'em', label: 'em' },
    { value: 'rem', label: 'rem' },
  ];

  return (
    <PropertyControl 
      title="Border Radius" 
      icon={<Circle className="h-4 w-4" />} 
      defaultOpen={true}
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-4 items-center justify-between mb-2">
          <label className="flex items-center cursor-pointer">
            <span className="text-sm mr-2 text-gray-600 dark:text-gray-300">All corners</span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={borderRadius.all}
                onChange={(e) => updateBorderRadius({ all: e.target.checked })}
              />
              <div className={`w-10 h-5 ${borderRadius.all ? 'bg-visualizer-purple' : 'bg-gray-300 dark:bg-gray-600'} rounded-full shadow-inner transition-colors`}></div>
              <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${borderRadius.all ? 'transform translate-x-5' : ''}`}></div>
            </div>
          </label>
          
          <div className="flex items-center">
            <span className="text-sm mr-2 text-gray-600 dark:text-gray-300">Unit</span>
            <select
              value={borderRadius.unit}
              onChange={(e) => updateBorderRadius({ unit: e.target.value as BorderRadiusProperty['unit'] })}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm"
            >
              {unitOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {borderRadius.all ? (
          <RangeSlider
            label="Radius"
            min={0}
            max={borderRadius.unit === 'px' ? 100 : borderRadius.unit === '%' ? 50 : 10}
            step={borderRadius.unit === 'px' ? 1 : 0.1}
            value={borderRadius.topLeft}
            onChange={handleAllRadiusChange}
            valueLabel={`${borderRadius.topLeft}${borderRadius.unit}`}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <RangeSlider
              label="Top Left"
              min={0}
              max={borderRadius.unit === 'px' ? 100 : borderRadius.unit === '%' ? 50 : 10}
              step={borderRadius.unit === 'px' ? 1 : 0.1}
              value={borderRadius.topLeft}
              onChange={(value) => updateBorderRadius({ topLeft: value })}
              valueLabel={`${borderRadius.topLeft}${borderRadius.unit}`}
            />
            
            <RangeSlider
              label="Top Right"
              min={0}
              max={borderRadius.unit === 'px' ? 100 : borderRadius.unit === '%' ? 50 : 10}
              step={borderRadius.unit === 'px' ? 1 : 0.1}
              value={borderRadius.topRight}
              onChange={(value) => updateBorderRadius({ topRight: value })}
              valueLabel={`${borderRadius.topRight}${borderRadius.unit}`}
            />
            
            <RangeSlider
              label="Bottom Right"
              min={0}
              max={borderRadius.unit === 'px' ? 100 : borderRadius.unit === '%' ? 50 : 10}
              step={borderRadius.unit === 'px' ? 1 : 0.1}
              value={borderRadius.bottomRight}
              onChange={(value) => updateBorderRadius({ bottomRight: value })}
              valueLabel={`${borderRadius.bottomRight}${borderRadius.unit}`}
            />
            
            <RangeSlider
              label="Bottom Left"
              min={0}
              max={borderRadius.unit === 'px' ? 100 : borderRadius.unit === '%' ? 50 : 10}
              step={borderRadius.unit === 'px' ? 1 : 0.1}
              value={borderRadius.bottomLeft}
              onChange={(value) => updateBorderRadius({ bottomLeft: value })}
              valueLabel={`${borderRadius.bottomLeft}${borderRadius.unit}`}
            />
          </div>
        )}
        
        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 mx-auto w-32 h-32 relative">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-tl-[var(--radius)]" style={{ '--radius': `${borderRadius.topLeft}${borderRadius.unit}` } as React.CSSProperties}></div>
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-tr-[var(--radius)]" style={{ '--radius': `${borderRadius.topRight}${borderRadius.unit}` } as React.CSSProperties}></div>
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-bl-[var(--radius)]" style={{ '--radius': `${borderRadius.bottomLeft}${borderRadius.unit}` } as React.CSSProperties}></div>
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-br-[var(--radius)]" style={{ '--radius': `${borderRadius.bottomRight}${borderRadius.unit}` } as React.CSSProperties}></div>
          </div>
        </div>
      </div>
    </PropertyControl>
  );
};

export default BorderRadiusControl;
