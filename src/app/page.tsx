"use client";

import { useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import ResultsSection from "@/components/ResultsSection";
import AdvancedAnalysis from "@/components/AdvancedAnalysis";
import ExpertRecommendations from "@/components/ExpertRecommendations";
import FeaturesSection from "@/components/FeaturesSection";
import StatsDashboard from "@/components/StatsDashboard";
import CallToAction from "@/components/CallToAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Microscope, Database, Users, TrendingUp, History } from "lucide-react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
 interface HomeResults {
  disease: string;
  confidence: number;
  severity: string;
  treatments: string[];
  prevention: string[];
}

    const [results, setResults] = useState<HomeResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'basic' | 'advanced' | 'expert' | 'stats'>('basic');

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError(null);
    setResults(null);
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

    // This simulates a smooth progress bar
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

      const result = await response.json();

      if (!response.ok) {
        // Updated to get the nested error message for better feedback
        throw new Error(result.error?.message || 'Analysis failed');
      }

      // Check if the expected 'analysis' key exists
      if (result.analysis) {
        // FIX IS HERE: Access result.analysis directly
        setResults(result.analysis);
        
        setAnalysisProgress(100);
      } 
      else {
        // Handle cases where the response is successful but data is missing
        throw new Error('Received an invalid response from the server.');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred. Please try again.");
      setAnalysisProgress(0); // Reset progress on error
    } finally {
      setIsAnalyzing(false);
      clearInterval(progressInterval);
    }
  };

  const renderAnalysisContent = () => {
    if (!results) {
      return (
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
                Upload an image and click &quot;Analyze Plant&quot; to see detailed results here
              </p>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        {/* Analysis Tab Navigation */}
        <div className="flex bg-gradient-to-r from-gray-50 to-gray-100 p-2 rounded-2xl shadow-inner">
          <Button
            variant={activeAnalysisTab === 'basic' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveAnalysisTab('basic')}
            className={`flex-1 rounded-xl transition-all duration-300 ${
              activeAnalysisTab === 'basic' 
                ? 'bg-white shadow-lg text-green-700 border-green-200' 
                : 'hover:bg-white/50 text-gray-600'
            }`}
          >
            <Microscope className="h-4 w-4 mr-2" />
            Basic Results
          </Button>
          <Button
            variant={activeAnalysisTab === 'advanced' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveAnalysisTab('advanced')}
            className={`flex-1 rounded-xl transition-all duration-300 ${
              activeAnalysisTab === 'advanced' 
                ? 'bg-white shadow-lg text-blue-700 border-blue-200' 
                : 'hover:bg-white/50 text-gray-600'
            }`}
          >
            <Database className="h-4 w-4 mr-2" />
            Advanced Analysis
          </Button>
          <Button
            variant={activeAnalysisTab === 'expert' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveAnalysisTab('expert')}
            className={`flex-1 rounded-xl transition-all duration-300 ${
              activeAnalysisTab === 'expert' 
                ? 'bg-white shadow-lg text-purple-700 border-purple-200' 
                : 'hover:bg-white/50 text-gray-600'
            }`}
          >
            <Users className="h-4 w-4 mr-2" />
            Expert Insights
          </Button>
          <Button
            variant={activeAnalysisTab === 'stats' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveAnalysisTab('stats')}
            className={`flex-1 rounded-xl transition-all duration-300 ${
              activeAnalysisTab === 'stats' 
                ? 'bg-white shadow-lg text-orange-700 border-orange-200' 
                : 'hover:bg-white/50 text-gray-600'
            }`}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>

        {/* Tab Content */}
        <div className="animate-in slide-in-from-bottom-2 duration-300">
          {activeAnalysisTab === 'basic' && <ResultsSection results={results} />}
          {activeAnalysisTab === 'advanced' && <AdvancedAnalysis results={results} />}
          {activeAnalysisTab === 'expert' && <ExpertRecommendations results={results} />}
          {activeAnalysisTab === 'stats' && <StatsDashboard />}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <NavigationBar />
      
      <div className="container mx-auto px-4 py-12">
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <UploadSection
            selectedFile={selectedFile}
            isAnalyzing={isAnalyzing}
            analysisProgress={analysisProgress}
            error={error}
            onFileSelect={handleFileSelect}
            onRemoveFile={handleRemoveFile}
            onAnalyze={handleAnalyze}
          />

          {renderAnalysisContent()}
        </div>

        <FeaturesSection />
        <CallToAction />
      </div>
    </div>
  );
}
