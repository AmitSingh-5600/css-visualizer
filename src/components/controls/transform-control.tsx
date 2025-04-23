
import React from 'react';
import { TransformProperty } from '@/types';
import { useVisualizer } from '@/context/VisualizerContext';
import PropertyControl from './property-control';
import RangeSlider from '@/components/ui/range-slider';
import { Move } from 'lucide-react';

const TransformControl: React.FC = () => {
  const { elementProperty, updateTransform } = useVisualizer();
  
  // Find transform property
  const transform = elementProperty.properties.find(
    (prop) => prop.type === 'transform'
  )?.value as TransformProperty;

  if (!transform) return null;

  return (
    <PropertyControl 
      title="Transform" 
      icon={<Move className="h-4 w-4" />} 
      defaultOpen={true}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <RangeSlider
            label="Translate X"
            min={-100}
            max={100}
            value={transform.translateX}
            onChange={(value) => updateTransform({ translateX: value })}
            valueLabel={`${transform.translateX}px`}
          />
          
          <RangeSlider
            label="Translate Y"
            min={-100}
            max={100}
            value={transform.translateY}
            onChange={(value) => updateTransform({ translateY: value })}
            valueLabel={`${transform.translateY}px`}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <RangeSlider
            label="Scale X"
            min={0}
            max={3}
            step={0.05}
            value={transform.scaleX}
            onChange={(value) => updateTransform({ scaleX: value })}
            valueLabel={transform.scaleX.toFixed(2)}
          />
          
          <RangeSlider
            label="Scale Y"
            min={0}
            max={3}
            step={0.05}
            value={transform.scaleY}
            onChange={(value) => updateTransform({ scaleY: value })}
            valueLabel={transform.scaleY.toFixed(2)}
          />
        </div>
        
        <RangeSlider
          label="Rotate"
          min={0}
          max={360}
          value={transform.rotate}
          onChange={(value) => updateTransform({ rotate: value })}
          valueLabel={`${transform.rotate}°`}
        />
        
        <div className="grid grid-cols-1 gap-4">
          <RangeSlider
            label="Skew X"
            min={-45}
            max={45}
            value={transform.skewX}
            onChange={(value) => updateTransform({ skewX: value })}
            valueLabel={`${transform.skewX}°`}
          />
          
          <RangeSlider
            label="Skew Y"
            min={-45}
            max={45}
            value={transform.skewY}
            onChange={(value) => updateTransform({ skewY: value })}
            valueLabel={`${transform.skewY}°`}
          />
        </div>
        
        <div className="flex justify-center mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => updateTransform({
              translateX: 0,
              translateY: 0,
              scaleX: 1,
              scaleY: 1,
              rotate: 0,
              skewX: 0,
              skewY: 0,
            })}
            className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
          >
            Reset Transform
          </button>
        </div>
      </div>
    </PropertyControl>
  );
};

export default TransformControl;
