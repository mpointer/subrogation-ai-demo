import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, ExternalLink, FileText } from 'lucide-react';

interface DocumentViewerProps {
  documentUrl: string;
  title: string;
  onClose: () => void;
  extractedText?: string;
  highlights?: Array<{
    text: string;
    start: number;
    end: number;
    type: 'liability_signal' | 'accident_description' | 'coordination_benefit';
    confidence: number;
  }>;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  documentUrl,
  title,
  onClose,
  extractedText,
  highlights
}) => {
  const [viewMode, setViewMode] = useState<'pdf' | 'text'>('pdf');
  const [isLoading, setIsLoading] = useState(true);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = documentUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExternalView = () => {
    window.open(documentUrl, '_blank');
  };

  const highlightText = (text: string) => {
    if (!highlights || highlights.length === 0) return text;
    
    let highlightedText = text;
    const sortedHighlights = [...highlights].sort((a, b) => b.start - a.start);
    
    sortedHighlights.forEach((highlight) => {
      const before = highlightedText.slice(0, highlight.start);
      const highlighted = highlightedText.slice(highlight.start, highlight.end);
      const after = highlightedText.slice(highlight.end);
      
      const confidenceColor = highlight.confidence > 80 ? 'bg-red-200 text-red-800' : 
                             highlight.confidence > 60 ? 'bg-yellow-200 text-yellow-800' :
                             'bg-blue-200 text-blue-800';
      
      highlightedText = before + 
        `<span class="px-1 rounded font-semibold ${confidenceColor}" title="Confidence: ${highlight.confidence}% - ${highlight.type}">${highlighted}</span>` + 
        after;
    });
    
    return highlightedText;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-500" size={24} />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Document Viewer</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('pdf')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'pdf' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                PDF View
              </button>
              <button
                onClick={() => setViewMode('text')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'text' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Text View
              </button>
            </div>
            
            <button
              onClick={handleDownload}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Download PDF"
            >
              <Download size={18} />
            </button>
            
            <button
              onClick={handleExternalView}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Open in new tab"
            >
              <ExternalLink size={18} />
            </button>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {viewMode === 'pdf' ? (
            <div className="h-full w-full relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300">Loading PDF...</p>
                  </div>
                </div>
              )}
              <iframe
                src={documentUrl}
                className="w-full h-full border-0"
                title={title}
                onLoad={() => setIsLoading(false)}
                style={{ minHeight: '500px' }}
              />
            </div>
          ) : (
            <div className="h-full overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Extracted Text with AI Highlights
                </h3>
                
                {extractedText ? (
                  <div 
                    className="prose prose-sm max-w-none text-gray-800 dark:text-gray-200 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlightText(extractedText) }}
                  />
                ) : (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No extracted text available for this document.</p>
                    <p className="text-sm">OCR processing may still be in progress.</p>
                  </div>
                )}
                
                {highlights && highlights.length > 0 && (
                  <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">AI Detection Summary</h4>
                    <div className="space-y-2">
                      {highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={`w-3 h-3 rounded-full mt-1 ${
                            highlight.confidence > 80 ? 'bg-red-500' :
                            highlight.confidence > 60 ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              "{highlight.text}"
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {highlight.type.replace('_', ' ')} • Confidence: {highlight.confidence}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DocumentViewer;