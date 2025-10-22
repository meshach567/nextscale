// app/not-found.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl font-bold text-gray-900"
        >
          404
        </motion.h1>
        <p className="mt-4 text-lg text-gray-600">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/"
          className="mt-6 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          Go Back Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
