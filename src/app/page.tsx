"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Leaf, Microscope, Pill, History, Camera, BarChart3, Users, Globe, Zap, Shield, Smartphone, Database, Cloud, Target, TrendingUp, Award, Clock, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { ImagePreview } from "@/components/ImagePreview";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'camera' | 'gallery'>('upload');
  const [showStats, setShowStats] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sample images for gallery
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

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
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
            setSelectedFile(file);
            setError(null);
            setResults(null);
          }
        }, 'image/jpeg');
      }
    }
  };



  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setError(null);

    // Simulate analysis progress
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
      setShowStats(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
      clearInterval(progressInterval);
    }
  };

  const handleSampleImageClick = (sample: any) => {
    // Simulate selecting a sample image
    setSelectedFile(new File([], sample.name));
    setError(null);
    setResults(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Leaf className="h-12 w-12 text-green-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">AgriScan</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          AI-Powered Agricultural Disease Detection Platform
        </p>
        <p className="text-gray-500 mt-2">
          Upload a plant image to detect diseases, bacteria, fungi, and get treatment recommendations
        </p>
        
        {/* Quick Stats */}
        <div className="flex justify-center mt-6 space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">50K+</div>
            <div className="text-sm text-gray-500">Images Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">95%</div>
            <div className="text-sm text-gray-500">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">10K+</div>
            <div className="text-sm text-gray-500">Farmers Helped</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Upload Section */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Analyze Plant Image
            </CardTitle>
            <CardDescription>
              Choose your preferred method to analyze plant images
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <Button
                variant={activeTab === 'upload' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('upload')}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button
                variant={activeTab === 'camera' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('camera')}
                className="flex-1"
              >
                <Camera className="h-4 w-4 mr-2" />
                Camera
              </Button>
              <Button
                variant={activeTab === 'gallery' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('gallery')}
                className="flex-1"
              >
                <History className="h-4 w-4 mr-2" />
                Samples
              </Button>
            </div>

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-upload">Plant Image</Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled={isAnalyzing}
                    ref={fileInputRef}
                  />
                </div>

                {selectedFile && (
                  <ImagePreview file={selectedFile} onRemove={handleRemoveFile} />
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
                    <Target className="h-4 w-4 mr-2" />
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
                      <Badge variant={sample.severity === "High" ? "destructive" : "secondary"}>
                        {sample.severity}
                      </Badge>
                    </div>
                  ))}
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
                      <Badge variant={sample.severity === "High" ? "destructive" : "secondary"}>
                        {sample.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Plant"}
            </Button>

            {isAnalyzing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing image...</span>
                  <span>{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} className="w-full" />
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

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

               {/* Detailed Analysis */}
               <Card>
                 <CardHeader>
                   <CardTitle className="flex items-center">
                     <BarChart3 className="h-5 w-5 mr-2" />
                     Detailed Analysis
                   </CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="space-y-4">
                     {/* Disease Characteristics */}
                     <div>
                       <h4 className="font-medium mb-2 flex items-center">
                         <Leaf className="h-4 w-4 mr-2" />
                         Disease Characteristics
                       </h4>
                       <div className="grid grid-cols-2 gap-3 text-sm">
                         <div className="p-2 bg-blue-50 rounded">
                           <span className="font-medium">Type:</span> Fungal Infection
                         </div>
                         <div className="p-2 bg-blue-50 rounded">
                           <span className="font-medium">Stage:</span> Early Development
                         </div>
                         <div className="p-2 bg-blue-50 rounded">
                           <span className="font-medium">Spread Rate:</span> Moderate
                         </div>
                         <div className="p-2 bg-blue-50 rounded">
                           <span className="font-medium">Affected Area:</span> 15-20%
                         </div>
                       </div>
                     </div>

                     {/* Environmental Factors */}
                     <div>
                       <h4 className="font-medium mb-2 flex items-center">
                         <Globe className="h-4 w-4 mr-2" />
                         Environmental Factors
                       </h4>
                       <div className="grid grid-cols-2 gap-3 text-sm">
                         <div className="p-2 bg-green-50 rounded">
                           <span className="font-medium">Temperature:</span> Optimal for growth
                         </div>
                         <div className="p-2 bg-green-50 rounded">
                           <span className="font-medium">Humidity:</span> High (favorable)
                         </div>
                         <div className="p-2 bg-yellow-50 rounded">
                           <span className="font-medium">Soil pH:</span> Slightly acidic
                         </div>
                         <div className="p-2 bg-red-50 rounded">
                           <span className="font-medium">Air Circulation:</span> Poor
                         </div>
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

               {/* Technical Analysis */}
               <Card>
                 <CardHeader>
                   <CardTitle className="flex items-center">
                     <Database className="h-5 w-5 mr-2" />
                     Technical Analysis Details
                   </CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                     <div className="text-center p-3 bg-gray-50 rounded">
                       <div className="font-medium">Analysis Time</div>
                       <div className="text-gray-600">2.3 seconds</div>
                     </div>
                     <div className="text-center p-3 bg-gray-50 rounded">
                       <div className="font-medium">Model Version</div>
                       <div className="text-gray-600">v2.1.0</div>
                     </div>
                     <div className="text-center p-3 bg-gray-50 rounded">
                       <div className="font-medium">Image Quality</div>
                       <div className="text-gray-600">High (92%)</div>
                     </div>
                     <div className="text-center p-3 bg-gray-50 rounded">
                       <div className="font-medium">Processing Method</div>
                       <div className="text-gray-600">AI + Expert Review</div>
                     </div>
                     <div className="text-center p-3 bg-gray-50 rounded">
                       <div className="font-medium">Data Points Analyzed</div>
                       <div className="text-gray-600">1,247 features</div>
                     </div>
                     <div className="text-center p-3 bg-gray-50 rounded">
                       <div className="font-medium">Model Confidence</div>
                       <div className="text-gray-600">95.2%</div>
                     </div>
                     <div className="text-center p-3 bg-gray-50 rounded">
                       <div className="font-medium">Similar Cases</div>
                       <div className="text-gray-600">847 found</div>
                     </div>
                     <div className="text-center p-3 bg-gray-50 rounded">
                       <div className="font-medium">Treatment Success Rate</div>
                       <div className="text-gray-600">89%</div>
                     </div>
                   </div>
                 </CardContent>
               </Card>

                               {/* Expert Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Expert Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-medium text-blue-800 mb-1">Dr. Sarah Johnson - Plant Pathologist</h4>
                        <p className="text-sm text-gray-700">
                          "Based on the visual symptoms and environmental conditions, I recommend immediate fungicide application 
                          followed by improved air circulation. This disease responds well to early intervention."
                        </p>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-medium text-green-800 mb-1">Prof. Michael Chen - Agricultural Scientist</h4>
                        <p className="text-sm text-gray-700">
                          "Consider implementing crop rotation and soil amendment practices to prevent future outbreaks. 
                          The current treatment should be effective if applied promptly."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Disease History & Epidemiology */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <History className="h-5 w-5 mr-2" />
                      Disease History & Epidemiology
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Historical Data Analysis
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="p-2 bg-orange-50 rounded">
                            <span className="font-medium">First Reported:</span> 1892
                          </div>
                          <div className="p-2 bg-orange-50 rounded">
                            <span className="font-medium">Global Cases:</span> 2.3M/year
                          </div>
                          <div className="p-2 bg-orange-50 rounded">
                            <span className="font-medium">Seasonal Peak:</span> Spring
                          </div>
                          <div className="p-2 bg-orange-50 rounded">
                            <span className="font-medium">Geographic Spread:</span> Worldwide
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          Regional Prevalence
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                            <span className="text-sm">Southeast Asia</span>
                            <Badge variant="destructive">High Risk</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                            <span className="text-sm">North America</span>
                            <Badge variant="secondary">Moderate Risk</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                            <span className="text-sm">Europe</span>
                            <Badge variant="default">Low Risk</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Molecular Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Microscope className="h-5 w-5 mr-2" />
                      Molecular & Genetic Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <Database className="h-4 w-4 mr-2" />
                          Pathogen Identification
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="p-2 bg-purple-50 rounded">
                            <span className="font-medium">Species:</span> Phytophthora infestans
                          </div>
                          <div className="p-2 bg-purple-50 rounded">
                            <span className="font-medium">Strain:</span> US-23
                          </div>
                          <div className="p-2 bg-purple-50 rounded">
                            <span className="font-medium">Mating Type:</span> A2
                          </div>
                          <div className="p-2 bg-purple-50 rounded">
                            <span className="font-medium">Resistance:</span> Metalaxyl-resistant
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <Zap className="h-4 w-4 mr-2" />
                          Genetic Markers
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                            <span className="text-sm">SSR Locus Pi4B</span>
                            <span className="text-xs text-gray-600">Allele 123</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                            <span className="text-sm">SSR Locus Pi70</span>
                            <span className="text-xs text-gray-600">Allele 89</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                            <span className="text-sm">AFLP Marker</span>
                            <span className="text-xs text-gray-600">Present</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Treatment Efficacy Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Pill className="h-5 w-5 mr-2" />
                      Treatment Efficacy Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Recommended Treatments
                        </h4>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">Copper-based Fungicide</span>
                              <Badge variant="default">95% Efficacy</Badge>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                              Application: 2-3 sprays at 7-day intervals
                            </div>
                            <div className="flex items-center space-x-4 text-xs">
                              <span className="text-green-600">✓ Resistant strain</span>
                              <span className="text-green-600">✓ Organic approved</span>
                              <span className="text-yellow-600">⚠ Rain protection needed</span>
                            </div>
                          </div>

                          <div className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">Biological Control (Bacillus subtilis)</span>
                              <Badge variant="secondary">87% Efficacy</Badge>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                              Application: Weekly applications for 4 weeks
                            </div>
                            <div className="flex items-center space-x-4 text-xs">
                              <span className="text-green-600">✓ Environmentally safe</span>
                              <span className="text-green-600">✓ No resistance</span>
                              <span className="text-red-600">✗ Slower action</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Treatment Timeline
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3 p-2 bg-green-50 rounded">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm">Day 1-3: Initial fungicide application</span>
                          </div>
                          <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="text-sm">Day 7-10: Second application + monitoring</span>
                          </div>
                          <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">Day 14-21: Third application + prevention</span>
                          </div>
                          <div className="flex items-center space-x-3 p-2 bg-purple-50 rounded">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span className="text-sm">Day 28+: Maintenance and monitoring</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Economic Impact Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Economic Impact Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Cost-Benefit Analysis
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="text-center p-3 bg-red-50 rounded">
                            <div className="text-lg font-bold text-red-600">$2,400</div>
                            <div className="text-xs text-gray-600">Potential Loss</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded">
                            <div className="text-lg font-bold text-green-600">$180</div>
                            <div className="text-xs text-gray-600">Treatment Cost</div>
                          </div>
                          <div className="text-center p-3 bg-blue-50 rounded">
                            <div className="text-lg font-bold text-blue-600">$2,220</div>
                            <div className="text-xs text-gray-600">Net Savings</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded">
                            <div className="text-lg font-bold text-purple-600">92.5%</div>
                            <div className="text-xs text-gray-600">ROI</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <Award className="h-4 w-4 mr-2" />
                          Insurance & Risk Assessment
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                            <span className="text-sm">Crop Insurance Coverage</span>
                            <Badge variant="secondary">Available</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                            <span className="text-sm">Risk Level</span>
                            <Badge variant="default">Medium</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                            <span className="text-sm">Prevention Credit</span>
                            <Badge variant="default">Eligible</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Weather & Climate Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Cloud className="h-5 w-5 mr-2" />
                      Weather & Climate Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          Current Conditions
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="font-medium">Temperature</div>
                            <div className="text-gray-600">24°C</div>
                          </div>
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="font-medium">Humidity</div>
                            <div className="text-gray-600">78%</div>
                          </div>
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="font-medium">Rainfall</div>
                            <div className="text-gray-600">15mm</div>
                          </div>
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="font-medium">Wind Speed</div>
                            <div className="text-gray-600">8 km/h</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Disease Favorability Index
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Current Favorability</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div className="bg-red-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                              </div>
                              <span className="text-sm font-medium">75%</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-600">
                            High humidity and moderate temperatures create optimal conditions for disease development
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          7-Day Forecast
                        </h4>
                        <div className="grid grid-cols-7 gap-2 text-xs">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                            <div key={day} className="text-center p-2 bg-gray-50 rounded">
                              <div className="font-medium">{day}</div>
                              <div className="text-gray-600">{22 + index}°C</div>
                              <div className="text-gray-600">{70 + (index * 2)}%</div>
                            </div>
                          ))}
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
  );
}
