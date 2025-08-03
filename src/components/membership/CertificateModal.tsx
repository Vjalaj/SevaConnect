
"use client";

import { useEffect, useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Award, Download, X } from 'lucide-react';
import Image from 'next/image';
import html2canvas from 'html2canvas'; // For capturing certificate as image

interface CertificateModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  donorName: string; // Accept donorName as a prop
}

const CertificateModal = ({ isOpen, onOpenChange, donorName }: CertificateModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [issueDate, setIssueDate] = useState('');
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    setIssueDate(new Date().toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    }));
  }, []);

  const handleDownloadCertificate = async () => {
    if (certificateRef.current) {
      try {
        const canvas = await html2canvas(certificateRef.current, {
          scale: 2, // Increase scale for better resolution
          useCORS: true, // If using external images
          backgroundColor: null, // Transparent background for the canvas itself
        });
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `SevaChampion_Certificate_${donorName.replace(/\s+/g, '_')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error generating certificate image:", error);
        alert("Could not download certificate. Please try again.");
      }
    }
  };

  if (!isMounted) {
    return null; 
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 bg-background text-foreground">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-primary flex items-center">
            <Award size={28} className="mr-2 text-accent" />
            SevaChampion - Certificate of Appreciation
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Thank you for your generous support, {donorName}!
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6">
          {/* Certificate Design */}
          <div ref={certificateRef} className="border-4 border-accent p-4 rounded-lg bg-card shadow-2xl relative aspect-[4/3] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 -z-10 bg-gradient-to-br from-primary/20 to-accent/20" />
            <div className="text-center space-y-3 sm:space-y-4 h-full flex flex-col justify-center items-center p-2 sm:p-4">
              <Award size={64} className="text-accent mb-2 sm:mb-4" />
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary">Certificate of Appreciation</h3>
              <p className="text-md sm:text-lg text-foreground/90">This certificate is proudly presented to</p>
              <p className="text-3xl sm:text-4xl font-handwriting font-semibold text-accent tracking-wider py-1 sm:py-2 px-2 sm:px-4 border-b-2 border-accent break-all">
                {donorName}
              </p>
              <p className="text-sm sm:text-md text-foreground/80 max-w-xs sm:max-w-md mx-auto">
                In grateful recognition of your outstanding generosity and unwavering support towards creating a positive impact in our community through SevaConnect.
              </p>
              <div className="w-full flex justify-between items-end pt-4 sm:pt-6 text-xs text-muted-foreground">
                <div>
                  <p className="border-t border-muted-foreground pt-1">Date: {issueDate}</p>
                </div>
                <div>
                  <p className="border-t border-muted-foreground pt-1">The SevaConnect Team</p>
                </div>
              </div>
            </div>
            {/* Stylistic elements for certificate */}
            <div className="absolute top-2 left-2 w-10 h-10 sm:w-16 sm:h-16 border-t-2 border-l-2 border-accent/50"></div>
            <div className="absolute top-2 right-2 w-10 h-10 sm:w-16 sm:h-16 border-t-2 border-r-2 border-accent/50"></div>
            <div className="absolute bottom-2 left-2 w-10 h-10 sm:w-16 sm:h-16 border-b-2 border-l-2 border-accent/50"></div>
            <div className="absolute bottom-2 right-2 w-10 h-10 sm:w-16 sm:h-16 border-b-2 border-r-2 border-accent/50"></div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-0 sm:justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-muted-foreground">
            <X size={18} className="mr-2" /> Close
          </Button>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleDownloadCertificate}>
            <Download size={18} className="mr-2" /> Download Certificate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;
