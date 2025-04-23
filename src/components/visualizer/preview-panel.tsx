
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useVisualizer } from '@/context/VisualizerContext';
import { 
  BoxShadowProperty, 
  BorderRadiusProperty, 
  TransformProperty, 
  GradientProperty, 
  FilterProperty,
  ResponsiveMode
} from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

interface PreviewPanelProps {
  className?: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ className }) => {
  const { elementProperty, responsiveMode } = useVisualizer();
  const previewRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Find properties
  const boxShadow = elementProperty.properties.find(p => p.type === 'boxShadow')?.value as BoxShadowProperty;
  const borderRadius = elementProperty.properties.find(p => p.type === 'borderRadius')?.value as BorderRadiusProperty;
  const transform = elementProperty.properties.find(p => p.type === 'transform')?.value as TransformProperty;
  const gradient = elementProperty.properties.find(p => p.type === 'gradient')?.value as GradientProperty;
  const filter = elementProperty.properties.find(p => p.type === 'filter')?.value as FilterProperty;

  // Generate box-shadow CSS
  const generateBoxShadowCSS = (): string => {
    if (!boxShadow) return '';
    return `${boxShadow.inset ? 'inset ' : ''}${boxShadow.horizontalOffset}px ${boxShadow.verticalOffset}px ${boxShadow.blurRadius}px ${boxShadow.spreadRadius}px ${boxShadow.color}`;
  };

  // Generate border-radius CSS
  const generateBorderRadiusCSS = (): string => {
    if (!borderRadius) return '';
    
    if (borderRadius.all) {
      return `${borderRadius.topLeft}${borderRadius.unit}`;
    }
    
    return `${borderRadius.topLeft}${borderRadius.unit} ${borderRadius.topRight}${borderRadius.unit} ${borderRadius.bottomRight}${borderRadius.unit} ${borderRadius.bottomLeft}${borderRadius.unit}`;
  };

  // Generate transform CSS
  const generateTransformCSS = (): string => {
    if (!transform) return '';
    
    const parts: string[] = [];
    
    if (transform.translateX !== 0 || transform.translateY !== 0) {
      parts.push(`translate(${transform.translateX}px, ${transform.translateY}px)`);
    }
    
    if (transform.scaleX !== 1 || transform.scaleY !== 1) {
      parts.push(`scale(${transform.scaleX}, ${transform.scaleY})`);
    }
    
    if (transform.rotate !== 0) {
      parts.push(`rotate(${transform.rotate}deg)`);
    }
    
    if (transform.skewX !== 0) {
      parts.push(`skewX(${transform.skewX}deg)`);
    }
    
    if (transform.skewY !== 0) {
      parts.push(`skewY(${transform.skewY}deg)`);
    }
    
    return parts.join(' ');
  };

  // Generate gradient CSS
  const generateGradientCSS = (): string => {
    if (!gradient) return '';
    
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

  // Generate filter CSS
  const generateFilterCSS = (): string => {
    if (!filter) return '';
    
    const parts: string[] = [];
    
    if (filter.blur > 0) parts.push(`blur(${filter.blur}px)`);
    if (filter.brightness !== 100) parts.push(`brightness(${filter.brightness}%)`);
    if (filter.contrast !== 100) parts.push(`contrast(${filter.contrast}%)`);
    if (filter.grayscale > 0) parts.push(`grayscale(${filter.grayscale}%)`);
    if (filter.hueRotate !== 0) parts.push(`hue-rotate(${filter.hueRotate}deg)`);
    if (filter.invert > 0) parts.push(`invert(${filter.invert}%)`);
    if (filter.opacity !== 100) parts.push(`opacity(${filter.opacity}%)`);
    if (filter.saturate !== 100) parts.push(`saturate(${filter.saturate}%)`);
    if (filter.sepia > 0) parts.push(`sepia(${filter.sepia}%)`);
    
    return parts.join(' ');
  };

  // Adjust padding based on screen size
  const padding = isMobile ? 'p-8' : 'p-16';

  return (
    <div className={`preview-panel flex items-center justify-center h-full w-full bg-gray-50 dark:bg-gray-800 rounded-lg ${className || ''}`}>
      <div className={`w-full h-full flex items-center justify-center ${padding}`}>
        <motion.div
          ref={previewRef}
          className="preview-element relative flex items-center justify-center"
          style={{
            width: `${elementProperty.width}px`,
            height: `${elementProperty.height}px`,
            backgroundColor: elementProperty.backgroundColor,
            color: elementProperty.color,
            fontFamily: elementProperty.fontFamily,
            fontSize: `${elementProperty.fontSize}px`,
            fontWeight: elementProperty.fontWeight,
            borderRadius: generateBorderRadiusCSS(),
            boxShadow: generateBoxShadowCSS(),
            transform: generateTransformCSS(),
            background: generateGradientCSS() || elementProperty.backgroundColor,
            filter: generateFilterCSS(),
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {elementProperty.text}
        </motion.div>
      </div>
    </div>
  );
};

export default PreviewPanel;
