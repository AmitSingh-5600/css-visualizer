
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useVisualizer } from '@/context/VisualizerContext';
import { ExportFormat } from '@/types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '@/context/ThemeContext';
import copy from 'copy-to-clipboard';
import { Check, Copy, Code, ChevronUp, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

interface CodePanelProps {
  className?: string;
}

const CodePanel: React.FC<CodePanelProps> = ({ className }) => {
  const { exportCSS, exportFormat, setExportFormat } = useVisualizer();
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isMobile = useIsMobile();

  const handleCopyCode = () => {
    copy(exportCSS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatOptions: { value: ExportFormat; label: string }[] = [
    { value: 'css', label: 'CSS' },
    { value: 'tailwind', label: 'Tailwind' },
    { value: 'scss', label: 'SCSS' },
  ];

  return (
    <Card className={`code-panel ${className || ''}`}>
      <div className="bg-gray-800 text-white p-3 flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4" />
          <span className="font-medium">Generated Code</span>
        </div>
        
        <div className="flex items-center gap-2">
          {expanded && !isMobile && (
            <div className="bg-gray-700 rounded-md p-1 flex">
              {formatOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    setExportFormat(option.value);
                  }}
                  className={`px-2 py-1 text-xs rounded ${
                    exportFormat === option.value 
                      ? 'bg-visualizer-purple text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
          
          {expanded && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                handleCopyCode();
              }}
              className="p-1.5 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
              whileTap={{ scale: 0.95 }}
              title="Copy code"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </motion.button>
          )}
          
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </div>
      
      {expanded && (
        <CardContent className="p-0">
          {isMobile && (
            <div className="bg-gray-700 rounded-md p-1 flex justify-center my-2 mx-2">
              {formatOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setExportFormat(option.value)}
                  className={`px-3 py-1 text-xs rounded ${
                    exportFormat === option.value 
                      ? 'bg-visualizer-purple text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
          <div className="overflow-auto max-h-[300px] md:max-h-[200px]">
            <SyntaxHighlighter
              language={exportFormat === 'tailwind' ? 'html' : 'css'}
              style={theme === 'dark' ? vscDarkPlus : prism}
              customStyle={{
                margin: 0,
                padding: '1rem',
                borderRadius: 0,
                backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f5f5f5',
                fontSize: isMobile ? '12px' : '14px',
              }}
            >
              {exportCSS()}
            </SyntaxHighlighter>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default CodePanel;
