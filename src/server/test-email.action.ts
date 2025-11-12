"use server";

import { createElement } from 'react';
import { sendEmail } from './email';
import TestEmail from '@/components/emails/ContactEmail';

export const sendTestEmailAction = async ({name}: {name: string}) => {
  return await sendEmail({
    to: 'recipient@mail.com',
    subject: 'Test Email',
    component: createElement(TestEmail,{
        name: name,
        email: 'recipient@mail.com',
        message: 'This is a test email sent from sendTestEmailAction.',
    }),
  });
};
