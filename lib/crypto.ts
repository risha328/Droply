// Client-side crypto utilities for E2EE
//lib/crypto.ts
// Generate RSA keypair
export async function generateRSAKeyPair(): Promise<{
  publicKey: CryptoKey;
  privateKey: CryptoKey;
}> {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",  // Algorithm: RSA Optimal Asymmetric Encryption Padding
      modulusLength: 2048,  // Key size: 2048 bits
      publicExponent: new Uint8Array([1, 0, 1]),  // Common value (65537)
      hash: "SHA-256", // Used for OAEP padding
    },
    true,   // Keys are extractable (can be exported)
    ["encrypt", "decrypt"]  // Public key encrypts, private key decrypts
  );

  return {
    publicKey: keyPair.publicKey,
    privateKey: keyPair.privateKey,
  };
}

// Export public key to PEM format
export async function exportPublicKey(publicKey: CryptoKey): Promise<string> {
  const exported = await crypto.subtle.exportKey("spki", publicKey);
  const exportedAsString = String.fromCharCode(...new Uint8Array(exported));
  const exportedAsBase64 = btoa(exportedAsString);
  return `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
}

// Import public key from PEM format
export async function importPublicKey(pem: string): Promise<CryptoKey> {
  const pemContents = pem.replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\n/g, "");
  const binaryDer = atob(pemContents);
  const binaryDerArray = new Uint8Array(binaryDer.length);
  for (let i = 0; i < binaryDer.length; i++) {
    binaryDerArray[i] = binaryDer.charCodeAt(i);
  }

  return crypto.subtle.importKey(
    "spki",
    binaryDerArray,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]  // Public key is only for encryption
  );
}

// Export private key to base64 for localStorage
export async function exportPrivateKey(privateKey: CryptoKey): Promise<string> {
  const exported = await crypto.subtle.exportKey("pkcs8", privateKey);
  return btoa(String.fromCharCode(...new Uint8Array(exported)));
}

// Import private key from base64
export async function importPrivateKey(base64: string): Promise<CryptoKey> {
  const binaryDer = atob(base64);
  const binaryDerArray = new Uint8Array(binaryDer.length);
  for (let i = 0; i < binaryDer.length; i++) {
    binaryDerArray[i] = binaryDer.charCodeAt(i);
  }

  return crypto.subtle.importKey(
    "pkcs8",
    binaryDerArray,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"]  // Private key is only for decryption
  );
}

// Generate random AES key
export async function generateAESKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey(
    {
      name: "AES-GCM",  // Algorithm: AES in Galois/Counter Mode
      length: 256,  // Key size: 256 bits
    },
    true,  // Key is extractable (can be exported)
    ["encrypt", "decrypt"]  // Key can be used for both encryption and decryption
  );
}

// Encrypt data with AES-GCM
export async function encryptWithAES(key: CryptoKey, data: ArrayBuffer): Promise<{
  encrypted: ArrayBuffer;
  iv: Uint8Array;
}> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    data
  );

  return { encrypted, iv };
}

// Decrypt data with AES-GCM
export async function decryptWithAES(
  key: CryptoKey,
  encrypted: ArrayBuffer,
  iv: Uint8Array
): Promise<ArrayBuffer> {
  return crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encrypted
  );
}

// Encrypt AES key with RSA public key
export async function encryptAESKeyWithRSA(
  publicKey: CryptoKey,
  aesKey: CryptoKey
): Promise<string> {
  const exportedAESKey = await crypto.subtle.exportKey("raw", aesKey);
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    exportedAESKey
  );

  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

// Decrypt AES key with RSA private key
export async function decryptAESKeyWithRSA(
  privateKey: CryptoKey,
  encryptedAESKey: string
): Promise<CryptoKey> {
  const encrypted = Uint8Array.from(
    atob(encryptedAESKey), c => c.charCodeAt(0)
  );

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    privateKey,
    encrypted
  );

  return crypto.subtle.importKey(
    "raw",
    decrypted,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

// Encrypt file with AES
export async function encryptFile(file: File): Promise<{
  encryptedFile: Blob;
  aesKey: CryptoKey;
  iv: Uint8Array;
}> {
  const aesKey = await generateAESKey();
  const fileData = await file.arrayBuffer();
  const { encrypted, iv } = await encryptWithAES(aesKey, fileData);

  const encryptedFile = new Blob([encrypted], { type: file.type });

  return { encryptedFile, aesKey, iv };
}

// Decrypt file with AES
export async function decryptFile(
  encryptedData: ArrayBuffer,
  aesKey: CryptoKey,
  iv: Uint8Array,
  mimeType: string
): Promise<Blob> {
  const decrypted = await decryptWithAES(aesKey, encryptedData, iv);
  return new Blob([decrypted], { type: mimeType });
}
