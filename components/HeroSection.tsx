"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@heroui/button";
import { ArrowRight, Image as ImageIcon, Shield, Zap, Lock, Cloud } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 px-4 md:px-6 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
      {/* Background elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 dark:bg-blue-700/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-700/10 rounded-full blur-3xl"></div>
      
      <div className="w-full relative z-10">
        <div className="flex flex-col lg:flex-row w-full gap-12 md:gap-16 items-center justify-between px-0">
          <div className="space-y-8 text-center lg:text-left w-full lg:w-1/2 px-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <Shield className="h-4 w-4 mr-2" />
              Trusted by professionals worldwide
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Cloud Storage</span> for Your Creative Assets
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed">
              Enterprise-grade image management with unparalleled security and performance.
            </p>
            
            <div className="grid grid-cols-3 gap-6 py-4">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-2">
                  <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Lightning Fast</p>
              </div>
              
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-2">
                  <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Bank-Level Security</p>
              </div>
              
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-2">
                  <Cloud className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Always Available</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <SignedOut>
                <Link href="/sign-up" className="flex">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-base font-medium"
                  >
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/sign-in" className="flex">
                  <Button 
                    size="lg" 
                    variant="flat" 
                    className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-6 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    Sign In
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="flex">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-base font-medium"
                    endContent={<ArrowRight className="h-5 w-5 ml-1" />}
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              </SignedIn>
            </div>
            
            <div className="pt-6 text-sm text-gray-500 dark:text-gray-400">
              No credit card required • 14-day free trial • Cancel anytime
            </div>
          </div>

          <div className="flex justify-center order-first lg:order-last w-full lg:w-1/2 px-8">
            <div className="relative w-full max-w-lg h-80 md:h-96">
              {/* Main gradient circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-400/10 dark:to-indigo-400/10 rounded-3xl transform rotate-3"></div>
              
              {/* Floating card 1 */}
              <div className="absolute -top-4 -right-4 md:-right-8 w-32 h-32 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 transform rotate-6 border border-gray-100 dark:border-gray-700">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              
              {/* Floating card 2 */}
              <div className="absolute -bottom-4 -left-4 md:-left-8 w-28 h-28 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 transform -rotate-6 border border-gray-100 dark:border-gray-700">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg flex items-center justify-center">
                  <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              
              {/* Central illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48 md:w-56 md:h-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 border border-gray-100 dark:border-gray-700">
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl flex flex-col items-center justify-center p-4">
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="w-6 h-6 bg-blue-400 rounded"></div>
                      <div className="w-6 h-6 bg-indigo-400 rounded"></div>
                      <div className="w-6 h-6 bg-indigo-400 rounded"></div>
                      <div className="w-6 h-6 bg-blue-400 rounded"></div>
                    </div>
                    <ImageIcon className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-2" />
                    <div className="h-2 w-16 bg-blue-300 dark:bg-blue-600 rounded-full mb-1"></div>
                    <div className="h-2 w-12 bg-blue-200 dark:bg-blue-700 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}