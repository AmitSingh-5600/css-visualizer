
import React from 'react';
import { GradientProperty } from '@/types';
import { useVisualizer } from '@/context/VisualizerContext';
import PropertyControl from './property-control';
import RangeSlider from '@/components/ui/range-slider';
import ColorPicker from '@/components/ui/color-picker';
import { PaintBucket, Plus, X } from 'lucide-react';

const GradientControl: React.FC = () => {
  const { elementProperty, updateGradient } = useVisualizer();
  
  // Find gradient property
  const gradient = elementProperty.properties.find(
    (prop) => prop.type === 'gradient'
  )?.value as GradientProperty;

  if (!gradient) return null;

  const handleGradientTypeChange = (type: GradientProperty['type']) => {
    updateGradient({ type });
  };

  const handleStopColorChange = (index: number, color: string) => {
    const newStops = [...gradient.stops];
    newStops[index] = { ...newStops[index], color };
    updateGradient({ stops: newStops });
  };

  const handleStopPositionChange = (index: number, position: number) => {
    const newStops = [...gradient.stops];
    newStops[index] = { ...newStops[index], position };
    updateGradient({ stops: newStops });
  };

  const addGradientStop = () => {
    // Calculate a position for the new stop in between existing stops
    const newPosition = gradient.stops.length > 0 
      ? Math.round(gradient.stops.reduce((acc, stop) => acc + stop.position, 0) / gradient.stops.length)
      : 50;
    
    updateGradient({
      stops: [
        ...gradient.stops,
        { color: '#ffffff', position: newPosition }
      ]
    });
  };

  const removeGradientStop = (index: number) => {
    if (gradient.stops.length > 2) {
      const newStops = [...gradient.stops];
      newStops.splice(index, 1);
      updateGradient({ stops: newStops });
    }
  };

  // Generate gradient CSS for preview
  const getGradientCSS = () => {
    const sortedStops = [...gradient.stops].sort((a, b) => a.position - b.position);
    const stopsCSS = sortedStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
    
    if (gradient.type === 'linear') {
      return `linear-gradient(${gradient.angle}deg, ${stopsCSS})`;
    } else if (gradient.type === 'radial') {
      return `radial-gradient(circle, ${stopsCSS})`;
    } else {
      return `conic-gradient(from ${gradient.angle}deg, ${stopsCSS})`;
    }
  };

  return (
    <PropertyControl 
      title="Gradient" 
      icon={<PaintBucket className="h-4 w-4" />} 
      defaultOpen={true}
    >
      <div className="space-y-4">
        <div className="flex justify-between mb-2">
          <div className="flex flex-wrap gap-2">
            {(['linear', 'radial', 'conic'] as const).map((type) => (
              <button
                key={type}
                onClick={() => handleGradientTypeChange(type)}
                className={`px-3 py-1 text-sm rounded capitalize ${
                  gradient.type === type 
                    ? 'bg-visualizer-purple text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        {(gradient.type === 'linear' || gradient.type === 'conic') && (
          <RangeSlider
            label={gradient.type === 'linear' ? 'Angle' : 'Start Angle'}
            min={0}
            max={360}
            value={gradient.angle}
            onChange={(value) => updateGradient({ angle: value })}
            valueLabel={`${gradient.angle}°`}
          />
        )}
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Color Stops
            </label>
            <button
              onClick={addGradientStop}
              className="flex items-center text-xs p-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
              disabled={gradient.stops.length >= 5}
              title="Add color stop"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          
          <div className="space-y-4">
            {gradient.stops.map((stop, index) => (
              <div key={index} className="space-x-2">
                <ColorPicker
                  color={stop.color}
                  onChange={(color) => handleStopColorChange(index, color)}
                  className="w-1/3"
                />
                
                <RangeSlider
                  label=""
                  min={0}
                  max={100}
                  value={stop.position}
                  onChange={(value) => handleStopPositionChange(index, value)}
                  valueLabel={`${stop.position}%`}
                  className="flex-1"
                />
                
                {gradient.stops.length > 2 && (
                  <button
                    onClick={() => removeGradientStop(index)}
                    className="p-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded mb-0.5"
                    title="Remove color stop"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="h-20 rounded-md" style={{ background: getGradientCSS() }}></div>
        </div>
      </div>
    </PropertyControl>
  );
};

export default GradientControl;
