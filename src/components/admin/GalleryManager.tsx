"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image, Edit, Trash2, Save, X } from "lucide-react";

interface GalleryItem {
  id: string;
  url: string;
  text: string;
}

export default function GalleryManager() {
  const [imageUrl, setImageUrl] = useState("");
  const [galleryText, setGalleryText] = useState("");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState("");
  const [editText, setEditText] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = () => {
    const saved = localStorage.getItem("galleryItems");
    if (saved) {
      setGalleryItems(JSON.parse(saved));
    }
  };

  const handleAddGalleryItem = () => {
    if (!imageUrl || !galleryText) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }

    const newItem: GalleryItem = {
      id: Date.now().toString(),
      url: imageUrl,
      text: galleryText
    };

    const updatedItems = [...galleryItems, newItem];
    setGalleryItems(updatedItems);
    localStorage.setItem("galleryItems", JSON.stringify(updatedItems));
    
    setImageUrl("");
    setGalleryText("");
    toast({ title: "Success", description: "Gallery item added successfully" });
  };

  const handleEditStart = (item: GalleryItem) => {
    setEditingId(item.id);
    setEditUrl(item.url);
    setEditText(item.text);
  };

  const handleEditSave = (id: string) => {
    if (!editUrl || !editText) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }

    const updatedItems = galleryItems.map(item =>
      item.id === id ? { ...item, url: editUrl, text: editText } : item
    );
    
    setGalleryItems(updatedItems);
    localStorage.setItem("galleryItems", JSON.stringify(updatedItems));
    setEditingId(null);
    toast({ title: "Success", description: "Gallery item updated successfully" });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditUrl("");
    setEditText("");
  };

  const handleDeleteGalleryItem = (id: string) => {
    const updatedItems = galleryItems.filter(item => item.id !== id);
    setGalleryItems(updatedItems);
    localStorage.setItem("galleryItems", JSON.stringify(updatedItems));
    toast({ title: "Success", description: "Gallery item deleted" });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Add Gallery Item
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Image URL (Google Drive, etc.)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Textarea
            placeholder="Description text"
            value={galleryText}
            onChange={(e) => setGalleryText(e.target.value)}
            rows={3}
          />
          <Button onClick={handleAddGalleryItem} className="w-full">
            <Image className="w-4 h-4 mr-2" />
            Add to Gallery
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {galleryItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-3">
                {editingId === item.id ? (
                  <div className="space-y-3">
                    <Input
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      placeholder="Image URL"
                    />
                    <Textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      placeholder="Description"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleEditSave(item.id)}
                        size="sm"
                        className="flex-1"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button 
                        onClick={handleEditCancel}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <img 
                      src={item.url} 
                      alt="Gallery item" 
                      className="w-full h-32 object-cover rounded mb-2"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-image.png";
                      }}
                    />
                    <p className="text-sm text-gray-600 mb-2">{item.text}</p>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleEditStart(item)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        onClick={() => handleDeleteGalleryItem(item.id)}
                        variant="destructive" 
                        size="sm"
                        className="flex-1"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
            {galleryItems.length === 0 && (
              <p className="text-center text-gray-500">No gallery items yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}