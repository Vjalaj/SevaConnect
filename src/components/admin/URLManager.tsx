"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save, Link, Image as ImageIcon } from "lucide-react";

interface URLConfig {
  [key: string]: string;
}

// URLs will be loaded from URL.env via API
const getEmptyURLs = (): URLConfig => {
  return {
    ORPHANAGE_IMAGE_URL: "",
    GOWSHALA_IMAGE_URL: "",
    VRIDHA_ASHRAM_IMAGE_URL: "",
    HEALTH_GENERAL_IMAGE_URL: "",
    HEALTH_SAMUHIK_VIVAH_IMAGE_URL: "",
    POOJA_PATH_IMAGE_URL: "",
    EYE_CAMP_IMAGE_URL: "",
    ENVIRONMENTAL_IMAGE_URL: "",
    ORGANIZATION_LOCATION_URL: "",
    ORGANIZATION_WEBSITE_URL: ""
  };
};

const urlLabels: { [key: string]: string } = {
  ORPHANAGE_IMAGE_URL: "Orphanage Support Image",
  GOWSHALA_IMAGE_URL: "Gowshala (Cow Shelter) Image",
  VRIDHA_ASHRAM_IMAGE_URL: "Vridha Ashram (Old Age Home) Image",
  HEALTH_GENERAL_IMAGE_URL: "Help Health Group (General) Image",
  HEALTH_SAMUHIK_VIVAH_IMAGE_URL: "Help Health Group (Samuhik Vivah) Image",
  POOJA_PATH_IMAGE_URL: "Pooja Path & Rituals Image",
  EYE_CAMP_IMAGE_URL: "Eye Camp Organization Image",
  ENVIRONMENTAL_IMAGE_URL: "Environmental Protection Image",
  ORGANIZATION_LOCATION_URL: "Organization Location (Google Maps)",
  ORGANIZATION_WEBSITE_URL: "Organization Website"
};

const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

export default function URLManager() {
  const [urls, setUrls] = useState<URLConfig>(getEmptyURLs());
  const { toast } = useToast();

  useEffect(() => {
    const loadUrls = async () => {
      try {
        console.log('Loading URLs from URL.env...');
        const response = await fetch('/api/get-urls');
        if (response.ok) {
          const data = await response.json();
          console.log('API response:', data);
          if (data.success && data.urls) {
            setUrls(data.urls);
            localStorage.setItem("urlConfig", JSON.stringify(data.urls));
            window.dispatchEvent(new CustomEvent('urlConfigUpdated', { detail: data.urls }));
            console.log('URLs loaded and saved to localStorage');
          }
        } else {
          console.error('API response not ok:', response.status);
        }
      } catch (error) {
        console.error('Error loading URLs from URL.env:', error);
      }
    };
    
    loadUrls();
  }, []);

  const handleUrlChange = (key: string, value: string) => {
    setUrls(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    // Validate all URLs
    const invalidUrls = Object.entries(urls).filter(([key, url]) => 
      url && !isValidUrl(url)
    );

    if (invalidUrls.length > 0) {
      toast({
        title: "Invalid URLs",
        description: `Please check: ${invalidUrls.map(([key]) => urlLabels[key]).join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    try {
      // Save to localStorage
      localStorage.setItem("urlConfig", JSON.stringify(urls));
      window.dispatchEvent(new CustomEvent('urlConfigUpdated', { detail: urls }));
      
      // Save to URL.env file
      const response = await fetch('/api/update-urls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(urls)
      });
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "URLs updated successfully"
        });
      } else {
        toast({
          title: "Partial Success",
          description: "URLs updated in browser but failed to update URL.env file",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save URLs",
        variant: "destructive"
      });
    }
  };

  const handleReset = (key: string) => {
    // Reset to empty - admin must configure from URL.env
    setUrls(prev => ({ ...prev, [key]: "" }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Link className="w-5 h-5 mr-2" />
          URL Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(urls).map(([key, url]) => (
          <div key={key} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                {key.includes('IMAGE') ? <ImageIcon className="w-4 h-4" /> : <Link className="w-4 h-4" />}
                {urlLabels[key]}
              </h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleReset(key)}
              >
                Reset
              </Button>
            </div>
            
            <div className="space-y-2">
              <Input
                value={url}
                onChange={(e) => handleUrlChange(key, e.target.value)}
                placeholder={key.includes('IMAGE') ? "Enter image URL (Recommended: 400x300px)" : "Enter URL (https://...)"}
                className={url && !isValidUrl(url) ? "border-red-500" : ""}
              />
              {url && !isValidUrl(url) && (
                <p className="text-xs text-red-500">Invalid URL format</p>
              )}
              {key.includes('IMAGE') && (
                <p className="text-xs text-gray-500">Recommended dimensions: 400x300px for best fit</p>
              )}
              {key.includes('IMAGE') && url && isValidUrl(url) && (
                <div className="w-full h-20 border rounded overflow-hidden">
                  <img
                    src={url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full bg-gray-200 flex items-center justify-center"><span class="text-gray-500 text-xs">Image failed to load</span></div>';
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        
        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save All URLs
        </Button>
      </CardContent>
    </Card>
  );
}