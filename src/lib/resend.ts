import { Resend } from 'resend';
import type { ContactFormData } from './utils/validation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactNotification(data: ContactFormData) {
  try {
    const fromAddress = `Contact Form <noreply@${process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '') || 'yourdomain.com'}>`;
    const toAddress = process.env.FROM_EMAIL;

    if (!toAddress) {
      throw new Error('Missing FROM_EMAIL environment variable');
    }

    const { data: emailData, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject: `New Contact Form Submission - ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #555; margin-bottom: 5px; }
              .value { background: white; padding: 12px; border-radius: 4px; border-left: 3px solid #667eea; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${data.name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                </div>
                ${data.company ? `
                <div class="field">
                  <div class="label">Company:</div>
                  <div class="value">${data.company}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Industry:</div>
                  <div class="value">${data.industry}</div>
                </div>
                <div class="field">
                  <div class="label">Project Type:</div>
                  <div class="value">${data.projectType}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      throw error;
    }

    return emailData;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
