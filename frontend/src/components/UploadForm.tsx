import { useState, useEffect } from "react";
import FileUploadZone from "./FileUploadZone";
import ConversionButton from "./ConversionButton";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { uploadVideoToS3 } from "../api/api";

const UploadForm = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      const duration = 120000; // 2 minutes
      const intervalMs = 1000;
      const steps = duration / intervalMs;
      const increment = 100 / steps;

      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + increment;
          if (next >= 100) {
            clearInterval(interval);
            navigate('/previewVideo');
            console.log('Conversion complete! Redirecting to preview...');
          }
          return next;
        });
      }, intervalMs);

      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleFileSelect = (file: File | null) => {
    setVideoFile(file);
  };

  async function handleFileUpload() {
    if (!videoFile) return;

    const formData = new FormData();
    formData.append("file", videoFile);

    try {
      
      const data = await uploadVideoToS3(formData);
      console.log("Final Data",data)
      console.log("Upload successful!");
      setLoading(true); // start progress
    } catch (err) {
      console.error("Upload failed", err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Section */}
        <div className="px-6 py-12">
          <Header />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Upload Section */}
            <div className="bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 mb-8">
              <FileUploadZone
                onFileSelect={handleFileSelect}
                selectedFile={videoFile}
                disabled={loading}
              />
            </div>

            {/* Conversion Section */}
            <div className="bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 mb-8">
              <ConversionButton
                onClick={handleFileUpload}
                hasFile={!!videoFile}
                loading={loading}
                disabled={loading}
              />
            </div>

            {/* Progress Section */}
            {loading && (
              <div className="bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
                <div className="max-w-2xl mx-auto">
                  <ProgressBar value={progress} showLabel />
                  
                  {/* Additional Progress Info */}
                  <div className="mt-6 text-center">
                    <p className="text-gray-400 mb-2">
                      Converting your video to HLS format with multiple quality levels
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                      <span>• 720p</span>
                      <span>• 1080p</span>
                      <span>• Adaptive bitrate</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Info Section */}
            {!loading && (
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Fast Processing</h3>
                  <p className="text-gray-400 text-sm">Quick conversion with optimized encoding</p>
                </div>

                <div className="bg-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 text-center">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Multiple Qualities</h3>
                  <p className="text-gray-400 text-sm">Adaptive streaming for all devices</p>
                </div>

                <div className="bg-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Secure & Reliable</h3>
                  <p className="text-gray-400 text-sm">Enterprise-grade conversion process</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;