import { Button } from "@heroui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import {
  CloudUpload,
  Shield,
  Folder,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DroplyAd from "@/components/DroplyAd";
import WhatWeGot from "@/components/WhatWeGot";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-default-50">
      {/* Use the unified Navbar component */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section */}
        <HeroSection />

  {/* Droply Ad section */}
  <DroplyAd />

  {/* What We Got CTA section */}
  <WhatWeGot />

        {/* What You Get section */}
        {/* <section className="py-16 md:py-20 px-4 md:px-6 bg-default-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-default-900">
                What You Get
              </h2>
              <p className="text-lg text-default-600 max-w-2xl mx-auto">
                Droply is designed for creators, photographers, and anyone who values privacy and speed. Here’s what makes us different:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <Card className="border border-default-200 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardBody className="p-8 text-center">
                  <CloudUpload className="h-12 md:h-14 w-12 md:w-14 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 text-default-900">
                    Lightning Uploads
                  </h3>
                  <p className="text-default-600">Drag, drop, and your images are instantly stored in the cloud.</p>
                </CardBody>
              </Card>
              <Card className="border border-default-200 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardBody className="p-8 text-center">
                  <Folder className="h-12 md:h-14 w-12 md:w-14 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 text-default-900">
                    Smart Organization
                  </h3>
                  <p className="text-default-600">Folders, tags, and search help you find your images fast.</p>
                </CardBody>
              </Card>
              <Card className="border border-default-200 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardBody className="p-8 text-center">
                  <Shield className="h-12 md:h-14 w-12 md:w-14 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 text-default-900">
                    Privacy First
                  </h3>
                  <p className="text-default-600">Your images are encrypted and only accessible by you.</p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section> */}

        {/* CTA section */}
        <section className="py-12 md:py-20 px-4 md:px-6 bg-default-50">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-default-900">
              Ready?
            </h2>
            <SignedOut>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    variant="solid"
                    color="primary"
                    endContent={<ArrowRight className="h-4 w-4" />}
                  >
                    Let's Go
                  </Button>
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="solid"
                  color="primary"
                  endContent={<ArrowRight className="h-4 w-4" />}
                >
                  Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </section>
      </main>

      {/* Professional footer */}
      {/* <footer className="bg-default-50 border-t border-default-200 py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <CloudUpload className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold">Droply</h2>
          </div>
          <p className="text-default-500 text-sm">&copy; 2025 Droply. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
}