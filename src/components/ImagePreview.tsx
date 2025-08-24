"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ZoomIn, ZoomOut } from "lucide-react";

interface ImagePreviewProps {
  file: File | null;
  onRemove: () => void;
}

export function ImagePreview({ file, onRemove }: ImagePreviewProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Create object URL when file changes
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      
      // Cleanup function to revoke object URL
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  if (!file || !imageUrl) return null;

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-0">
        <div className="relative group">
          <img
            src={imageUrl}
            alt="Plant preview"
            className={`w-full h-48 object-cover transition-transform duration-300 ${
              isZoomed ? "scale-110" : "scale-100"
            }`}
          />
          
          {/* Overlay with controls */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsZoomed(!isZoomed)}
                className="bg-white/90 hover:bg-white"
              >
                {isZoomed ? (
                  <ZoomOut className="h-4 w-4" />
                ) : (
                  <ZoomIn className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={onRemove}
                className="bg-red-500/90 hover:bg-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* File info */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm truncate">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div className="text-xs text-gray-500">
              {file.type.split('/')[1].toUpperCase()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
