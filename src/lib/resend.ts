import { ContactInput } from "@/utils/validation";
import { sendContactEmail } from "@/lib/smtp";

export async function sendContactNotification(data: ContactInput) {
  // shim to keep existing code paths working - send via SMTP
  try {
    const info = await sendContactEmail({
      name: data.name,
      email: data.email,
      company: data.company ?? null,
      industry: data.industry ?? null,
      projectType: data.projectType ?? null,
      message: data.message,
    });

    return info;
  } catch (err) {
    console.error("sendContactNotification error:", err);
    throw err;
  }
}

export default sendContactNotification;
