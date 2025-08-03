
"use client";

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Download, HeartHandshake, UserPlus } from 'lucide-react';
import { useState } from 'react';
import CertificateModal from './CertificateModal';
import BecomeMemberModal from './BecomeMemberModal';
import Image from 'next/image';
import Link from 'next/link';

const MembershipSection = () => {
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isBecomeMemberModalOpen, setIsBecomeMemberModalOpen] = useState(false);
  const [currentMemberName, setCurrentMemberName] = useState("Valued SevaChampion"); // Default name

  const handleMembershipSuccess = (memberName: string) => {
    setCurrentMemberName(memberName); // Set the name from the form
    // setIsBecomeMemberModalOpen(false); // Already handled in BecomeMemberModal's form success logic
    setIsCertificateModalOpen(true); // Open certificate modal
  };

  return (
    <>
      <Card className="max-w-2xl mx-auto shadow-xl bg-card overflow-hidden">
        <div className="md:flex">
          <div className="md:shrink-0">
            <div className="relative h-48 w-full object-cover md:h-full md:w-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Award size={64} className="text-accent" />
            </div>
          </div>
          <div className="p-8 flex flex-col justify-between">
            <div>
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center text-accent mb-2">
                  <Award size={28} className="mr-2" />
                  <CardTitle className="text-2xl !mt-0">Your Impact Rewarded</CardTitle>
                </div>
                <CardDescription className="text-foreground/80">
                  At SevaConnect, we deeply value your commitment to making a difference. 
                  Donors who consistently support our causes or make significant contributions are recognized as SevaChampions.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 mb-6">
                <p className="text-foreground/90">
                  Eligible SevaChampions receive a personalized Certificate of Appreciation, a small token of our immense gratitude for your dedication to positive change.
                </p>
                <p className="text-foreground/90 mt-4">
                  Ready to make an impact and work towards becoming a SevaChampion? Your journey starts with a donation or by joining our SevaChampion program.
                </p>
              </CardContent>
            </div>
            <CardFooter className="p-0 flex flex-col sm:flex-row flex-wrap gap-2 md:gap-4 mt-auto">
              <Link 
                href="/#donate" 
                className={buttonVariants({ variant: 'default', size: 'default' }) + " w-full sm:w-auto grow sm:grow-0"}
                aria-label="Donate now to support our causes"
              >
                <HeartHandshake size={18} className="mr-2" />
                Donate to a Cause
              </Link>
              <Button 
                onClick={() => setIsBecomeMemberModalOpen(true)} 
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground grow sm:grow-0"
                aria-label="Become a SevaChampion for ₹1111"
              >
                <UserPlus size={18} className="mr-2" />
                Join for ₹1111
              </Button>
              <Button 
                onClick={() => {
                  setCurrentMemberName("Valued SevaChampion"); // For sample, use default
                  setIsCertificateModalOpen(true);
                }} 
                className="w-full sm:w-auto grow sm:grow-0"
                variant="outline" 
                aria-label="View a sample SevaChampion certificate"
              >
                <Download size={18} className="mr-2" />
                Sample Certificate
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
      
      <CertificateModal 
        isOpen={isCertificateModalOpen} 
        onOpenChange={setIsCertificateModalOpen}
        donorName={currentMemberName} // Pass the dynamic or default name
      />

      <BecomeMemberModal
        isOpen={isBecomeMemberModalOpen}
        onOpenChange={setIsBecomeMemberModalOpen}
        onSuccess={handleMembershipSuccess} // Use the new handler
      />
    </>
  );
};

export default MembershipSection;
