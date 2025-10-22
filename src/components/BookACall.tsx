"use client";

import { Calendar } from "lucide-react";
import { useState } from "react";

export default function BookACall() {
  const [showCalendly, setShowCalendly] = useState(false);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm border border-blue-100 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-slate-900">Book a Call</h2>
      </div>
      <p className="text-slate-600 mb-6">
        Schedule a 15-minute discovery call to discuss your project in detail.
      </p>

      {!showCalendly ? (
        <button
          type="button"
          onClick={() => setShowCalendly(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition"
        >
          Open Scheduler
        </button>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden border border-slate-200">
          <div className="relative w-full" style={{ paddingBottom: "800px" }}>
            <iframe
              src={calendlyUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              className="absolute top-0 left-0 w-full h-full"
              title="Schedule a call"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowCalendly(false)}
            className="w-full py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
          >
            Close Scheduler
          </button>
        </div>
      )}
    </div>
  );
}
