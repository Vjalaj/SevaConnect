'use server';

import { z } from 'zod';

const detailsSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50),
  email: z.string().email({ message: "Please enter a valid email address." }),
  amount: z.coerce.number().min(1, { message: "Amount must be at least ₹1." }),
  categoryName: z.string().min(1, { message: "Category name is required." }),
  type: z.enum(['Donation', 'Membership']),
  // Fields for formsubmit.co, to be included as hidden inputs in client form
  _replyto: z.string().email().optional(),
  _subject: z.string().optional(),
  _next: z.string().url().optional(), // Optional: URL to redirect after submission
  _captcha: z.string().optional(),
  _template: z.string().optional(),
});

export type FormSubmitDetailsInput = z.infer<typeof detailsSchema>;

// This server action can be used for server-side validation if desired,
// but it does not send emails. Email sending is handled by client-side forms
// POSTing directly to FormSubmit.co.
export async function validateDetailsForFormSubmit(details: FormSubmitDetailsInput) {
  const validatedDetails = detailsSchema.safeParse(details);

  if (!validatedDetails.success) {
    console.error("Server-side validation failed:", validatedDetails.error.flatten().fieldErrors);
    return { success: false, error: "Validation failed.", errors: validatedDetails.error.flatten().fieldErrors };
  }
  
  console.log("Details validated server-side (if this action was called):", validatedDetails.data);
  return { 
    success: true, 
    data: validatedDetails.data,
    message: "Details validated server-side." 
  };
}
