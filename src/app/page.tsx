"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Leaf, Microscope, Pill, History } from "lucide-react";
import { ImagePreview } from "@/components/ImagePreview";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
      clearInterval(progressInterval);
    }
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Upload Section */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Upload Plant Image
            </CardTitle>
            <CardDescription>
              Upload a clear image of your plant for disease analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-upload">Plant Image</Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={isAnalyzing}
              />
            </div>

            {selectedFile && (
              <ImagePreview file={selectedFile} onRemove={handleRemoveFile} />
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Microscope className="h-5 w-5 mr-2" />
                    Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Detected Disease:</span>
                    <Badge variant="secondary">{results.disease}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Confidence:</span>
                    <Badge variant={results.confidence > 80 ? "default" : "secondary"}>
                      {results.confidence}%
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Severity:</span>
                    <Badge variant={
                      results.severity === "High" ? "destructive" : 
                      results.severity === "Moderate" ? "secondary" : "default"
                    }>
                      {results.severity}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Pill className="h-5 w-5 mr-2" />
                    Treatment Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Immediate Actions:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {results.treatments.map((treatment: string, index: number) => (
                          <li key={index}>{treatment}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Prevention Tips:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {results.prevention.map((tip: string, index: number) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
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
                <p className="text-gray-500 text-center py-8">
                  Upload an image and click "Analyze Plant" to see results here
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Microscope className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Disease Detection</h3>
                <p className="text-sm text-gray-600">
                  Identify bacteria, fungi, viruses, and nutrient deficiencies
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
        </div>
      </div>
    </div>
  );
}
