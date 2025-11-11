"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ContactInput, contactSchema } from "../utils/validation";
import SuccessModal from "./SuccessModal";
//import { sendTestEmailAction } from '@/server/test-email.action'

const industries = [
  "Oil & Gas",
  "Banking/Fintech",
  "Real Estate",
  "Agriculture",
  "Telecoms",
  "Entertainment",
] as const;

const projectTypes = ["Website", "Dashboard", "Mobile App", "Other"] as const;

export default function ContactForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  // const onSubmit = async (data: ContactFormData) => {
  //   setIsSubmitting(true);
  //   setSubmitError(null);
  //   setSubmitSuccess(false);

  //   try {
  //     const response = await fetch("/api/contact", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await response.json();

  //     if (result.success) {
  //       throw new Error(result.error || "Something went wrong");
  //     }

  //     setSubmitSuccess(true);
  //     reset();

  //     // Hide success message after 10 seconds
  //     setTimeout(() => setSubmitSuccess(false), 10000);
  //   } catch (error) {
  //     console.error("Form submission error:", error);
  //     setSubmitError(
  //       error instanceof Error
  //         ? error.message
  //         : "Failed to submit form. Please try again.",
  //     );
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  async function onSubmit(values: ContactInput) {
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json?.error || "Submission failed");
      } else {
        reset();
        setOpen(true);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error");
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">
        Send us a message
      </h2>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-medium">
              Thanks — we received your message. We'll respond within 24 hours.
            </p>
          </div>
        </div>
      )}

      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-800 font-medium">{submitError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          {...register("projectType")}
          style={{ position: "absolute", left: "-9999px" }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
              errors.name ? "border-red-300" : "border-slate-300"
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
              errors.email ? "border-red-300" : "border-slate-300"
            }`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            {...register("company")}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Acme Inc."
          />
        </div>

        <div>
          <label
            htmlFor="industry"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            id="industry"
            {...register("industry")}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
              errors.industry ? "border-red-300" : "border-slate-300"
            }`}
          >
            <option value="">Select an industry</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          {errors.industry && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.industry.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="projectType"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Project Type <span className="text-red-500">*</span>
          </label>
          <select
            id="projectType"
            {...register("projectType")}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
              errors.projectType ? "border-red-300" : "border-slate-300"
            }`}
          >
            <option value="">Select a project type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.projectType.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            {...register("message")}
            rows={5}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none ${
              errors.message ? "border-red-300" : "border-slate-300"
            }`}
            placeholder="Tell us about your project..."
          />
          {errors.message && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
      <SuccessModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
