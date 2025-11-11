"server-only";

import { ADMIN_EMAIL } from '../lib/consts.server';
import { render } from '@react-email/components';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ReactElement } from 'react';

let transporter: Transporter<SMTPTransport.SentMessageInfo> | null = null;

const getTransporter = (): Transporter<SMTPTransport.SentMessageInfo> => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_SMPT_HOST as string,
      port: parseInt(process.env.NEXT_PUBLIC_SMPT_PORT as string),
      secure: false, // Set to true for TLS
      auth: {
        user: process.env.NEXT_PUBLIC_SMPT_USER as string,
        pass: process.env.NEXT_PUBLIC_SMPT_PASS as string,
      },
    } as SMTPTransport.Options);
  }
  return transporter;
};

export const sendEmail = async ({
  to,
  subject,
  component,
}: {
  to: string;
  subject: string;
  component: ReactElement;
}) => {
  const transport = getTransporter();

  const emailHtml = await render(component);

  return transport.sendMail({
    from: ADMIN_EMAIL,
    to: to,
    subject: subject,
    html: emailHtml,
  });
};