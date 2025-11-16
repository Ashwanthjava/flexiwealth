'use server';

import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export async function sendContactEmail(values: FormValues) {
  try {
    const validatedData = formSchema.parse(values);
    
    // This is where you would integrate an email sending service
    // like Resend, SendGrid, or Nodemailer.
    // For now, we'll log it to the server console.
    
    const emailTarget = 'ask.flexiwealth@outlook.com';
    
    console.log('---- New Contact Form Submission ----');
    console.log(`Recipient: ${emailTarget}`);
    console.log(`From: ${validatedData.name} <${validatedData.email}>`);
    if (validatedData.phone) {
        console.log(`Phone: ${validatedData.phone}`);
    }
    console.log('Message:');
    console.log(validatedData.message);
    console.log('------------------------------------');
    
    // Example with Resend (if you were to install and configure it):
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Contact Form <onboarding@resend.dev>',
    //   to: emailTarget,
    //   subject: `New message from ${validatedData.name}`,
    //   reply_to: validatedData.email,
    //   html: `<p>Name: ${validatedData.name}</p><p>Email: ${validatedData.email}</p>${validatedData.phone ? `<p>Phone: ${validatedData.phone}</p>` : ''}<p>Message: ${validatedData.message}</p>`,
    // });

    return { success: true, message: 'Thank you for your message!' };

  } catch (error) {
    console.error('Error processing contact form:', error);
    if (error instanceof z.ZodError) {
      return { success: false, message: 'Validation failed.', errors: error.errors };
    }
    return { success: false, message: 'An unexpected error occurred.' };
  }
}
