"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Share, Lock, Clock, Eye, Copy, Check } from "lucide-react";
import type { File } from "@/lib/db/schema";
import axios from "axios";
import { addToast } from "@heroui/toast";

interface ShareModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  file: File | null;
  userId: string;
}

interface ShareData {
  password?: string;
  expiry?: number;
  viewOnce?: boolean;
}

const EXPIRY_OPTIONS = [
  { label: "1 hour", value: 1 * 60 * 60 },
  { label: "24 hours", value: 24 * 60 * 60 },
  { label: "7 days", value: 7 * 24 * 60 * 60 },
  { label: "30 days", value: 30 * 24 * 60 * 60 },
  { label: "Never", value: 0 },
];

export default function ShareModal({
  isOpen,
  onOpenChange,
  file,
  userId,
}: ShareModalProps) {
  const [password, setPassword] = useState("");
  const [expiry, setExpiry] = useState<number>(24 * 60 * 60); // 24 hours
  const [viewOnce, setViewOnce] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setExpiry(24 * 60 * 60);
      setViewOnce(false);
      setIsLoading(false);
      setShareLink(null);
    }
  }, [isOpen]);

  const handleShare = async () => {
    if (!file) return;

    setIsLoading(true);
    try {
      const payload = {
        password: password || undefined,
        expiry: expiry || undefined,
        viewOnce,
      };

      const response = await axios.post(`/api/files/${file.id}/share`, payload);
      const shareLink = response.data.shareLink;
      setShareLink(shareLink);

      // Copy to clipboard automatically
      if (shareLink) {
        await navigator.clipboard.writeText(shareLink);
        addToast({
          title: "Share Link Created",
          description: "Link copied to clipboard! Share it with others.",
          color: "success",
        });
      }
    } catch (error: any) {
      console.error("Error sharing file:", error);
      const errorMessage = error.response?.data?.error || "Failed to create share link. Please try again.";
      addToast({
        title: "Share Failed",
        description: errorMessage,
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!file) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" backdrop="blur">
      <ModalContent className="border-2 border-white-400 rounded-lg shadow-xl transition-shadow duration-300 hover:shadow-2xl">
        <ModalHeader className="flex items-center gap-2 border-b-2 border-white-300 pb-3">
          <Share className="h-5 w-5 text-white-900 flex-shrink-0" />
          <span className="font-extrabold text-white-950 text-lg truncate">Share "{file.name}"</span>
        </ModalHeader>
        <ModalBody className="space-y-8 px-6 py-4">
          {/* Password Protection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-white-800" />
              <label className="text-sm font-bold text-white-900">Password Protection (Optional)</label>
            </div>
            <Input
              type="password"
              placeholder="Enter password to protect the link"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="sm"
              className="border-2 border-white-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-md"
            />
            <p className="text-xs text-white-600">
              Leave empty for public access
            </p>
          </div>

          {/* Expiry Time - Added margin to prevent dropdown overlap */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-white-800" />
              <label className="text-sm font-bold text-white-900">Link Expiration</label>
            </div>
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="w-full justify-start border-2 border-white-400 bg-white-100 transition-colors duration-200 hover:bg-white-200 hover:border-white-500 rounded-md"
                  size="sm"
                >
                  {EXPIRY_OPTIONS.find(option => option.value === expiry)?.label || "Select expiry"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Expiry options"
                selectedKeys={[expiry.toString()]}
                selectionMode="single"
                onSelectionChange={(keys: any) => {
                  const selected = Array.from(keys)[0] as string;
                  setExpiry(parseInt(selected));
                }}
                className=" border-2 border-white-400 shadow-lg rounded-md z-50"
                // Added style to ensure dropdown appears above other elements
                style={{ zIndex: 1000 }}
              >
                {EXPIRY_OPTIONS.map((option) => (
                  <DropdownItem key={option.value.toString()}>
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* View Once Option - Added extra margin to prevent overlap */}
          <div className="flex items-center gap-3 mt-6">
            <Checkbox
              isSelected={viewOnce}
              onValueChange={setViewOnce}
              size="sm"
            />
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-white-800" />
              <div>
                <label className="text-sm font-bold text-white-900">View Once</label>
                <p className="text-xs text-white-700">
                  Link becomes invalid after first access
                </p>
              </div>
            </div>
          </div>

          {/* Show share link if available */}
          {shareLink && (
            <div className="mt-5 p-4 border-2 border-white-400 rounded-lg bg-white-50 transition-shadow duration-300 hover:shadow-lg">
              <label className="block text-sm font-extrabold mb-2 text-white-900">Share Link</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  readOnly
                  value={shareLink}
                  className="flex-grow bg-white-50 border-2 border-white-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                  onFocus={(e) => e.target.select()}
                />
                <Button
                  variant="flat"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(shareLink);
                    addToast({
                      title: "Copied to Clipboard",
                      description: "Share link copied to clipboard.",
                      color: "success",
                    });
                  }}
                  startContent={<Copy className="h-4 w-4" />}
                  className="border-2 border-white-300 transition-colors duration-200 hover:bg-white-100 hover:border-white-400 rounded-md"
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter className="flex justify-end gap-3 border-t-2 border-white-300 pt-3 px-6 pb-4">
          <Button
            variant="flat"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="border-2 border-white-300 transition-colors duration-200 hover:bg-white-100 hover:border-white-400 rounded-md"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={handleShare}
            isLoading={isLoading}
            startContent={!isLoading && <Share className="h-4 w-4" />}
            className="border-2 border-primary-500 transition-colors duration-200 hover:bg-primary-700 hover:border-primary-600 rounded-md font-semibold"
          >
            {isLoading ? "Creating..." : "Create Share Link"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}