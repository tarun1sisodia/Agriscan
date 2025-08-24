"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Users } from "lucide-react";

export default function CallToAction() {
  return (
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
  );
}
