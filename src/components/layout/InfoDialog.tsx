"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, MapPin } from "lucide-react";
import { getLocationUrl } from '@/lib/urlConfig';

interface InfoContent {
  title: string;
  content: string;
  location: string;
}

export default function InfoDialog() {
  const [infoContent, setInfoContent] = useState<InfoContent>({
    title: "Organization Name",
    content: "Please configure your organization information in the admin panel.",
    location: "Your Location"
  });

  useEffect(() => {
    const loadInfo = async () => {
      try {
        // Load from INFO.env file
        const response = await fetch('/api/get-info');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.info) {
            setInfoContent(data.info);
            return;
          }
        }
      } catch (error) {
        console.error('Error loading info from file:', error);
      }
      
      // Fallback to localStorage
      const saved = localStorage.getItem("infoContent");
      if (saved) {
        try {
          const content = JSON.parse(saved);
          setInfoContent(content);
        } catch (error) {
          console.error('Error parsing info content:', error);
        }
      }
    };

    const updateInfo = () => {
      setTimeout(loadInfo, 100);
    };

    loadInfo();
    window.addEventListener('storage', updateInfo);
    window.addEventListener('infoContentUpdated', updateInfo);

    return () => {
      window.removeEventListener('storage', updateInfo);
      window.removeEventListener('infoContentUpdated', updateInfo);
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="p-1 h-auto">
          <Info className="h-4 w-4 text-accent" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">{infoContent.title}</DialogTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {getLocationUrl() ? (
              <a 
                href={getLocationUrl()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline cursor-pointer"
              >
                {infoContent.location}
              </a>
            ) : (
              <span>{infoContent.location}</span>
            )}
          </div>
        </DialogHeader>
        <div className="mt-4">
          <div className="space-y-4 max-w-none">
            {infoContent.content.replace(/\\n/g, '\n').split('\n\n').map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;
              
              // Check if paragraph contains a colon (heading)
              if (trimmed.includes(':') && trimmed.split(':')[0].length < 80) {
                const [heading, ...contentParts] = trimmed.split(':');
                const content = contentParts.join(':').trim();
                return (
                  <div key={index} className="mb-4">
                    <h3 className="text-primary font-bold text-base mb-2">{heading}:</h3>
                    {content && (
                      <p className="text-sm leading-relaxed text-foreground/90 ml-2">
                        {content}
                      </p>
                    )}
                  </div>
                );
              }
              
              // Regular paragraph
              return (
                <p key={index} className="mb-4 text-sm leading-relaxed text-foreground/90">
                  {trimmed}
                </p>
              );
            }).filter(Boolean)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}