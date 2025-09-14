"use client";

import { useClerk, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { CloudUpload, ChevronDown, User, Menu, X } from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { Button } from "@heroui/button";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Check if we're on the dashboard page
  const isOnDashboard =
    pathname === "/dashboard" || pathname?.startsWith("/dashboard/");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle clicks outside the mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        // Check if the click is not on the menu button (which has its own handler)
        const target = event.target as HTMLElement;
        if (!target.closest('[data-menu-button="true"]')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = () => {
    signOut(() => {
      router.push("/");
    });
  };

  const { user } = useUser();

  // Process user data with defaults if not provided
  const userDetails = {
    fullName: user
      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : "",
    initials: user
      ? user.emailAddresses?.[0]?.emailAddress
        ? user.emailAddresses[0].emailAddress[0].toUpperCase()
        : "U"
      : "U",
    displayName: user
      ? user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.firstName || user.username || user.emailAddresses?.[0]?.emailAddress || "User"
      : "User",
    email: user?.emailAddresses?.[0]?.emailAddress || "",
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation items
  const navItems = [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md py-4" : "shadow-sm py-6"
      }`}
    >
  <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* Left: Logo and Droply text */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 z-10">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <CloudUpload className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Droply
              </span>
            </Link>
          </div>

          {/* Right: Navigation and user actions */}
          <div className="flex items-center gap-6">
            {/* Desktop Navigation Items */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeSwitcher />

              {/* User icon or dropdown */}
              <SignedOut>
                <Link href="/sign-in">
                  <Button
                    variant="light"
                    className="p-0 bg-transparent min-w-0 h-10"
                  >
                    <User className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  </Button>
                </Link>
              </SignedOut>

              <SignedIn>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      className="p-0 bg-transparent min-w-0 h-10"
                      endContent={<ChevronDown className="h-4 w-4 ml-1" />}
                    >
                      <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {userDetails.initials}
                      </div>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User actions" className="w-56">
                    <DropdownItem
                      key="profile"
                      description={userDetails.email || "View your profile"}
                      onClick={() => router.push("/dashboard?tab=profile")}
                    >
                      Profile
                    </DropdownItem>
                    <DropdownItem
                      key="files"
                      description="Manage your files"
                      onClick={() => router.push("/dashboard")}
                    >
                      My Files
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      description="Sign out of your account"
                      className="text-danger"
                      color="danger"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </SignedIn>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeSwitcher />
            <SignedOut>
              <Link href="/sign-in">
                <Button
                  variant="light"
                  className="p-0 bg-transparent min-w-0 h-10"
                >
                  <User className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {userDetails.initials}
              </div>
            </SignedIn>
            <button
              className="z-50 p-2"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              data-menu-button="true"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
          )}

            {/* Mobile Menu */}
            <div
              ref={mobileMenuRef}
              className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white dark:bg-gray-900 z-40 flex flex-col pt-20 px-6 shadow-xl transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
              } md:hidden`}
            >
              <div className="flex flex-col gap-1 mb-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <SignedOut>
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <Link
                    href="/sign-in"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="light" color="primary" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link
                    href="/sign-up"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="solid" color="primary" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </SignedOut>

            <SignedIn>
              <div className="flex flex-col gap-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                {/* User info */}
                <div className="flex items-center gap-3 py-4">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {userDetails.initials}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {userDetails.displayName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {userDetails.email}
                    </p>
                  </div>
                </div>

                {/* Navigation links */}
                <div className="flex flex-col gap-1">
                  {!isOnDashboard && (
                    <Link
                      href="/dashboard"
                      className="py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors font-medium text-gray-700 dark:text-gray-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href="/dashboard?tab=profile"
                    className="py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors font-medium text-gray-700 dark:text-gray-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="py-3 px-4 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors font-medium mt-2"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}