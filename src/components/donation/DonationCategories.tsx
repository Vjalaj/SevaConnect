
"use client";

import type { DonationCategory, AppLucideIcon } from '@/lib/types'; // Updated import
import DonationCategoryCard from './DonationCategoryCard';
import DonationModal from './DonationModal';
import { useState } from 'react';
import { 
  Baby, 
  Sprout, 
  Users, 
  HeartHandshake, 
  Gift, 
  Sparkles, 
  Eye, 
  Globe 
} from 'lucide-react';

const categories: DonationCategory[] = [
  { id: 'orphanage', name: 'Orphanage Support', description: 'Provide care and education for orphaned children.', Icon: Baby as AppLucideIcon, imageHint: 'orphanage children' },
  { id: 'gowshala', name: 'Gowshala (Cow Shelter)', description: 'Support the welfare and upkeep of cows.', Icon: Sprout as AppLucideIcon, imageHint: 'cow shelter' },
  { id: 'vridha_ashram', name: 'Vridha Ashram (Old Age Home)', description: 'Care for the elderly and provide them comfort.', Icon: Users as AppLucideIcon, imageHint: 'elderly home' },
  { id: 'health_general', name: 'Help Health Group (General)', description: 'Fund medical supplies and healthcare initiatives.', Icon: HeartHandshake as AppLucideIcon, imageHint: 'medical supplies' },
  { id: 'health_samuhik_vivah', name: 'Help Health Group (Samuhik Vivah)', description: 'Support community mass marriage ceremonies.', Icon: Gift as AppLucideIcon, imageHint: 'community wedding' },
  { id: 'pooja_path', name: 'Pooja Path & Rituals', description: 'Contribute to religious ceremonies and spiritual activities.', Icon: Sparkles as AppLucideIcon, imageHint: 'hindu ritual' },
  { id: 'eye_camp', name: 'Eye Camp Organization', description: 'Help organize free eye check-ups and treatments.', Icon: Eye as AppLucideIcon, imageHint: 'eye checkup' },
  { id: 'environmental', name: 'Environmental Protection', description: 'Support initiatives for a greener planet.', Icon: Globe as AppLucideIcon, imageHint: 'tree planting' },
];

const DonationCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<DonationCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCategorySelect = (category: DonationCategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <DonationCategoryCard 
            key={category.id} 
            category={category} 
            onSelect={() => handleCategorySelect(category)} 
          />
        ))}
      </div>
      {selectedCategory && (
        <DonationModal 
          isOpen={isModalOpen} 
          onOpenChange={setIsModalOpen}
          category={selectedCategory} 
        />
      )}
    </>
  );
};

export default DonationCategories;
