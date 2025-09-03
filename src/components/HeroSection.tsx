"use client";

import { Button } from "@/components/ui/button";
import { Leaf, Upload, Camera } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="text-center mb-16">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="relative flex items-center justify-center mb-6">
          <div className="relative">
            <Leaf className="h-16 w-16 text-green-600 mr-4 animate-bounce" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping"></div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            AgriScan
          </h1>
        </div>
      </div>
      
      <p className="text-2xl text-gray-700 max-w-3xl mx-auto mb-4 font-medium">
        AI-Powered Agricultural Disease Detection Platform
      </p>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
        Upload a plant image to detect diseases, bacteria, fungi, and get comprehensive treatment recommendations
      </p>
      
      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
            <div className="text-sm text-gray-600 font-medium">Images Analyzed</div>
            <div className="text-xs text-green-500 mt-1">✓ Real-time processing</div>
          </div>
        </div>
        
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-sm text-gray-600 font-medium">Accuracy Rate</div>
            <div className="text-xs text-blue-500 mt-1">✓ AI-powered detection</div>
          </div>
        </div>
        
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
            <div className="text-sm text-gray-600 font-medium">Farmers Helped</div>
            <div className="text-xs text-purple-500 mt-1">✓ Global impact</div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Upload className="h-5 w-5 mr-2" />
          Start Analyzing Now
        </Button>
        <Button variant="outline" size="lg" className="border-2 border-green-200 hover:border-green-300 text-green-700 hover:text-green-800 px-8 py-3 rounded-xl transition-all duration-300">
          <Camera className="h-5 w-5 mr-2" />
          Watch Demo
        </Button>
      </div>
    </div>
  );
}
