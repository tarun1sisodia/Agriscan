"use client";

import { Button } from "@/components/ui/button";
import { Leaf, Users, Shield, Globe } from "lucide-react";

export default function NavigationBar() {
  return (
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
  );
}
