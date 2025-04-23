
// CSS Property Types
export type BoxShadowProperty = {
  horizontalOffset: number;
  verticalOffset: number;
  blurRadius: number;
  spreadRadius: number;
  color: string;
  inset: boolean;
};

export type BorderRadiusProperty = {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  unit: 'px' | '%' | 'em' | 'rem';
  all: boolean;
};

export type TransformProperty = {
  translateX: number;
  translateY: number;
  scaleX: number;
  scaleY: number;
  rotate: number;
  skewX: number;
  skewY: number;
};

export type GradientProperty = {
  type: 'linear' | 'radial' | 'conic';
  angle: number;
  stops: Array<{
    color: string;
    position: number;
  }>;
};

export type FilterProperty = {
  blur: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  hueRotate: number;
  invert: number;
  opacity: number;
  saturate: number;
  sepia: number;
};

// CSS Properties Union Type
export type CSSProperty = 
  | { type: 'boxShadow'; value: BoxShadowProperty }
  | { type: 'borderRadius'; value: BorderRadiusProperty }
  | { type: 'transform'; value: TransformProperty }
  | { type: 'gradient'; value: GradientProperty }
  | { type: 'filter'; value: FilterProperty };

// Element Properties
export type ElementProperty = {
  width: number;
  height: number;
  backgroundColor: string;
  color: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  properties: CSSProperty[];
};

// Responsive Mode
export type ResponsiveMode = 'desktop' | 'tablet' | 'mobile';

// Theme Mode
export type ThemeMode = 'light' | 'dark';

// Export Config
export type ExportFormat = 'css' | 'tailwind' | 'scss';

// History State for Undo/Redo
export type HistoryEntry = {
  elementProperty: ElementProperty;
  timestamp: number;
};
