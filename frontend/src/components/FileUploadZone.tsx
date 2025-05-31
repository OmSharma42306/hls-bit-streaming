import React, { useState, useRef } from 'react';
import { Upload, FileVideo, X, CheckCircle, AlertCircle } from 'lucide-react';

interface FileUploadZoneProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  disabled?: boolean;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ 
  onFileSelect, 
  selectedFile, 
  disabled = false 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedFormats = ['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv'];
  const maxSize = 500 * 1024 * 1024; // 500MB

  const validateFile = (file: File): boolean => {
    setError('');
    
    // Check file type
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !acceptedFormats.includes(extension)) {
      setError(`Please select a valid video file (${acceptedFormats.join(', ')})`);
      return false;
    }

    // Check file size
    if (file.size > maxSize) {
      setError('File size must be less than 500MB');
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    } else if (file) {
      onFileSelect(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    } else if (file) {
      onFileSelect(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeFile = () => {
    onFileSelect(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
          isDragOver
            ? 'border-purple-400 bg-purple-500/10 scale-105'
            : selectedFile
            ? 'border-green-500/50 bg-green-500/5'
            : error
            ? 'border-red-500/50 bg-red-500/5'
            : 'border-slate-600 bg-slate-800/30 hover:border-purple-500/50 hover:bg-slate-700/30'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />

        {selectedFile ? (
          // Selected File Display
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">File Selected</h3>
            <div className="bg-slate-900/50 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileVideo className="w-5 h-5 text-purple-400" />
                  <div className="text-left">
                    <p className="text-white font-medium truncate max-w-xs">
                      {selectedFile.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  disabled={disabled}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Click to select a different file or drag and drop
            </p>
          </div>
        ) : (
          // Upload Instructions
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              error 
                ? 'bg-red-500/20' 
                : isDragOver 
                ? 'bg-purple-500/20' 
                : 'bg-slate-700/50'
            }`}>
              {error ? (
                <AlertCircle className="w-8 h-8 text-red-400" />
              ) : (
                <Upload className={`w-8 h-8 ${
                  isDragOver ? 'text-purple-400' : 'text-gray-400'
                }`} />
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">
              {error ? 'Upload Error' : 'Upload Your Video'}
            </h3>
            
            <p className={`mb-4 ${error ? 'text-red-400' : 'text-gray-400'}`}>
              {error || 'Drag and drop your video file here, or click to browse'}
            </p>
            
            {!error && (
              <div className="space-y-2 text-sm text-gray-500">
                <p>Supported formats: {acceptedFormats.join(', ').toUpperCase()}</p>
                <p>Maximum file size: 500MB</p>
              </div>
            )}
          </div>
        )}

        {/* Drag Overlay */}
        {isDragOver && !disabled && (
          <div className="absolute inset-0 bg-purple-500/10 border-2 border-purple-400 border-dashed rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <Upload className="w-12 h-12 text-purple-400 mx-auto mb-2" />
              <p className="text-purple-400 font-semibold">Drop your video here</p>
            </div>
          </div>
        )}
      </div>

      {/* Format Info */}
      <div className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
        <h4 className="text-white font-medium mb-2 flex items-center space-x-2">
          <FileVideo className="w-4 h-4 text-purple-400" />
          <span>HLS Conversion Features</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
          <div>• Adaptive bitrate streaming</div>
          <div>• Multiple quality levels</div>
          <div>• Cross-platform compatibility</div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;