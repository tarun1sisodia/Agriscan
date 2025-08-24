"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Leaf, Microscope, Pill, History, Camera, BarChart3, Users, Globe, Zap, Shield, Database, Cloud, Target, TrendingUp, Award, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { ImagePreview } from "@/components/ImagePreview";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
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
      setSelectedFile(file);
      setError(null);
      setResults(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError(null);
    setResults(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setError(null);

    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result = await response.json();
      setResults(result.data.analysis);
      setAnalysisProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
      clearInterval(progressInterval);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Leaf className="h-8 w-8 text-green-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                AgriScan
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                <Users className="h-4 w-4 mr-2" />
                About
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                <Shield className="h-4 w-4 mr-2" />
                Features
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                <Globe className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Upload Section */}
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
                        <ImagePreview file={selectedFile} onRemove={handleRemoveFile} />
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  <Button 
                    onClick={handleAnalyze}
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

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <>
                {/* Main Analysis Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Microscope className="h-5 w-5 mr-2" />
                      Disease Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Disease Detection */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Detected Disease:</span>
                        <Badge variant="secondary" className="text-sm px-3 py-1">{results.disease}</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Confidence Score:</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${results.confidence}%` }}
                            ></div>
                          </div>
                          <Badge variant={results.confidence > 80 ? "default" : "secondary"}>
                            {results.confidence}%
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Severity Level:</span>
                        <Badge variant={
                          results.severity === "High" ? "destructive" : 
                          results.severity === "Moderate" ? "secondary" : "default"
                        }>
                          {results.severity}
                        </Badge>
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
                        Risk Assessment
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <div className="text-lg font-bold text-red-600">High</div>
                          <div className="text-xs text-gray-600">Crop Loss Risk</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <div className="text-lg font-bold text-yellow-600">Medium</div>
                          <div className="text-xs text-gray-600">Spread Risk</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">Low</div>
                          <div className="text-xs text-gray-600">Recovery Time</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Treatment Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Pill className="h-5 w-5 mr-2" />
                      Treatment & Prevention Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Immediate Actions */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center text-red-600">
                          <Clock className="h-4 w-4 mr-2" />
                          Immediate Actions (Next 24-48 hours)
                        </h4>
                        <div className="space-y-2">
                          {results.treatments.map((treatment: string, index: number) => (
                            <div key={index} className="flex items-start space-x-2 p-2 bg-red-50 rounded">
                              <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{treatment}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Prevention Strategy */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center text-blue-600">
                          <Shield className="h-4 w-4 mr-2" />
                          Prevention Strategy
                        </h4>
                        <div className="space-y-2">
                          {results.prevention.map((tip: string, index: number) => (
                            <div key={index} className="flex items-start space-x-2 p-2 bg-blue-50 rounded">
                              <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{tip}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Treatment Timeline */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center text-green-600">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Expected Recovery Timeline
                        </h4>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="p-3 bg-green-50 rounded">
                            <div className="text-lg font-bold text-green-600">1-2 weeks</div>
                            <div className="text-xs text-gray-600">Initial improvement</div>
                          </div>
                          <div className="p-3 bg-yellow-50 rounded">
                            <div className="text-lg font-bold text-yellow-600">3-4 weeks</div>
                            <div className="text-xs text-gray-600">Significant recovery</div>
                          </div>
                          <div className="p-3 bg-blue-50 rounded">
                            <div className="text-lg font-bold text-blue-600">6-8 weeks</div>
                            <div className="text-xs text-gray-600">Full recovery</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <History className="h-5 w-5 mr-2" />
                    Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Microscope className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">No analysis results yet</p>
                    <p className="text-sm text-gray-400">
                      Upload an image and click "Analyze Plant" to see detailed results here
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Microscope className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Disease Detection</h3>
                  <p className="text-sm text-gray-600">
                    Identify bacteria, fungi, viruses, and nutrient deficiencies with 95% accuracy
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Pill className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Treatment Guide</h3>
                  <p className="text-sm text-gray-600">
                    Get personalized treatment recommendations and prevention tips
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Leaf className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Crop Health</h3>
                  <p className="text-sm text-gray-600">
                    Monitor plant health and track improvements over time
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Camera className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Real-time Capture</h3>
                  <p className="text-sm text-gray-600">
                    Use your camera to instantly analyze plants in the field
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technology Stack Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Powered by Advanced Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">AI & Machine Learning</h3>
                  <p className="text-sm text-gray-600">
                    Advanced neural networks trained on millions of plant images
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Cloud className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Cloud Processing</h3>
                  <p className="text-sm text-gray-600">
                    Scalable cloud infrastructure for fast and reliable analysis
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Secure & Private</h3>
                  <p className="text-sm text-gray-600">
                    Enterprise-grade security with data privacy protection
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Protect Your Crops?</h2>
              <p className="text-gray-600 mb-6">
                Join thousands of farmers who trust AgriScan for accurate disease detection and treatment recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Start Analyzing
                </Button>
                <Button variant="outline" size="lg">
                  <Users className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
