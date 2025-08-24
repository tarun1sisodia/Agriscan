"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, Users, Globe, Clock, Target, Award } from "lucide-react";

export default function StatsDashboard() {
  const stats = [
    {
      title: "Total Scans",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Activity,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Global Coverage",
      value: "47",
      change: "+3",
      trend: "up",
      icon: Globe,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Avg Response Time",
      value: "2.3s",
      change: "-0.5s",
      trend: "down",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Accuracy Rate",
      value: "96.8%",
      change: "+1.2%",
      trend: "up",
      icon: Target,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: Award,
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    }
  ];

  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Real-Time Analytics
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Live insights into our platform's performance and global impact on agricultural disease detection
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <IconComponent className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <Badge 
                    variant={stat.trend === "up" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Live Activity Feed */}
      <div className="mt-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-600" />
              Live Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "Farmer John", action: "detected", disease: "Tomato Blight", location: "California", time: "2 min ago" },
                { user: "AgriTech Co.", action: "analyzed", disease: "Corn Rust", location: "Iowa", time: "5 min ago" },
                { user: "Sarah Wilson", action: "identified", disease: "Wheat Powdery Mildew", location: "Kansas", time: "8 min ago" },
                { user: "Green Farms", action: "scanned", disease: "Potato Late Blight", location: "Idaho", time: "12 min ago" },
                { user: "Organic Valley", action: "detected", disease: "Apple Scab", location: "Washington", time: "15 min ago" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">{activity.user}</span>
                    <span className="text-gray-600"> {activity.action} </span>
                    <span className="font-medium text-red-600">{activity.disease}</span>
                    <span className="text-gray-600"> in </span>
                    <span className="font-medium text-blue-600">{activity.location}</span>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
