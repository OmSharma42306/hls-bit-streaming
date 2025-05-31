import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Zap, 
  Users, 
  Globe, 
  Shield, 
  Smartphone, 
  Monitor, 
  Wifi, 
  Clock,
  Star,
  ArrowRight,
  Menu,
  X,
  CheckCircle
} from 'lucide-react';
import AuthPages from '../auth/Auth';
import { useNavigate } from 'react-router-dom';

export default function StreamingLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const navigate = useNavigate()

  const features = [
    { icon: Zap, title: "Ultra-Low Latency", desc: "Stream with minimal delay" },
    { icon: Shield, title: "Secure Streaming", desc: "Enterprise-grade protection" },
    { icon: Globe, title: "Global CDN", desc: "Worldwide content delivery" },
    { icon: Smartphone, title: "Multi-Platform", desc: "Works on any device" }
  ];

  const stats = [
    { number: "10M+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "150+", label: "Countries" },
    { number: "<100ms", label: "Latency" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              StreamFlow
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
            <a href="#docs" className="hover:text-purple-400 transition-colors">Docs</a>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105" onClick={()=>{navigate("/auth")}}>
              Get Started
            </button>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg p-6 space-y-4">
            <a href="#features" className="block hover:text-purple-400 transition-colors">Features</a>
            <a href="#pricing" className="block hover:text-purple-400 transition-colors">Pricing</a>
            <a href="#docs" className="block hover:text-purple-400 transition-colors">Docs</a>
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full">
              Get Started
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/30 mb-8">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm">Now with adaptive bitrate streaming</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Stream Without
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Limits
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Professional HLS streaming platform that delivers crystal-clear video 
            to millions of viewers worldwide with ultra-low latency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Start Streaming</span>
            </button>
            <button className="border border-purple-500/50 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-500/10 transition-all flex items-center justify-center space-x-2">
              <Monitor className="w-5 h-5" />
              <span>View Demo</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Feature Preview */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-slate-800/50 to-purple-800/30 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">
                  Experience Next-Gen Streaming
                </h3>
                <div className="space-y-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={index}
                        className={`flex items-center space-x-4 p-4 rounded-xl transition-all cursor-pointer ${
                          currentFeature === index 
                            ? 'bg-purple-500/20 border border-purple-500/30' 
                            : 'hover:bg-slate-700/30'
                        }`}
                        onClick={() => setCurrentFeature(index)}
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{feature.title}</h4>
                          <p className="text-gray-400 text-sm">{feature.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl flex items-center justify-center border border-purple-500/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Play className="w-10 h-10 text-purple-400" />
                    </div>
                    <p className="text-gray-400">Live Stream Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built for Scale
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Enterprise-grade streaming infrastructure that grows with your audience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Wifi, title: "Adaptive Streaming", desc: "Automatic quality adjustment based on network conditions" },
              { icon: Clock, title: "Real-time Analytics", desc: "Monitor performance and viewer engagement in real-time" },
              { icon: Users, title: "Concurrent Viewers", desc: "Support millions of simultaneous viewers" },
              { icon: Shield, title: "DRM Protection", desc: "Advanced content protection and security" },
              { icon: Globe, title: "Global CDN", desc: "Worldwide content delivery network" },
              { icon: Smartphone, title: "Cross-Platform", desc: "Works seamlessly across all devices" }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group p-8 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Streaming?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of creators and businesses streaming with our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-purple-500/50 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-500/10 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              StreamFlow
            </span>
          </div>
          <p className="text-gray-400">
            © 2025 StreamFlow. All rights reserved. Built for the future of streaming.
          </p>
        </div>
      </footer>
    </div>
  );
}