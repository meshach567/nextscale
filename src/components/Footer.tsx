import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">BL</span>
              </div>
              <span className="text-2xl font-bold">BuiltAndLaunch</span>
            </div>
            <p className="text-background/80 mb-6 max-w-md leading-relaxed">
              Building digital empires for Nigeria's most successful companies.
              From concept to launch, we deliver platforms that drive real
              business growth.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-background/10 hover:bg-primary transition-colors flex items-center justify-center"
                aria-label="Twitter"
              >
                <span className="text-sm font-medium">𝕏</span>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-background/10 hover:bg-primary transition-colors flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <span className="text-sm font-medium">in</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-background/10 hover:bg-primary transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <span className="text-sm font-medium">📷</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-background/80 hover:text-background transition-colors"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-background/80 hover:text-background transition-colors"
              >
                Services
              </Link>
              <Link
                href="/portfolio"
                className="text-background/80 hover:text-background transition-colors"
              >
                Portfolio
              </Link>
              <Link
                href="/industries"
                className="text-background/80 hover:text-background transition-colors"
              >
                Industries
              </Link>
              <Link
                href="/about"
                className="text-background/80 hover:text-background transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-background/80 hover:text-background transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Contact Info</h3>
            <div className="space-y-3">
              <p className="text-background/80">📍 Lagos, Nigeria</p>
              <p className="text-background/80">📧 hello@builtandlaunch.com</p>
              <p className="text-background/80">📞 +234 800 000 0000</p>
              <p className="text-background/80">🕒 Mon - Fri, 9AM - 6PM WAT</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-background/80">
            &copy; 2025 BuiltAndLaunch. All rights reserved. |
            <Link
              href="/privacy"
              className="hover:text-background transition-colors ml-2"
            >
              Privacy Policy
            </Link>{" "}
            |
            <Link
              href="/terms"
              className="hover:text-background transition-colors ml-2"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
