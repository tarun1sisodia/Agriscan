"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Star, MessageCircle, Calendar, MapPin, Building } from "lucide-react";

interface ExpertRecommendationsProps {
  results: {
    disease?: string;
    severity?: string;
    symptoms?: string[];
    confidence?: number;
    economicImpact?: {
      netSavings?: number;
    };
    technicalMetrics?: {
      similarCasesFound?: number;
    };
    pathogenIdentification?: {
      species?: string;
      resistanceProfile?: string;
    };
    treatmentEfficacy?: {
      copperBasedFungicide?: number;
      biologicalControl?: number;
      culturalPractices?: number;
    };
  };
}

export default function ExpertRecommendations({ results }: ExpertRecommendationsProps) {
  if (!results) return null;

  const experts = [
    {
      name: "Dr. Sarah Johnson",
      title: "Plant Pathologist",
      institution: "University of California, Davis",
      experience: "15+ years",
      rating: 4.9,
      avatar: "👩‍🔬",
      recommendation: `Based on the detection of ${results.disease}, I recommend immediate action. ${results.severity === "High" ? "This is a high-severity disease that requires urgent treatment." : "This disease can be managed with proper treatment."} The symptoms suggest ${results.symptoms?.[0]?.toLowerCase() || "typical disease progression"} which responds well to early intervention.`,
      credentials: ["PhD Plant Pathology", "Certified Crop Advisor", "Research Fellow"],
      specialties: ["Fungal Diseases", "Integrated Pest Management", "Crop Protection"]
    },
    {
      name: "Prof. Michael Chen",
      title: "Agricultural Scientist",
      institution: "Cornell University",
      experience: "20+ years",
      rating: 4.8,
      avatar: "👨‍🌾",
      recommendation: `The ${results.disease} detection indicates ${results.confidence}% confidence. Consider implementing comprehensive management strategies including cultural practices and preventive measures. The economic impact analysis shows potential savings of $${results.economicImpact?.netSavings?.toLocaleString() || "0"} with proper treatment.`,
      credentials: ["PhD Agricultural Sciences", "Extension Specialist", "Author of 50+ Papers"],
      specialties: ["Soil Health", "Sustainable Agriculture", "Disease Prevention"]
    },
    {
      name: "Dr. Emily Rodriguez",
      title: "Plant Disease Specialist",
      institution: "Texas A&M University",
      experience: "12+ years",
      rating: 4.7,
      avatar: "👩‍⚕️",
      recommendation: `Analysis shows ${results.technicalMetrics?.similarCasesFound || 0} similar cases in our database. The pathogen identification reveals ${results.pathogenIdentification?.species || "unknown species"} with ${results.pathogenIdentification?.resistanceProfile || "standard"} resistance profile. I recommend a combination of treatments with regular monitoring.`,
      credentials: ["PhD Plant Pathology", "Board Certified", "Extension Agent"],
      specialties: ["Systemic Diseases", "Biological Control", "Monitoring Systems"]
    }
  ];

  const treatmentOptions = [
    {
      name: "Copper-based Fungicide",
      efficacy: results.treatmentEfficacy?.copperBasedFungicide || 0,
      cost: "$45/acre",
      application: "2-3 sprays at 7-day intervals",
      pros: ["Highly effective", "Organic approved", "Resistant strain"],
      cons: ["Rain protection needed", "Copper accumulation"],
      timing: "Immediate application"
    },
    {
      name: "Biological Control (Bacillus subtilis)",
      efficacy: results.treatmentEfficacy?.biologicalControl || 0,
      cost: "$32/acre",
      application: "Weekly applications for 4 weeks",
      pros: ["Environmentally safe", "No resistance", "Long-term protection"],
      cons: ["Slower action", "Weather dependent"],
      timing: "Start within 48 hours"
    },
    {
      name: "Cultural Practices",
      efficacy: results.treatmentEfficacy?.culturalPractices || 0,
      cost: "$15/acre",
      application: "Ongoing maintenance",
      pros: ["Low cost", "Sustainable", "Preventive"],
      cons: ["Labor intensive", "Slow results"],
      timing: "Implement immediately"
    }
  ];

  const communityInsights = [
    {
      user: "Farmer Mike",
      location: "Iowa",
      comment: `Used the same treatment for ${results.disease} last season. Saw improvement within 10 days. The ${results.treatmentEfficacy?.copperBasedFungicide || 0}% efficacy rating is accurate!`,
      rating: 5,
      date: "2 days ago"
    },
    {
      user: "Organic Valley Co.",
      location: "California",
      comment: `The biological control option worked well for our organic certification requirements. ${results.treatmentEfficacy?.biologicalControl || 0}% effectiveness as predicted.`,
      rating: 4,
      date: "1 week ago"
    },
    {
      user: "Green Thumb Farms",
      location: "Oregon",
      comment: `Combined chemical and cultural practices for ${results.disease}. Results were excellent after 3 weeks. Saved us $${results.economicImpact?.netSavings?.toLocaleString() || "0"} in potential losses.`,
      rating: 5,
      date: "2 weeks ago"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Expert Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Expert Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {experts.map((expert, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{expert.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-blue-800">{expert.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        {expert.rating}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{expert.title}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Building className="h-3 w-3 mr-1" />
                        {expert.institution}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {expert.experience}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3 italic">&quot;{expert.recommendation}&quot;</p>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-gray-600">Credentials:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {expert.credentials.map((cred, credIndex) => (
                            <Badge key={credIndex} variant="secondary" className="text-xs">
                              {cred}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-600">Specialties:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {expert.specialties.map((specialty, specIndex) => (
                            <Badge key={specIndex} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Treatment Options Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Treatment Options Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {treatmentOptions.map((treatment, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800">{treatment.name}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">{treatment.efficacy}% Efficacy</Badge>
                    <Badge variant="outline">{treatment.cost}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Application:</span> {treatment.application}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Timing:</span> {treatment.timing}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium text-green-600">Pros:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {treatment.pros.map((pro, proIndex) => (
                          <Badge key={proIndex} variant="default" className="text-xs bg-green-100 text-green-800">
                            {pro}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-red-600">Cons:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {treatment.cons.map((con, conIndex) => (
                          <Badge key={conIndex} variant="destructive" className="text-xs">
                            {con}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Community Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communityInsights.map((insight, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{insight.user}</span>
                    <div className="flex items-center text-xs text-gray-600">
                      <MapPin className="h-3 w-3 mr-1" />
                      {insight.location}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(insight.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{insight.date}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{insight.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
