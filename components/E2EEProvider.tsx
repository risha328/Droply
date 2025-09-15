//droply/components/E2EEProvider.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  generateRSAKeyPair,
  exportPublicKey,
  exportPrivateKey,
  importPrivateKey,
} from "@/lib/crypto";

const PRIVATE_KEY_STORAGE_KEY = "droply_private_key";

export function E2EEProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const initializeKeys = async () => {
      try {
        // Check if private key already exists in localStorage
        const storedPrivateKey = localStorage.getItem(PRIVATE_KEY_STORAGE_KEY);

        if (storedPrivateKey) {
          // Verify the key can be imported
          await importPrivateKey(storedPrivateKey);
          setIsInitialized(true);
          return;
        }

        // Generate new RSA keypair
        const { publicKey, privateKey } = await generateRSAKeyPair();

        // Export keys
        const publicKeyPEM = await exportPublicKey(publicKey);
        const privateKeyBase64 = await exportPrivateKey(privateKey);

        // Store private key in localStorage
        localStorage.setItem(PRIVATE_KEY_STORAGE_KEY, privateKeyBase64);

        // Send public key to server
        const response = await fetch("/api/keys", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ publicKey: publicKeyPEM }),
        });

        if (!response.ok) {
          throw new Error("Failed to save public key");
        }

        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize E2EE keys:", error);
        // For now, continue without E2EE if key generation fails
        setIsInitialized(true);
      }
    };

    initializeKeys();
  }, [user, isLoaded]);

  if (!isLoaded || !isInitialized) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return <>{children}</>;
}
