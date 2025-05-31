import React from 'react';
import { Loader2, CheckCircle } from 'lucide-react';

interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, showLabel = false }) => {
  const isComplete = value >= 100;
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className="w-full">
      {/* Progress Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {isComplete ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : (
            <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
          )}
          <span className="text-white font-medium">
            {isComplete ? 'Conversion Complete!' : 'Converting to HLS...'}
          </span>
        </div>
        {showLabel && (
          <span className="text-purple-400 font-semibold">
            {Math.round(clampedValue)}%
          </span>
        )}
      </div>

      {/* Progress Bar Container */}
      <div className="relative w-full h-3 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/50">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></div>
        
        {/* Progress Fill */}
        <div 
          className="relative h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${clampedValue}%` }}
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>

        {/* Moving Highlight */}
        {!isComplete && (
          <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        )}
      </div>

      {/* Processing Steps */}
      {!isComplete && (
        <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span>Analyzing video</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-300"></div>
            <span>Encoding streams</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
            <span>Generating manifest</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;