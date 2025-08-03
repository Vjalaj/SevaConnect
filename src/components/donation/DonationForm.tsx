
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";

const donationFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50),
  email: z.string().email({ message: "Please enter a valid email address." }),
  amount: z.coerce.number().min(10, { message: "Minimum donation amount is ₹10." }),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

interface DonationFormProps {
  categoryName: string;
  onSuccess: (amount: number, donorName: string) => void;
}

const DonationForm = ({ categoryName, onSuccess }: DonationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [formSubmitRedirectUrl, setFormSubmitRedirectUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFormSubmitRedirectUrl(`${window.location.origin}/form-thank-you`);
    }
  }, []);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: 100,
    },
  });

  const recipientEmail = process.env.NEXT_PUBLIC_RECIPIENT_EMAIL; 

  const handleInstamojoPay = async (values: DonationFormValues) => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: values.amount,
          name: values.name,
          email: values.email,
          purpose: `Donation for ${categoryName}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        window.open(result.payment_url, '_blank');
        onSuccess(values.amount, values.name);
      } else {
        toast({
          title: "Payment Error",
          description: result.message || "Failed to create payment",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process payment",
        variant: "destructive",
      });
    }
  };

  const handleRazorpayPay = (values: DonationFormValues) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: values.amount * 100,
      currency: 'INR',
      name: 'SevaConnect',
      description: `Donation for ${categoryName}`,
      handler: () => {
        onSuccess(values.amount, values.name);
        toast({ title: "Payment Successful", description: "Thank you for your donation!" });
      },
      prefill: {
        name: values.name,
        email: values.email,
      },
    };
    
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  async function onSubmit(values: DonationFormValues) {
    setIsSubmitting(true);
    
    toast({
      title: "Processing your donation...",
      description: "Thank you for your generosity!",
      variant: "default",
    });

    // Call onSuccess immediately to show the local ThankYouDialog
    onSuccess(values.amount, values.name);
    
    // Submit the actual HTML form to FormSubmit.co in a new tab
    if (formRef.current) {
        const replyToInput = formRef.current.querySelector('input[name="_replyto"]') as HTMLInputElement | null;
        if (replyToInput) replyToInput.value = values.email;

        const subjectInput = formRef.current.querySelector('input[name="_subject"]') as HTMLInputElement | null;
        if (subjectInput) subjectInput.value = `New Donation: ${categoryName} - ${values.name}`;
        
        formRef.current.submit();
    }
    
    form.reset(); 
    setTimeout(() => setIsSubmitting(false), 1500);
  }

  return (
    <Form {...form}>
      <form 
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)} 
        action={`https://formsubmit.co/${recipientEmail}`}
        method="POST"
        target="_blank" // This will open FormSubmit.co page in a new tab
        className="space-y-6"
      >
        {/* Hidden fields for FormSubmit.co */}
        {/* _replyto and _subject will be dynamically set via formRef if needed, or rely on form.watch in JSX */}
        <input type="hidden" name="_replyto" value={form.getValues("email")} />
        <input type="hidden" name="_subject" value={`New Donation: ${categoryName} - ${form.getValues("name")}`} />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        {formSubmitRedirectUrl && <input type="hidden" name="_next" value={formSubmitRedirectUrl} />}
        
        <input type="hidden" name="type" value="Donation" />
        <input type="hidden" name="categoryName" value={categoryName} />
        {/* FormSubmit.co will also receive the 'amount' field from the visible input */}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="e.g. jane.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donation Amount (INR)</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    ₹
                  </span>
                  <Input type="number" placeholder="100" {...field} className="pl-7" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-3">
          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              `Donate ₹${form.watch('amount') || 0} via Form`
            )}
          </Button>
          
          <Button
            type="button"
            onClick={() => handleRazorpayPay(form.getValues())}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6"
            disabled={isSubmitting || !form.formState.isValid}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ₹${form.watch('amount') || 0} via Razorpay`
            )}
          </Button>
          
          <Button
            type="button"
            onClick={() => handleInstamojoPay(form.getValues())}
            className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
            disabled={isSubmitting || !form.formState.isValid}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ₹${form.watch('amount') || 0} via Instamojo`
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          You'll be directed to complete your submission in a new tab.
        </p>
      </form>
    </Form>
  );
};

export default DonationForm;
