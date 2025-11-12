import nodemailer from "nodemailer";

type Contact = {
  name: string;
  email: string;
  company?: string | null;
  industry?: string | null;
  projectType?: string | null;
  message: string;
};

export async function sendContactEmail(contact: Contact) {
  const host = process.env.SMTP_HOST ?? "";
  const port = Number(process.env.SMTP_PORT ?? "0");
  const user = process.env.SMTP_USER ?? "";
  const pass = process.env.SMTP_PASS ?? "";
  const from = (process.env.FROM_EMAIL ?? user) || "no-reply@example.com";
  const to = (process.env.TO_EMAIL ?? user) || "owner@example.com";

  if (!host || !port || !user || !pass) {
    console.warn("SMTP config missing; skipping sendContactEmail");
    return null;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  const subject = `New contact from ${contact.name}`;

  const text = `Name: ${contact.name}\nEmail: ${contact.email}\nCompany: ${contact.company ?? "-"}\nIndustry: ${contact.industry ?? "-"}\nProject type: ${contact.projectType ?? "-"}\n\nMessage:\n${contact.message}`;

  // Build a simple HTML email. Rendering React email templates server-side
  // using react-dom/server can cause ESM/runtime issues in some Next.js
  // environments (and requires a renderer package). For a small, safe,
  // dependable fallback we'll use a straightforward HTML template here.

  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { font-family: Arial, sans-serif; background-color: #f9f9f9; }
          .card { background: #fff; padding: 20px; border-radius: 8px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>New contact from ${escapeHtml(contact.name)}</h2>
          <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(contact.company ?? "-")}</p>
          <p><strong>Industry:</strong> ${escapeHtml(contact.industry ?? "-")}</p>
          <p><strong>Project type:</strong> ${escapeHtml(contact.projectType ?? "-")}</p>
          <hr />
          <div>${escapeHtml(contact.message).replace(/\n/g, "<br/>")}</div>
        </div>
      </body>
    </html>
  `;

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  return info;
}

// Minimal HTML escaper to avoid accidental injection in the email body
function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
