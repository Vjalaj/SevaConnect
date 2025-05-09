
"use client";

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FormThankYouPage() {
  useEffect(() => {
    // Attempt to close the window/tab. This might not work in all browsers
    // due to security restrictions if the window wasn't opened by script.
    // setTimeout(() => {
    //   window.close();
    // }, 3000); // Attempt to close after 3 seconds
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-8 text-center">
      <h1 className="text-3xl font-bold text-primary mb-4">Thank You!</h1>
      <p className="text-lg text-foreground/80 mb-6">
        Your submission has been received by our processing partner.
      </p>
      <p className="text-md text-muted-foreground mb-8">
        If this tab does not close automatically, you may close it now.
      </p>
      <Link href="/" passHref>
        <Button variant="outline">Return to Homepage</Button>
      </Link>
    </div>
  );
}
