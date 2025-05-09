
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import MembershipForm from './MembershipForm';
import { Award } from 'lucide-react';

interface BecomeMemberModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: (memberName: string) => void; // Updated to accept memberName
}

const BecomeMemberModal = ({ isOpen, onOpenChange, onSuccess }: BecomeMemberModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-primary">
            <Award size={28} /> Become a SevaChampion!
          </DialogTitle>
          <DialogDescription className="text-foreground/80">
            Join our community of dedicated supporters. Your fixed contribution of ₹1111 helps us sustain our efforts and recognize your commitment.
            <br />
            Please enter your details below.
          </DialogDescription>
        </DialogHeader>
        <MembershipForm onSuccess={(memberName) => { // Receive memberName
          onOpenChange(false); // Close this modal
          onSuccess(memberName); // Pass memberName to parent for certificate modal
        }} />
      </DialogContent>
    </Dialog>
  );
};

export default BecomeMemberModal;
