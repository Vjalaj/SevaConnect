
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, PartyPopper } from 'lucide-react';

interface ThankYouDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  amount: number;
  categoryName: string;
  donorName: string; // Added donorName
}

const ThankYouDialog = ({ isOpen, onOpenChange, amount, categoryName, donorName }: ThankYouDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card text-center p-8">
        <DialogHeader>
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-4">
            <PartyPopper size={48} className="text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold text-primary">Thank You, {donorName}!</DialogTitle> {/* Display donorName */}
          <DialogDescription className="text-foreground/80 mt-2">
            Your donation of <span className="font-semibold text-accent">₹{amount.toLocaleString()}</span> for <span className="font-semibold text-primary">{categoryName}</span> is being processed.
            <br />
            Your kindness makes a world of difference. An email confirmation will be sent shortly.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex justify-center">
            <CheckCircle2 size={64} className="text-green-500" />
        </div>
        <DialogFooter className="mt-8 sm:justify-center">
          <Button onClick={() => onOpenChange(false)} variant="outline" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ThankYouDialog;
