
import React from 'react';
import { FilterProperty } from '@/types';
import { useVisualizer } from '@/context/VisualizerContext';
import PropertyControl from './property-control';
import RangeSlider from '@/components/ui/range-slider';
import { Filter } from 'lucide-react';

const FilterControl: React.FC = () => {
  const { elementProperty, updateFilter } = useVisualizer();
  
  // Find filter property
  const filter = elementProperty.properties.find(
    (prop) => prop.type === 'filter'
  )?.value as FilterProperty;

  if (!filter) return null;

  const resetFilters = () => {
    updateFilter({
      blur: 0,
      brightness: 100,
      contrast: 100,
      grayscale: 0,
      hueRotate: 0,
      invert: 0,
      opacity: 100,
      saturate: 100,
      sepia: 0,
    });
  };

  return (
    <PropertyControl 
      title="Filters" 
      icon={<Filter className="h-4 w-4" />} 
      defaultOpen={true}
    >
      <div className="space-y-4">
        <RangeSlider
          label="Blur"
          min={0}
          max={20}
          step={0.1}
          value={filter.blur}
          onChange={(value) => updateFilter({ blur: value })}
          valueLabel={`${filter.blur}px`}
        />
        
        <RangeSlider
          label="Brightness"
          min={0}
          max={200}
          value={filter.brightness}
          onChange={(value) => updateFilter({ brightness: value })}
          valueLabel={`${filter.brightness}%`}
        />
        
        <RangeSlider
          label="Contrast"
          min={0}
          max={200}
          value={filter.contrast}
          onChange={(value) => updateFilter({ contrast: value })}
          valueLabel={`${filter.contrast}%`}
        />
        
        <RangeSlider
          label="Grayscale"
          min={0}
          max={100}
          value={filter.grayscale}
          onChange={(value) => updateFilter({ grayscale: value })}
          valueLabel={`${filter.grayscale}%`}
        />
        
        <RangeSlider
          label="Hue Rotate"
          min={0}
          max={360}
          value={filter.hueRotate}
          onChange={(value) => updateFilter({ hueRotate: value })}
          valueLabel={`${filter.hueRotate}°`}
        />
        
        <RangeSlider
          label="Invert"
          min={0}
          max={100}
          value={filter.invert}
          onChange={(value) => updateFilter({ invert: value })}
          valueLabel={`${filter.invert}%`}
        />
        
        <RangeSlider
          label="Opacity"
          min={0}
          max={100}
          value={filter.opacity}
          onChange={(value) => updateFilter({ opacity: value })}
          valueLabel={`${filter.opacity}%`}
        />
        
        <RangeSlider
          label="Saturate"
          min={0}
          max={200}
          value={filter.saturate}
          onChange={(value) => updateFilter({ saturate: value })}
          valueLabel={`${filter.saturate}%`}
        />
        
        <RangeSlider
          label="Sepia"
          min={0}
          max={100}
          value={filter.sepia}
          onChange={(value) => updateFilter({ sepia: value })}
          valueLabel={`${filter.sepia}%`}
        />
        
        <div className="flex justify-center mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={resetFilters}
            className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </PropertyControl>
  );
};

export default FilterControl;
