"use client";

import { CloudUpload, Folder, Shield, Zap, Search, Lock } from "lucide-react";
import { useState, useEffect } from "react";

export default function WhatWeGot() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="w-full py-16 md:py-24 px-4 md:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-xl bg-white dark:bg-gray-800 p-8 h-64 animate-pulse">
                <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full mb-4 mx-auto"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mx-auto mb-1"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Enterprise-Grade Features
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Droply is engineered for professionals who demand both performance and privacy. 
            Our cutting-edge platform combines speed with security for unparalleled media management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group rounded-xl bg-white dark:bg-gray-800 p-8 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:shadow-blue-900/10">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full scale-125 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-full text-white">
                <CloudUpload className="h-8 w-8" />
              </div>
              <Zap className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1" fill="currentColor" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Lightning-Fast Uploads
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Advanced CDN integration ensures your media files are transferred and available globally in milliseconds.
            </p>
          </div>
          
          <div className="group rounded-xl bg-white dark:bg-gray-800 p-8 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:shadow-blue-900/10">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full scale-125 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-full text-white">
                <Folder className="h-8 w-8" />
              </div>
              <Search className="h-5 w-5 text-blue-400 absolute -top-1 -right-1" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Intelligent Organization
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              AI-powered categorization and metadata extraction automatically organize your assets for rapid retrieval.
            </p>
          </div>
          
          <div className="group rounded-xl bg-white dark:bg-gray-800 p-8 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:shadow-blue-900/10">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full scale-125 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-full text-white">
                <Shield className="h-8 w-8" />
              </div>
              <Lock className="h-5 w-5 text-green-400 absolute -top-1 -right-1" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Zero-Knowledge Encryption
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Military-grade encryption ensures your intellectual property remains exclusively accessible to authorized users.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <button className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-300 shadow-md hover:shadow-lg">
            Explore All Features
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}