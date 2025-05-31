import { Play, Zap } from 'lucide-react';

const Header = () => (
  <div className="text-center mb-12">
    {/* Logo and Brand */}
    <div className="flex items-center justify-center space-x-3 mb-6">
      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
        <Play className="w-7 h-7 text-white" />
      </div>
      <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        StreamFlow
      </span>
    </div>

    {/* Status Badge */}
    <div className="inline-flex items-center space-x-2 bg-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/30 mb-8">
      <Zap className="w-4 h-4 text-purple-400" />
      <span className="text-sm text-purple-100">HLS Conversion Engine</span>
    </div>

    {/* Main Title */}
    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
      Convert to 
      <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
        HLS Streams
      </span>
    </h1>

    {/* Subtitle */}
    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
      Transform your video files into professional HLS streams with adaptive bitrate streaming
    </p>
  </div>
);

export default Header;