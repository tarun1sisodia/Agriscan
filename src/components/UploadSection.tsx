"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Camera, History, Microscope, Leaf } from "lucide-react";
import { ImagePreview } from "@/components/ImagePreview";

interface UploadSectionProps {
  selectedFile: File | null;
  isAnalyzing: boolean;
  analysisProgress: number;
  error: string | null;
  onFileSelect: (file: File) => void;
  onRemoveFile: () => void;
  onAnalyze: () => void;
}

export default function UploadSection({
  selectedFile,
  isAnalyzing,
  analysisProgress,
  error,
  onFileSelect,
  onRemoveFile,
  onAnalyze
}: UploadSectionProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'camera' | 'gallery'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sampleImages = [
    { name: "Tomato Blight", severity: "High", confidence: 94, image: "/sample1.jpg" },
    { name: "Corn Rust", severity: "Moderate", confidence: 87, image: "/sample2.jpg" },
    { name: "Wheat Powdery Mildew", severity: "Low", confidence: 92, image: "/sample3.jpg" },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
            onFileSelect(file);
          }
        }, 'image/jpeg');
      }
    }
  };

  const handleSampleImageClick = (sample: any) => {
    onFileSelect(new File([], sample.name));
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-3xl blur-xl"></div>
      <Card className="relative bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center text-2xl font-bold text-gray-800">
            <div className="relative mr-3">
              <Upload className="h-6 w-6 text-green-600" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            Analyze Plant Image
          </CardTitle>
          <CardDescription className="text-gray-600 text-base">
            Choose your preferred method to analyze plant images with our advanced AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enhanced Tab Navigation */}
          <div className="relative">
            <div className="flex bg-gradient-to-r from-gray-50 to-gray-100 p-2 rounded-2xl shadow-inner">
              <Button
                variant={activeTab === 'upload' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 rounded-xl transition-all duration-300 ${
                  activeTab === 'upload' 
                    ? 'bg-white shadow-lg text-green-700 border-green-200' 
                    : 'hover:bg-white/50 text-gray-600'
                }`}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button
                variant={activeTab === 'camera' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('camera')}
                className={`flex-1 rounded-xl transition-all duration-300 ${
                  activeTab === 'camera' 
                    ? 'bg-white shadow-lg text-blue-700 border-blue-200' 
                    : 'hover:bg-white/50 text-gray-600'
                }`}
              >
                <Camera className="h-4 w-4 mr-2" />
                Camera
              </Button>
              <Button
                variant={activeTab === 'gallery' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('gallery')}
                className={`flex-1 rounded-xl transition-all duration-300 ${
                  activeTab === 'gallery' 
                    ? 'bg-white shadow-lg text-purple-700 border-purple-200' 
                    : 'hover:bg-white/50 text-gray-600'
                }`}
              >
                <History className="h-4 w-4 mr-2" />
                Samples
              </Button>
            </div>
          </div>

          {/* Enhanced Upload Tab */}
          {activeTab === 'upload' && (
            <div className="space-y-6">
              <div className="relative">
                <div className="border-2 border-dashed border-green-300 rounded-2xl p-8 text-center hover:border-green-400 transition-colors duration-300 bg-gradient-to-br from-green-50/50 to-blue-50/50">
                  <div className="relative mb-4">
                    <Upload className="h-12 w-12 text-green-500 mx-auto" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Plant Image</h3>
                  <p className="text-gray-600 mb-4">Drag and drop your image here, or click to browse</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isAnalyzing}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                    <Button
                      variant="outline"
                      className="border-2 border-green-200 hover:border-green-300 text-green-700 hover:text-green-800 px-6 py-2 rounded-xl transition-all duration-300"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    Supports: JPG, PNG, WebP (Max 10MB)
                  </p>
                </div>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={isAnalyzing}
                  ref={fileInputRef}
                  className="hidden"
                />
              </div>

              {selectedFile && (
                <div className="animate-in slide-in-from-bottom-2 duration-300">
                  <ImagePreview file={selectedFile} onRemove={onRemoveFile} />
                </div>
              )}
            </div>
          )}

          {/* Camera Tab */}
          {activeTab === 'camera' && (
            <div className="space-y-4">
              <div className="relative">
                <video
                  ref={videoRef}
                  className="w-full h-64 bg-gray-100 rounded-lg object-cover"
                  autoPlay
                  playsInline
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={handleCameraCapture}
                  variant="outline"
                  className="flex-1"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Start Camera
                </Button>
                <Button
                  onClick={capturePhoto}
                  variant="outline"
                  className="flex-1"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Capture
                </Button>
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Try with sample images:</p>
              <div className="grid grid-cols-1 gap-3">
                {sampleImages.map((sample, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSampleImageClick(sample)}
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{sample.name}</div>
                      <div className="text-sm text-gray-500">
                        Confidence: {sample.confidence}% | Severity: {sample.severity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Button 
              onClick={onAnalyze}
              disabled={!selectedFile || isAnalyzing}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
              size="lg"
            >
              <div className="flex items-center justify-center">
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Analyzing Plant...
                  </>
                ) : (
                  <>
                    <Microscope className="h-5 w-5 mr-3" />
                    Analyze Plant
                  </>
                )}
              </div>
            </Button>

            {isAnalyzing && (
              <div className="space-y-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Processing image...</span>
                  <span className="text-sm font-bold text-green-600">{analysisProgress}%</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${analysisProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Uploading</span>
                    <span>Analyzing</span>
                    <span>Processing</span>
                    <span>Complete</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
