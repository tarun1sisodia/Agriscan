"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Microscope, Pill, Leaf, Camera, Zap, Cloud, Shield } from "lucide-react";

export default function FeaturesSection() {
  return (
    <>
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
    </>
  );
}
