// components/SuccessModal.tsx
"use client"

import * as React from "react"

export default function SuccessModal({ open, onOpenChange }: { open: boolean, onOpenChange: (v:boolean) => void }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close modal"
        tabIndex={0}
        onClick={() => onOpenChange(false)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            onOpenChange(false)
          }
        }}
      />

      <div className="relative bg-white rounded-lg p-6 max-w-md mx-4 shadow-lg">
        <h3 className="text-xl font-semibold">Message sent</h3>
        <p className="mt-2 text-slate-600">Thanks — we received your message. We’ll get back to you within 24 hours.</p>
        <div className="mt-4 flex justify-end">
          <button type="button" onClick={() => onOpenChange(false)} className="px-4 py-2 bg-blue-600 text-white rounded">Close</button>
        </div>
      </div>
    </div>
  )
}
