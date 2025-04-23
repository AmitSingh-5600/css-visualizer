
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  ElementProperty, 
  BoxShadowProperty, 
  BorderRadiusProperty, 
  TransformProperty, 
  GradientProperty, 
  FilterProperty,
  CSSProperty,
  ResponsiveMode,
  ExportFormat,
  HistoryEntry
} from '@/types';

type VisualizerContextType = {
  // Element state
  elementProperty: ElementProperty;
  updateElementProperty: (property: Partial<ElementProperty>) => void;
  
  // CSS Properties
  updateBoxShadow: (property: Partial<BoxShadowProperty>) => void;
  updateBorderRadius: (property: Partial<BorderRadiusProperty>) => void;
  updateTransform: (property: Partial<TransformProperty>) => void;
  updateGradient: (property: Partial<GradientProperty>) => void;
  updateFilter: (property: Partial<FilterProperty>) => void;
  
  // Responsive preview
  responsiveMode: ResponsiveMode;
  setResponsiveMode: (mode: ResponsiveMode) => void;
  
  // Export options
  exportFormat: ExportFormat;
  setExportFormat: (format: ExportFormat) => void;
  exportCSS: () => string;
  
  // History for undo/redo
  history: HistoryEntry[];
  historyIndex: number;
  undo: () => void;
  redo: () => void;
  
  // Reset to defaults
  resetProperties: () => void;
};

// Default CSS property values
const defaultBoxShadow: BoxShadowProperty = {
  horizontalOffset: 5,
  verticalOffset: 5,
  blurRadius: 10,
  spreadRadius: 0,
  color: 'rgba(0, 0, 0, 0.2)',
  inset: false,
};

const defaultBorderRadius: BorderRadiusProperty = {
  topLeft: 8,
  topRight: 8,
  bottomRight: 8,
  bottomLeft: 8,
  unit: 'px',
  all: true,
};

const defaultTransform: TransformProperty = {
  translateX: 0,
  translateY: 0,
  scaleX: 1,
  scaleY: 1,
  rotate: 0,
  skewX: 0,
  skewY: 0,
};

const defaultGradient: GradientProperty = {
  type: 'linear',
  angle: 90,
  stops: [
    { color: '#8B5CF6', position: 0 },
    { color: '#0EA5E9', position: 100 },
  ],
};

const defaultFilter: FilterProperty = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  hueRotate: 0,
  invert: 0,
  opacity: 100,
  saturate: 100,
  sepia: 0,
};

// Default element properties
const defaultElementProperty: ElementProperty = {
  width: 300,
  height: 200,
  backgroundColor: '#ffffff',
  color: '#333333',
  text: 'CSS Visualizer',
  fontFamily: 'sans-serif',
  fontSize: 18,
  fontWeight: '500',
  properties: [
    { type: 'boxShadow', value: defaultBoxShadow },
    { type: 'borderRadius', value: defaultBorderRadius },
    { type: 'transform', value: defaultTransform },
    { type: 'gradient', value: defaultGradient },
    { type: 'filter', value: defaultFilter },
  ],
};

const VisualizerContext = createContext<VisualizerContextType | undefined>(undefined);

