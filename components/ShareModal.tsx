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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm" backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex items-center gap-2">
          <Share className="h-5 w-5" />
          Share "{file.name}"
        </ModalHeader>
        <ModalBody className="space-y-4">
          {/* Password Protection */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-default-500" />
              <label className="text-sm font-medium">Password Protection (Optional)</label>
            </div>
            <Input
              type="password"
              placeholder="Enter password to protect the link"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="sm"
            />
            <p className="text-xs text-default-500">
              Leave empty for public access
            </p>
          </div>

          {/* Expiry Time */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-default-500" />
              <label className="text-sm font-medium">Link Expiration</label>
            </div>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="w-full justify-start"
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
              >
                {EXPIRY_OPTIONS.map((option) => (
                  <DropdownItem key={option.value.toString()}>
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* View Once Option */}
          <div className="flex items-center gap-2">
            <Checkbox
              isSelected={viewOnce}
              onValueChange={setViewOnce}
              size="sm"
            />
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-default-500" />
              <div>
                <label className="text-sm font-medium">View Once</label>
                <p className="text-xs text-default-500">
                  Link becomes invalid after first access
                </p>
              </div>
            </div>
          </div>

          {/* Show share link if available */}
          {shareLink && (
            <div className="mt-4 p-3 border border-default-300 rounded bg-default-100">
              <label className="block text-sm font-medium mb-1">Share Link</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareLink}
                  className="flex-grow bg-default-100 border border-default-300 rounded px-2 py-1 text-xs"
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
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter className="flex justify-end gap-2">
          <Button
            variant="flat"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={handleShare}
            isLoading={isLoading}
            startContent={!isLoading && <Share className="h-4 w-4" />}
          >
            {isLoading ? "Creating..." : "Create Share Link"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
