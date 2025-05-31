import React from 'react';
import { Play, Loader2, Zap, ArrowRight } from 'lucide-react';

interface ConversionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  hasFile?: boolean;
}

const ConversionButton: React.FC<ConversionButtonProps> = ({ 
  onClick, 
  disabled = false, 
  loading = false, 
  hasFile = false 
}) => {
  const isDisabled = disabled || !hasFile;

  return (
    <div className="text-center space-y-4">
      {/* Main Conversion Button */}
      <button
        onClick={onClick}
        disabled={isDisabled || loading}
        className={`group relative inline-flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
          isDisabled
            ? 'bg-slate-700/50 text-gray-500 cursor-not-allowed'
            : loading
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white cursor-wait'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25'
        }`}
      >
        {/* Button Content */}
        <div className="flex items-center space-x-3">
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
          )}
          <span>
            {loading ? 'Converting to HLS...' : 'Convert to HLS'}
          </span>
          {!loading && !isDisabled && (
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          )}
        </div>

        {/* Loading Pulse Effect */}
        {loading && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl animate-pulse opacity-50"></div>
        )}

        {/* Hover Glow Effect */}
        {!isDisabled && !loading && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        )}
      </button>

      {/* Status Message */}
      <div className="space-y-2">
        {loading ? (
          <div className="flex items-center justify-center space-x-2 text-purple-400">
            <Zap className="w-4 h-4 animate-pulse" />
            <span className="text-sm">
              Processing your video... This may take 2-3 minutes
            </span>
          </div>
        ) : !hasFile ? (
          <p className="text-gray-500 text-sm">
            Please select a video file to begin conversion
          </p>
        ) : (
          <div className="flex items-center justify-center space-x-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Ready to convert</span>
          </div>
        )}
      </div>

      {/* Conversion Info */}
      {hasFile && !loading && (
        <div className="mt-6 p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Zap className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-white font-medium">Fast Processing</p>
              <p className="text-gray-400">2-3 minutes avg</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Play className="w-4 h-4 text-pink-400" />
              </div>
              <p className="text-white font-medium">Multiple Qualities</p>
              <p className="text-gray-400">Adaptive streaming</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-white font-medium">Ready to Stream</p>
              <p className="text-gray-400">HLS compatible</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversionButton;