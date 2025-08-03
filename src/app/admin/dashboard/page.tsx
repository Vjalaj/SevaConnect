"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image, Settings, LogOut, Loader2 } from "lucide-react";
import InfoContentManager from "@/components/admin/InfoContentManager";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [imageUrl, setImageUrl] = useState("");
  const [galleryText, setGalleryText] = useState("");
  const [galleryItems, setGalleryItems] = useState<Array<{id: string, url: string, text: string}>>([]);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session || session.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      router.push("/admin");
      return;
    }
    
    loadGalleryItems();
  }, [session, status, router]);

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

    const newItem = {
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

  const handleDeleteGalleryItem = (id: string) => {
    const updatedItems = galleryItems.filter(item => item.id !== id);
    setGalleryItems(updatedItems);
    localStorage.setItem("galleryItems", JSON.stringify(updatedItems));
    toast({ title: "Success", description: "Gallery item deleted" });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session || session.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <Button onClick={() => signOut()} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="gallery">Gallery Management</TabsTrigger>
            <TabsTrigger value="info">Info Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
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
                  <CardTitle>Gallery Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {galleryItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-3">
                        <img 
                          src={item.url} 
                          alt="Gallery item" 
                          className="w-full h-32 object-cover rounded mb-2"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-image.png";
                          }}
                        />
                        <p className="text-sm text-gray-600 mb-2">{item.text}</p>
                        <Button 
                          onClick={() => handleDeleteGalleryItem(item.id)}
                          variant="destructive" 
                          size="sm"
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                    {galleryItems.length === 0 && (
                      <p className="text-center text-gray-500">No gallery items yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="info">
            <InfoContentManager />
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Payment Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Recipient Email</label>
                  <Input value={process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || "your_email@gmail.com"} disabled />
                </div>
                <div>
                  <label className="text-sm font-medium">Instamojo API Key</label>
                  <Input placeholder="Enter Instamojo API Key" />
                </div>
                <div>
                  <label className="text-sm font-medium">Instamojo Auth Token</label>
                  <Input placeholder="Enter Instamojo Auth Token" />
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}