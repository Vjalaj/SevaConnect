"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home } from "lucide-react";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    const paymentRequestId = searchParams.get('payment_request_id');
    
    if (paymentId || paymentRequestId) {
      setPaymentDetails({
        paymentId: paymentId || paymentRequestId,
        status: 'success'
      });
    }
  }, [searchParams]);

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <div className="mx-auto mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <CardTitle className="text-2xl text-green-700">Payment Successful!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">
          Thank you for your generous donation to SevaConnect. Your contribution will make a difference.
        </p>
        
        {paymentDetails && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              Payment ID: <span className="font-mono">{paymentDetails.paymentId}</span>
            </p>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            You will receive a confirmation email shortly.
          </p>
          <Link href="/">
            <Button className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-primary/10 flex items-center justify-center p-4">
      <Suspense fallback={
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </CardContent>
        </Card>
      }>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}