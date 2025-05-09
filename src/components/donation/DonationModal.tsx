
"use client";

import type { DonationCategory } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import DonationForm from './DonationForm';
import ThankYouDialog from './ThankYouDialog';
import { useState } from 'react';

interface DonationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  category: DonationCategory;
}

const DonationModal = ({ isOpen, onOpenChange, category }: DonationModalProps) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [donorName, setDonorName] = useState("");

  const handleDonationSuccess = (amount: number, name: string) => {
    setDonationAmount(amount);
    setDonorName(name);
    onOpenChange(false); // Close donation modal
    setShowThankYou(true); // Open thank you dialog
  };

  const handleThankYouClose = () => {
    setShowThankYou(false);
  };
  
  const CategoryIcon = category.Icon; // To use as a component

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[480px] bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl text-primary">
              <CategoryIcon size={28} /> Donate to {category.name}
            </DialogTitle>
            <DialogDescription className="text-foreground/80">
              {category.description}
              <br />
              Your support will make a real impact. Please enter your donation details below.
            </DialogDescription>
          </DialogHeader>
          <DonationForm categoryName={category.name} onSuccess={handleDonationSuccess} />
        </DialogContent>
      </Dialog>
      <ThankYouDialog 
        isOpen={showThankYou} 
        onOpenChange={handleThankYouClose} 
        amount={donationAmount}
        categoryName={category.name}
        donorName={donorName} // Pass donorName to ThankYouDialog
      />
    </>
  );
};

export default DonationModal;
