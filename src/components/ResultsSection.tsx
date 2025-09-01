"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Microscope, Pill, History, AlertTriangle, Clock, Shield, TrendingUp, CheckCircle } from "lucide-react";

interface ResultsSectionProps {
  results: {
    disease: string;
    confidence: number;
    severity: string;
    treatments: string[];
    prevention: string[];
  };
}

export default function ResultsSection({ results }: ResultsSectionProps) {
  if (!results) {
    return (
      <div className="space-y-6">
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
    </div>
  );
}
