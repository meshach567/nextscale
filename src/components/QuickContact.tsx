// ============================================
// FILE: components/BookACall.tsx
// ============================================

// ============================================
// FILE: components/QuickContact.tsx
// ============================================
import { Mail, MapPin, Phone } from "lucide-react";

export default function QuickContact() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP;
  const email = process.env.FROM_EMAIL;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">
        Quick Contact
      </h2>
      <div className="space-y-4">
        {whatsappNumber && (
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition group"
          >
            <Phone className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-medium text-slate-900">WhatsApp</div>
              <div className="text-sm text-slate-600">
                Chat with us instantly
              </div>
            </div>
          </a>
        )}

        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition group"
          >
            <Mail className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-medium text-slate-900">Email</div>
              <div className="text-sm text-slate-600">{email}</div>
            </div>
          </a>
        )}

        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
          <MapPin className="w-5 h-5 text-slate-600 mt-0.5" />
          <div>
            <div className="font-medium text-slate-900">Office</div>
            <div className="text-sm text-slate-600">
              123 Business Street
              <br />
              Lagos, Nigeria
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