export const VisualizerProvider = ({ children }: { children: ReactNode }) => {
  // Main element state
  const [elementProperty, setElementProperty] = useState<ElementProperty>(defaultElementProperty);
  
  // Responsive mode
  const [responsiveMode, setResponsiveMode] = useState<ResponsiveMode>('desktop');
  
  // Export format
  const [exportFormat, setExportFormat] = useState<ExportFormat>('css');
  
  // History for undo/redo
  const [history, setHistory] = useState<HistoryEntry[]>([
    { elementProperty: defaultElementProperty, timestamp: Date.now() }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('visualizerState');
    if (savedState) {
      try {
        const { elementProperty, responsiveMode, exportFormat } = JSON.parse(savedState);
        setElementProperty(elementProperty);
        setResponsiveMode(responsiveMode);
        setExportFormat(exportFormat);
        // Initialize history with saved state
        setHistory([{ elementProperty, timestamp: Date.now() }]);
      } catch (error) {
        console.error('Failed to parse saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('visualizerState', JSON.stringify({
      elementProperty,
      responsiveMode,
      exportFormat,
    }));
  }, [elementProperty, responsiveMode, exportFormat]);

  // Update element properties
  const updateElementProperty = (property: Partial<ElementProperty>) => {
    setElementProperty(prev => {
      const newProperty = { ...prev, ...property };
      
      // Add to history
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({
        elementProperty: newProperty,
        timestamp: Date.now(),
      });
      
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      return newProperty;
    });
  };

  // Helper function to update specific CSS properties
  const updateCSSProperty = <T extends BoxShadowProperty | BorderRadiusProperty | TransformProperty | GradientProperty | FilterProperty>(
    type: CSSProperty['type'],
    updates: Partial<T>
  ) => {
    setElementProperty(prev => {
      const properties = [...prev.properties];
      const index = properties.findIndex(p => p.type === type);
      
      if (index !== -1) {
        const property = properties[index];
        properties[index] = {
          ...property,
          value: { ...property.value, ...updates } as any,
        };
      }
      
      const newElementProperty = { ...prev, properties };
      
      // Add to history
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({
        elementProperty: newElementProperty,
        timestamp: Date.now(),
      });
      
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      return newElementProperty;
    });
  };

  // Update specific CSS properties
  const updateBoxShadow = (property: Partial<BoxShadowProperty>) => {
    updateCSSProperty<BoxShadowProperty>('boxShadow', property);
  };

  const updateBorderRadius = (property: Partial<BorderRadiusProperty>) => {
    updateCSSProperty<BorderRadiusProperty>('borderRadius', property);
  };

  const updateTransform = (property: Partial<TransformProperty>) => {
    updateCSSProperty<TransformProperty>('transform', property);
  };

  const updateGradient = (property: Partial<GradientProperty>) => {
    updateCSSProperty<GradientProperty>('gradient', property);
  };

  const updateFilter = (property: Partial<FilterProperty>) => {
    updateCSSProperty<FilterProperty>('filter', property);
  };

  // History navigation
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setElementProperty(history[historyIndex - 1].elementProperty);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setElementProperty(history[historyIndex + 1].elementProperty);
    }
  };

  // Reset to default values
  const resetProperties = () => {
    setElementProperty(defaultElementProperty);
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({
      elementProperty: defaultElementProperty,
      timestamp: Date.now(),
    });
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Generate CSS code for export
  const exportCSS = (): string => {
    const boxShadow = elementProperty.properties.find(p => p.type === 'boxShadow')?.value as BoxShadowProperty;
    const borderRadius = elementProperty.properties.find(p => p.type === 'borderRadius')?.value as BorderRadiusProperty;
    const transform = elementProperty.properties.find(p => p.type === 'transform')?.value as TransformProperty;
    const gradient = elementProperty.properties.find(p => p.type === 'gradient')?.value as GradientProperty;
    const filter = elementProperty.properties.find(p => p.type === 'filter')?.value as FilterProperty;

    // Generate box-shadow CSS
    const boxShadowCSS = boxShadow ? 
      `box-shadow: ${boxShadow.inset ? 'inset ' : ''}${boxShadow.horizontalOffset}px ${boxShadow.verticalOffset}px ${boxShadow.blurRadius}px ${boxShadow.spreadRadius}px ${boxShadow.color};` 
      : '';

    // Generate border-radius CSS
    let borderRadiusCSS = '';
    if (borderRadius) {
      if (borderRadius.all) {
        borderRadiusCSS = `border-radius: ${borderRadius.topLeft}${borderRadius.unit};`;
      } else {
        borderRadiusCSS = `border-radius: ${borderRadius.topLeft}${borderRadius.unit} ${borderRadius.topRight}${borderRadius.unit} ${borderRadius.bottomRight}${borderRadius.unit} ${borderRadius.bottomLeft}${borderRadius.unit};`;
      }
    }

    // Generate transform CSS
    let transformCSS = '';
    if (transform) {
      const transformParts = [
        transform.translateX !== 0 || transform.translateY !== 0 ? `translate(${transform.translateX}px, ${transform.translateY}px)` : '',
        transform.scaleX !== 1 || transform.scaleY !== 1 ? `scale(${transform.scaleX}, ${transform.scaleY})` : '',
        transform.rotate !== 0 ? `rotate(${transform.rotate}deg)` : '',
        transform.skewX !== 0 ? `skewX(${transform.skewX}deg)` : '',
        transform.skewY !== 0 ? `skewY(${transform.skewY}deg)` : '',
      ].filter(Boolean).join(' ');
      
      if (transformParts) {
        transformCSS = `transform: ${transformParts};`;
      }
    }

    // Generate gradient CSS
    let gradientCSS = '';
    if (gradient) {
      const stops = gradient.stops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
      
      if (gradient.type === 'linear') {
        gradientCSS = `background: linear-gradient(${gradient.angle}deg, ${stops});`;
      } else if (gradient.type === 'radial') {
        gradientCSS = `background: radial-gradient(circle, ${stops});`;
      } else if (gradient.type === 'conic') {
        gradientCSS = `background: conic-gradient(from ${gradient.angle}deg, ${stops});`;
      }
    }

    // Generate filter CSS
    let filterCSS = '';
    if (filter) {
      const filterParts = [
        filter.blur > 0 ? `blur(${filter.blur}px)` : '',
        filter.brightness !== 100 ? `brightness(${filter.brightness}%)` : '',
        filter.contrast !== 100 ? `contrast(${filter.contrast}%)` : '',
        filter.grayscale > 0 ? `grayscale(${filter.grayscale}%)` : '',
        filter.hueRotate !== 0 ? `hue-rotate(${filter.hueRotate}deg)` : '',
        filter.invert > 0 ? `invert(${filter.invert}%)` : '',
        filter.opacity !== 100 ? `opacity(${filter.opacity}%)` : '',
        filter.saturate !== 100 ? `saturate(${filter.saturate}%)` : '',
        filter.sepia > 0 ? `sepia(${filter.sepia}%)` : '',
      ].filter(Boolean).join(' ');
      
      if (filterParts) {
        filterCSS = `filter: ${filterParts};`;
      }
    }

    // Combine all CSS properties
    const css = [
      `width: ${elementProperty.width}px;`,
      `height: ${elementProperty.height}px;`,
      `background-color: ${elementProperty.backgroundColor};`,
      `color: ${elementProperty.color};`,
      `font-family: ${elementProperty.fontFamily};`,
      `font-size: ${elementProperty.fontSize}px;`,
      `font-weight: ${elementProperty.fontWeight};`,
      boxShadowCSS,
      borderRadiusCSS,
      transformCSS,
      gradientCSS,
      filterCSS,
    ].filter(Boolean).join('\n');

    // Format based on export preference
    if (exportFormat === 'css') {
      return `.element {\n  ${css.replace(/\n/g, '\n  ')}\n}`;
    } else if (exportFormat === 'tailwind') {
      // This is a simplified conversion - a real implementation would need more complex mapping
      return '<!-- This is a simplified Tailwind conversion -->\n<div class="w-[300px] h-[200px] bg-white text-gray-800 rounded shadow-lg transform ..."></div>';
    } else if (exportFormat === 'scss') {
      return `.element {\n  ${css.replace(/\n/g, '\n  ')}\n  
  &:hover {\n    // Add hover styles here\n  }\n}`;
    }
    
    return css;
  };

  return (
    <VisualizerContext.Provider value={{
      elementProperty,
      updateElementProperty,
      updateBoxShadow,
      updateBorderRadius,
      updateTransform,
      updateGradient,
      updateFilter,
      responsiveMode,
      setResponsiveMode,
      exportFormat,
      setExportFormat,
      exportCSS,
      history,
      historyIndex,
      undo,
      redo,
      resetProperties,
    }}>
      {children}
    </VisualizerContext.Provider>
  );
};

export const useVisualizer = (): VisualizerContextType => {
  const context = useContext(VisualizerContext);
  if (context === undefined) {
    throw new Error('useVisualizer must be used within a VisualizerProvider');
  }
  return context;
};
