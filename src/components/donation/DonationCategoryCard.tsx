import type { DonationCategory } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getImageUrl } from '@/lib/urlConfig';

interface DonationCategoryCardProps {
  category: DonationCategory;
  onSelect: () => void;
}

const DonationCategoryCard = ({ category, onSelect }: DonationCategoryCardProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageKey, setImageKey] = useState(0);

  useEffect(() => {
    const updateImage = () => {
      const adminImageUrl = getImageUrl(category.id);
      const newImageUrl = adminImageUrl || '';
      
      console.log(`Category ${category.id}: URL = ${newImageUrl}`);
      
      setImageUrl(newImageUrl);
      setImageKey(prev => prev + 1);
    };

    // Initial load
    updateImage();
    
    // Listen for updates
    const handleUpdate = () => {
      console.log('URL config updated, refreshing images...');
      setTimeout(updateImage, 100);
    };
    
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('urlConfigUpdated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('urlConfigUpdated', handleUpdate);
    };
  }, [category.id]); // Removed imageUrl dependency to force updates

  return (
    <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <CardHeader className="flex-row items-center gap-4 pb-2">
        <category.Icon size={40} className="text-primary" strokeWidth={1.5} />
        <CardTitle className="text-xl">{category.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative w-full h-40 rounded-md overflow-hidden mb-4 shadow-inner">
          {imageUrl ? (
            <Image
              key={imageKey}
              src={imageUrl}
              alt={category.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={category.imageHint}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center p-2">
              <span className="text-gray-500 text-sm text-center">No image configured</span>
              <span className="text-gray-400 text-xs text-center mt-1">Recommended: 400x300px</span>
            </div>
          )}
        </div>
        <CardDescription>{category.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button onClick={onSelect} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" variant="default">
          Donate to {category.name.split('(')[0].trim()}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DonationCategoryCard;
