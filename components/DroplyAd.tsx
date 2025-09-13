"use client";

import Image from "next/image";

export default function DroplyAd() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-6 bg-gradient-to-r from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center">
      <div className="w-full">
        <div className="rounded-2xl shadow-lg bg-white dark:bg-gray-800 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Image Section */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
              <Image
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
                alt="Cloud storage illustration"
                fill
                style={{ objectFit: "cover" }}
                priority
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
          
          {/* Content Section */}
          <div className="flex-1 flex flex-col text-center md:text-left">
            <div className="mb-2">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                Enterprise Cloud Solution
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Secure Cloud Storage for Your Digital Assets
            </h2>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 font-medium">
              Enterprise-grade security meets seamless accessibility with Droply Cloud
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Powered by ImageKit and inspired by industry leaders, Droply Cloud provides military-grade encryption 
              for your images with intelligent organization and global CDN distribution. 
              Upload, manage, and share your digital assets with complete confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="/sign-up"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 transition-colors text-base"
              >
                Start Free Trial
              </a>
              <a
                href="/demo"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-base"
              >
                Request Demo
              </a>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Trusted by industry leaders</p>
              <div className="flex justify-center md:justify-start items-center space-x-6 opacity-70">
                <div className="h-6 w-6 relative">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="text-gray-700 dark:text-gray-300">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 2.5L20 7l-8 4-8-4 8-4.5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">SOC 2 Compliant</span>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">GDPR Ready</span>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">AES-256 Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}