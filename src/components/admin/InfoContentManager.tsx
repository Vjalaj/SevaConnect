"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save, FileText, MapPin, Code, Type } from "lucide-react";

// Content sanitization function
const sanitizeContent = (content: string): string => {
  // Remove any script tags or dangerous content
  return content
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

// URL validation for location links
const isValidUrl = (url: string): boolean => {
  if (!url.trim()) return true; // Empty URL is valid
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

interface InfoContent {
  title: string;
  content: string;
  location: string;
}

export default function InfoContentManager() {
  const [infoContent, setInfoContent] = useState<InfoContent>({
    title: "",
    content: "",
    location: ""
  });
  const [isFormatted, setIsFormatted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadInfo = async () => {
      try {
        // Load from INFO.env file
        const response = await fetch('/api/get-info');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.info) {
            setInfoContent(data.info);
            // Also save to localStorage for immediate access
            localStorage.setItem("infoContent", JSON.stringify(data.info));
            return;
          }
        }
      } catch (error) {
        console.error('Error loading info from file:', error);
      }
      
      // Fallback to localStorage
      const saved = localStorage.getItem("infoContent");
      if (saved) {
        setInfoContent(JSON.parse(saved));
      } else {
        // Set empty default content - admin must configure
        setInfoContent({
          title: "Organization Name",
          content: "Please configure your organization information in the admin panel.",
          location: "Your Location"
        });
      }
    };
    
    loadInfo();
  }, []);

  const handleSave = async () => {
    // Sanitize content before saving
    const sanitizedContent = {
      title: infoContent.title.trim(),
      content: sanitizeContent(infoContent.content),
      location: infoContent.location.trim()
    };
    
    try {
      // Save to INFO.env file
      const response = await fetch('/api/update-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedContent)
      });
      
      if (response.ok) {
        // Also save to localStorage for immediate updates
        localStorage.setItem("infoContent", JSON.stringify(sanitizedContent));
        window.dispatchEvent(new CustomEvent('infoContentUpdated'));
        toast({
          title: "Success",
          description: "Info content saved to file successfully"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to save info content",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save info content",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Info Content Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            value={infoContent.title}
            onChange={(e) => setInfoContent({...infoContent, title: e.target.value})}
            placeholder="Enter title"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <Input
            value={infoContent.location}
            onChange={(e) => setInfoContent({...infoContent, location: e.target.value})}
            placeholder="Enter location"
          />
        </div>
        

        
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Content</label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const content = infoContent.content;
                if (isFormatted) {
                  // Convert formatted to normal
                  const normalContent = content.replace(/\\n/g, '\n');
                  setInfoContent({...infoContent, content: normalContent});
                  setIsFormatted(false);
                  toast({ title: "Converted to normal text" });
                } else {
                  // Convert normal to formatted
                  const formattedContent = content.replace(/\n/g, '\\n');
                  setInfoContent({...infoContent, content: formattedContent});
                  setIsFormatted(true);
                  toast({ title: "Converted to formatted text" });
                }
              }}
            >
              {isFormatted ? (
                <><Type className="w-4 h-4 mr-1" /> Normal</>
              ) : (
                <><Code className="w-4 h-4 mr-1" /> Format</>
              )}
            </Button>
          </div>
          <Textarea
            value={infoContent.content}
            onChange={(e) => setInfoContent({...infoContent, content: e.target.value})}
            placeholder={isFormatted ? "Formatted text with \\n for line breaks" : "Write naturally. Use the Format button to convert."}
            rows={20}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {isFormatted ? (
              "Formatted mode: \\n = line breaks, \\n\\n = paragraphs. Headings end with colon."
            ) : (
              "Normal mode: Write naturally. Click Format button to convert for proper display."
            )}
          </p>
        </div>
        
        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Info Content
        </Button>
      </CardContent>
    </Card>
  );
}