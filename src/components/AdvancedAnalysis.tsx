"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Database, Zap, Target, TrendingUp, Cloud } from "lucide-react";

interface AdvancedAnalysisProps {
  results: any;
}

export default function AdvancedAnalysis({ results }: AdvancedAnalysisProps) {
  if (!results) return null;

  const technicalMetrics = [
    { name: "Image Quality Score", value: results.technicalMetrics?.imageQualityScore || 0, max: 100, color: "bg-green-500" },
    { name: "Processing Speed", value: results.technicalMetrics?.processingSpeed || 0, max: 5, color: "bg-blue-500" },
    { name: "Model Confidence", value: results.technicalMetrics?.modelConfidence || 0, max: 100, color: "bg-purple-500" },
    { name: "Data Points Analyzed", value: results.technicalMetrics?.dataPointsAnalyzed || 0, max: 2000, color: "bg-orange-500" },
    { name: "Similar Cases Found", value: results.technicalMetrics?.similarCasesFound || 0, max: 1000, color: "bg-pink-500" },
    { name: "Treatment Success Rate", value: results.technicalMetrics?.treatmentSuccessRate || 0, max: 100, color: "bg-emerald-500" }
  ];

  const aiInsights = [
    {
      category: "Pathogen Identification",
      details: [
        { label: "Species", value: results.pathogenIdentification?.species || "Unknown", confidence: 98 },
        { label: "Strain", value: results.pathogenIdentification?.strain || "Unknown", confidence: 95 },
        { label: "Mating Type", value: results.pathogenIdentification?.matingType || "Unknown", confidence: 92 },
        { label: "Resistance Profile", value: results.pathogenIdentification?.resistanceProfile || "Unknown", confidence: 89 }
      ]
    },
    {
      category: "Environmental Analysis",
      details: [
        { label: "Temperature Favorability", value: results.environmentalAnalysis?.temperatureFavorability || "Unknown", confidence: 87 },
        { label: "Humidity Impact", value: results.environmentalAnalysis?.humidityImpact || "Unknown", confidence: 94 },
        { label: "Soil pH Compatibility", value: results.environmentalAnalysis?.soilPHCompatibility || "Unknown", confidence: 91 },
        { label: "Air Circulation", value: results.environmentalAnalysis?.airCirculation || "Unknown", confidence: 85 }
      ]
    },
    {
      category: "Treatment Efficacy",
      details: [
        { label: "Copper-based Fungicide", value: `${results.treatmentEfficacy?.copperBasedFungicide || 0}% Effective`, confidence: results.treatmentEfficacy?.copperBasedFungicide || 0 },
        { label: "Biological Control", value: `${results.treatmentEfficacy?.biologicalControl || 0}% Effective`, confidence: results.treatmentEfficacy?.biologicalControl || 0 },
        { label: "Cultural Practices", value: `${results.treatmentEfficacy?.culturalPractices || 0}% Effective`, confidence: results.treatmentEfficacy?.culturalPractices || 0 },
        { label: "Prevention Measures", value: `${results.treatmentEfficacy?.preventionMeasures || 0}% Effective`, confidence: results.treatmentEfficacy?.preventionMeasures || 0 }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Technical Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Technical Analysis Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technicalMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{metric.name}</span>
                  <span className="text-sm font-bold text-gray-900">
                    {typeof metric.value === 'number' && metric.value % 1 === 0 ? metric.value : metric.value.toFixed(1)}
                    {metric.name.includes('Score') || metric.name.includes('Rate') || metric.name.includes('Confidence') ? '%' : ''}
                  </span>
                </div>
                <Progress 
                  value={(metric.value / metric.max) * 100} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>{metric.max}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {aiInsights.map((insight, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <Target className="h-4 w-4 mr-2 text-blue-600" />
                  {insight.category}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {insight.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-gray-700">{detail.label}:</span>
                        <span className="text-sm text-gray-900 ml-2">{detail.value}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {detail.confidence}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disease History & Epidemiology */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Disease History & Epidemiology
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">{results.epidemiology?.firstReported || "Unknown"}</div>
                <div className="text-xs text-gray-600">First Reported</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-lg font-bold text-red-600">{results.epidemiology?.globalCases || "Unknown"}</div>
                <div className="text-xs text-gray-600">Global Cases</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">{results.epidemiology?.seasonalPeak || "Unknown"}</div>
                <div className="text-xs text-gray-600">Seasonal Peak</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{results.epidemiology?.geographicSpread || "Unknown"}</div>
                <div className="text-xs text-gray-600">Geographic Spread</div>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium text-gray-800">Regional Prevalence</h5>
              <div className="space-y-2">
                {results.epidemiology?.regionalPrevalence && Object.entries(results.epidemiology.regionalPrevalence).map(([region, risk]) => (
                  <div key={region} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm capitalize">{region.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <Badge
                      variant={
                        risk === "High Risk" ? "destructive" :
                        risk === "Moderate Risk" ? "secondary" : "default"
                      }
                    >
                      {String(risk)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Economic Impact Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Economic Impact Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-lg font-bold text-red-600">${results.economicImpact?.potentialLoss?.toLocaleString() || "0"}</div>
                <div className="text-xs text-gray-600">Potential Loss</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">${results.economicImpact?.treatmentCost?.toLocaleString() || "0"}</div>
                <div className="text-xs text-gray-600">Treatment Cost</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">${results.economicImpact?.netSavings?.toLocaleString() || "0"}</div>
                <div className="text-xs text-gray-600">Net Savings</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">{results.economicImpact?.roi || "0"}%</div>
                <div className="text-xs text-gray-600">ROI</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="space-y-2">
                {results.economicImpact?.insurance && Object.entries(results.economicImpact.insurance).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <Badge variant={
                      value === "Available" || value === "Eligible" ? "default" : 
                      value === "Limited" ? "secondary" : 
                      value === "High" ? "destructive" : "default"
                    }>
                      {String(value)}
                    </Badge>
                  </div>
                ))}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="font-medium">Temperature</div>
                <div className="text-gray-600">{results.weatherAnalysis?.currentConditions?.temperature || "N/A"}°C</div>
              </div>
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="font-medium">Humidity</div>
                <div className="text-gray-600">{results.weatherAnalysis?.currentConditions?.humidity || "N/A"}%</div>
              </div>
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="font-medium">Rainfall</div>
                <div className="text-gray-600">{results.weatherAnalysis?.currentConditions?.rainfall || "N/A"}mm</div>
              </div>
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="font-medium">Wind Speed</div>
                <div className="text-gray-600">{results.weatherAnalysis?.currentConditions?.windSpeed || "N/A"} km/h</div>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium text-gray-800">Disease Favorability Index</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current Favorability</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${results.weatherAnalysis?.diseaseFavorability || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{results.weatherAnalysis?.diseaseFavorability || 0}%</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  Current weather conditions {results.weatherAnalysis?.diseaseFavorability > 70 ? "create optimal conditions" : "are moderately favorable"} for disease development
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium text-gray-800">7-Day Forecast</h5>
              <div className="grid grid-cols-7 gap-2 text-xs">
                {results.weatherAnalysis?.forecast?.map((day: any, index: number) => (
                  <div key={day.day} className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium">{day.day}</div>
                    <div className="text-gray-600">{day.temp}°C</div>
                    <div className="text-gray-600">{day.humidity}%</div>
                  </div>
                )) || Array.from({length: 7}, (_, i) => (
                  <div key={i} className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium">N/A</div>
                    <div className="text-gray-600">--°C</div>
                    <div className="text-gray-600">--%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
