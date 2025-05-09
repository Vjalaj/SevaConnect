
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

  const recipientEmail = "baapt2326@gmail.com"; 

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
    // This happens after our local modal logic has initiated.
    // The form has target="_blank" so this will open a new tab.
    if (formRef.current) {
        // We need to ensure hidden fields are populated with latest react-hook-form values
        // Manually update hidden fields before submission if they depend on form.watch()
        const replyToInput = formRef.current.querySelector('input[name="_replyto"]') as HTMLInputElement | null;
        if (replyToInput) replyToInput.value = values.email;

        const subjectInput = formRef.current.querySelector('input[name="_subject"]') as HTMLInputElement | null;
        if (subjectInput) subjectInput.value = `New Donation: ${categoryName} - ${values.name}`;
        
        formRef.current.submit();
    }
    
    // Reset form on the original page
    form.reset(); 
    // setIsSubmitting(false); // Keep button disabled or in loading state briefly
    setTimeout(() => setIsSubmitting(false), 1500); // Re-enable after a short delay
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
            `Donate ₹${form.watch('amount') || 0} Now`
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          You'll be directed to complete your submission in a new tab.
        </p>
      </form>
    </Form>
  );
};

export default DonationForm;
