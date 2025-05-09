
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
import { Loader2, Award } from "lucide-react";

const membershipFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type MembershipFormValues = z.infer<typeof membershipFormSchema>;

const FIXED_MEMBERSHIP_AMOUNT = 1111;

interface MembershipFormProps {
  onSuccess: (memberName: string) => void;
}

const MembershipForm = ({ onSuccess }: MembershipFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [formSubmitRedirectUrl, setFormSubmitRedirectUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFormSubmitRedirectUrl(`${window.location.origin}/form-thank-you`);
    }
  }, []);

  const form = useForm<MembershipFormValues>({
    resolver: zodResolver(membershipFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const recipientEmail = "baapt2326@gmail.com"; 
  const categoryName = "SevaChampion Membership";

  async function onSubmit(values: MembershipFormValues) {
    setIsSubmitting(true);

    toast({
      title: "Processing your membership...",
      description: `Thank you, ${values.name}! Your application is being submitted.`,
      variant: "default",
    });
    
    // Call onSuccess immediately to trigger certificate modal display
    onSuccess(values.name); 

    // Submit the actual HTML form to FormSubmit.co in a new tab
    if (formRef.current) {
        // Manually update hidden fields before submission
        const replyToInput = formRef.current.querySelector('input[name="_replyto"]') as HTMLInputElement | null;
        if (replyToInput) replyToInput.value = values.email;

        const subjectInput = formRef.current.querySelector('input[name="_subject"]') as HTMLInputElement | null;
        if (subjectInput) subjectInput.value = `New Membership: ${categoryName} - ${values.name}`;
      
        formRef.current.submit();
    }
    
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
        <input type="hidden" name="_replyto" value={form.getValues("email")} />
        <input type="hidden" name="_subject" value={`New Membership: ${categoryName} - ${form.getValues("name")}`} />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        {formSubmitRedirectUrl && <input type="hidden" name="_next" value={formSubmitRedirectUrl} />}

        <input type="hidden" name="type" value="Membership" />
        <input type="hidden" name="categoryName" value={categoryName} />
        <input type="hidden" name="amount" value={FIXED_MEMBERSHIP_AMOUNT.toString()} />

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
        <FormItem>
          <FormLabel>Membership Fee (INR)</FormLabel>
          <FormControl>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                ₹
              </span>
              <Input type="number" value={FIXED_MEMBERSHIP_AMOUNT} readOnly className="pl-7 bg-muted/50 cursor-not-allowed" />
            </div>
          </FormControl>
        </FormItem>

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
            <>
              <Award className="mr-2 h-5 w-5" />
              Join for ₹{FIXED_MEMBERSHIP_AMOUNT}
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          You'll be directed to complete your submission in a new tab.
        </p>
      </form>
    </Form>
  );
};

export default MembershipForm;
