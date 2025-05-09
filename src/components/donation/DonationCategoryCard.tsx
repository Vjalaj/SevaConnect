import type { DonationCategory } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface DonationCategoryCardProps {
  category: DonationCategory;
  onSelect: () => void;
}

const DonationCategoryCard = ({ category, onSelect }: DonationCategoryCardProps) => {
  return (
    <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <CardHeader className="flex-row items-center gap-4 pb-2">
        <category.Icon size={40} className="text-primary" strokeWidth={1.5} />
        <CardTitle className="text-xl">{category.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative w-full h-40 rounded-md overflow-hidden mb-4 shadow-inner">
          <Image
            src={`https://picsum.photos/seed/${category.id}/400/300`}
            alt={category.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={category.imageHint}
          />
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
