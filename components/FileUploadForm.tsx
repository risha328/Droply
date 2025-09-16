// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Button } from "@heroui/button";
// import { Progress } from "@heroui/progress";
// import { Input } from "@heroui/input";
// import {
//   Upload,
//   X,
//   FileUp,
//   AlertTriangle,
//   FolderPlus,
//   ArrowRight,
// } from "lucide-react";
// import { addToast } from "@heroui/toast";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from "@heroui/modal";
// import axios from "axios";
// import {
//   generateRSAKeyPair,
//   generateAESKey,
//   encryptFile,
//   encryptAESKeyWithRSA,
//   exportPrivateKey,
//   exportPublicKey,
//   importPublicKey,
// } from "@/lib/crypto";

// interface FileUploadFormProps {
//   userId: string;
//   onUploadSuccess?: () => void;
//   currentFolder?: string | null;
// }

// export default function FileUploadForm({
//   userId,
//   onUploadSuccess,
//   currentFolder = null,
// }: FileUploadFormProps) {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Folder creation state
//   const [folderModalOpen, setFolderModalOpen] = useState(false);
//   const [folderName, setFolderName] = useState("");
//   const [creatingFolder, setCreatingFolder] = useState(false);

//   // E2EE state
//   const [publicKey, setPublicKey] = useState<CryptoKey | null>(null);
//   const [keysInitialized, setKeysInitialized] = useState(false);

//   useEffect(() => {
//     initializeKeys();
//   }, [userId]);

//   const initializeKeys = async () => {
//     try {
//       const privateKeyBase64 = localStorage.getItem(`privateKey_${userId}`);

//       if (!privateKeyBase64) {
//         // Generate new keypair
//         const { publicKey: pubKeyCrypto, privateKey: privKeyCrypto } = await generateRSAKeyPair();
//         const priv = await exportPrivateKey(privKeyCrypto);
//         localStorage.setItem(`privateKey_${userId}`, priv);
//         const pub = await exportPublicKey(pubKeyCrypto);

//         // Send public key to server
//         await axios.post("/api/keys", { publicKey: pub });

//         setPublicKey(pubKeyCrypto);
//       } else {
//         try {
//           // Get public key from server
//           const response = await axios.get("/api/keys");
//           const pubPem = response.data.publicKey;
//           const pubKeyCrypto = await importPublicKey(pubPem);
//           setPublicKey(pubKeyCrypto);
//         } catch (getError: any) {
//           // If GET fails (e.g., 404), regenerate keys
//           console.warn("Public key not found on server, regenerating keys");
//           const { publicKey: pubKeyCrypto, privateKey: privKeyCrypto } = await generateRSAKeyPair();
//           const priv = await exportPrivateKey(privKeyCrypto);
//           localStorage.setItem(`privateKey_${userId}`, priv);
//           const pub = await exportPublicKey(pubKeyCrypto);

//           // Send public key to server
//           await axios.post("/api/keys", { publicKey: pub });

//           setPublicKey(pubKeyCrypto);
//         }
//       }

//       setKeysInitialized(true);
//     } catch (error) {
//       console.error("Error initializing keys:", error);
//       setError("Failed to initialize encryption keys");
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0];

//       // Validate file size (5MB limit)
//       if (selectedFile.size > 5 * 1024 * 1024) {
//         setError("File size exceeds 5MB limit");
//         return;
//       }

//       setFile(selectedFile);
//       setError(null);
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const droppedFile = e.dataTransfer.files[0];

//       // Validate file size (5MB limit)
//       if (droppedFile.size > 5 * 1024 * 1024) {
//         setError("File size exceeds 5MB limit");
//         return;
//       }

//       setFile(droppedFile);
//       setError(null);
//     }
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   const clearFile = () => {
//     setFile(null);
//     setError(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleUpload = async () => {
//     if (!file || !publicKey) return;

//     setUploading(true);
//     setProgress(0);
//     setError(null);

//     try {
//       // Encrypt the file
//       const { encryptedFile, aesKey: aesKeyCrypto, iv } = await encryptFile(file);

//       // Encrypt AES key with RSA public key
//       const encryptedAESKey = await encryptAESKeyWithRSA(publicKey, aesKeyCrypto);

//       // Use encrypted file blob
//       const encryptedBlob = encryptedFile;

//       // Prepare form data with encrypted file and encrypted AES key
//       const formData = new FormData();
//       formData.append("file", encryptedBlob, file.name);
//       formData.append("userId", userId);
//       formData.append("encryptedAesKey", encryptedAESKey);
//       if (currentFolder) {
//         formData.append("parentId", currentFolder);
//       }

//       await axios.post("/api/files/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         onUploadProgress: (progressEvent) => {
//           if (progressEvent.total) {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setProgress(percentCompleted);
//           }
//         },
//       });

//       addToast({
//         title: "Upload Successful",
//         description: `${file.name} has been uploaded securely.`,
//         color: "success",
//       });

//       // Clear the file after successful upload
//       clearFile();

//       // Call the onUploadSuccess callback if provided
//       if (onUploadSuccess) {
//         onUploadSuccess();
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setError("Failed to upload file. Please try again.");
//       addToast({
//         title: "Upload Failed",
//         description: "We couldn't upload your file. Please try again.",
//         color: "danger",
//       });
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleCreateFolder = async () => {
//     if (!folderName.trim()) {
//       addToast({
//         title: "Invalid Folder Name",
//         description: "Please enter a valid folder name.",
//         color: "danger",
//       });
//       return;
//     }

//     setCreatingFolder(true);

//     try {
//       await axios.post("/api/folder/create", {
//         name: folderName.trim(),
//         userId: userId,
//         parentId: currentFolder,
//       });

//       addToast({
//         title: "Folder Created",
//         description: `Folder "${folderName}" has been created successfully.`,
//         color: "success",
//       });

//       // Reset folder name and close modal
//       setFolderName("");
//       setFolderModalOpen(false);

//       // Call the onUploadSuccess callback to refresh the file list
//       if (onUploadSuccess) {
//         onUploadSuccess();
//       }
//     } catch (error) {
//       console.error("Error creating folder:", error);
//       addToast({
//         title: "Folder Creation Failed",
//         description: "We couldn't create the folder. Please try again.",
//         color: "danger",
//       });
//     } finally {
//       setCreatingFolder(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {/* Action buttons */}
//       <div className="flex gap-2 mb-2">
//         <Button
//           color="primary"
//           variant="flat"
//           startContent={<FolderPlus className="h-4 w-4" />}
//           onClick={() => setFolderModalOpen(true)}
//           className="flex-1"
//         >
//           New Folder
//         </Button>
//         <Button
//           color="primary"
//           variant="flat"
//           startContent={<FileUp className="h-4 w-4" />}
//           onClick={() => fileInputRef.current?.click()}
//           className="flex-1"
//           isDisabled={!keysInitialized}
//         >
//           Add Image
//         </Button>
//       </div>

//       {/* File drop area */}
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
//           error
//             ? "border-danger/50 bg-danger/10 shadow-inner"
//             : file
//               ? "border-primary/50 bg-primary/10 shadow-lg"
//               : "border-default-300 hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
//         }`}
//       >
//         {!file ? (
//           <div className="space-y-3">
//             <FileUp className="h-12 w-12 mx-auto text-primary/70" />
//             <div>
//               <p className="text-default-600">
//                 Drag and drop your image here, or{" "}
//                 <button
//                   type="button"
//                   onClick={() => fileInputRef.current?.click()}
//                   className="text-primary cursor-pointer font-medium inline bg-transparent border-0 p-0 m-0"
//                   disabled={!keysInitialized}
//                 >
//                   browse
//                 </button>
//               </p>
//               <p className="text-xs text-default-500 mt-1">
//                 Images up to 5MB • End-to-End Encrypted
//               </p>
//             </div>
//             <Input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleFileChange}
//               className="hidden"
//               accept="image/*"
//               disabled={!keysInitialized}
//             />
//             {!keysInitialized && (
//               <p className="text-xs text-default-400">Initializing encryption...</p>
//             )}
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {/* Image Preview */}
//             {file.type.startsWith('image/') && (
//               <div className="flex justify-center">
//                 <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-default-200 shadow-sm">
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt="Preview"
//                     className="w-full h-full object-cover"
//                     onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
//                   />
//                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                     <span className="text-white text-xs font-medium">Preview</span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3 flex-1 min-w-0">
//                 <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
//                   <FileUp className="h-5 w-5 text-primary" />
//                 </div>
//                 <div className="text-left min-w-0 flex-1">
//                   <p className="text-sm font-semibold truncate text-default-900">
//                     {file.name}
//                   </p>
//                   <p className="text-xs text-default-500">
//                     {file.size < 1024
//                       ? `${file.size} B`
//                       : file.size < 1024 * 1024
//                         ? `${(file.size / 1024).toFixed(1)} KB`
//                         : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
//                     • {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
//                   </p>
//                 </div>
//               </div>
//               <Button
//                 isIconOnly
//                 variant="light"
//                 size="sm"
//                 onClick={clearFile}
//                 className="text-default-500 hover:text-danger flex-shrink-0"
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>

//             {error && (
//               <div className="bg-danger-5 text-danger-700 p-3 rounded-lg flex items-center gap-2">
//                 <AlertTriangle className="h-4 w-4" />
//                 <span className="text-sm">{error}</span>
//               </div>
//             )}

//             {uploading && (
//               <Progress
//                 value={progress}
//                 color="primary"
//                 size="sm"
//                 showValueLabel={true}
//                 className="max-w-full"
//               />
//             )}

//             <Button
//               color="primary"
//               startContent={<Upload className="h-4 w-4" />}
//               endContent={!uploading && <ArrowRight className="h-4 w-4" />}
//               onClick={handleUpload}
//               isLoading={uploading}
//               className="w-full"
//               isDisabled={!!error}
//             >
//               {uploading ? `Uploading... ${progress}%` : "Upload Securely"}
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Upload tips */}
//       <div className="bg-default-100/5 p-4 rounded-lg">
//         <h4 className="text-sm font-medium mb-2">Security</h4>
//         <ul className="text-xs text-default-600 space-y-1">
//           <li>• Files are encrypted end-to-end before upload</li>
//           <li>• Only you can decrypt your files</li>
//           <li>• Images are private and only visible to you</li>
//           <li>• Supported formats: JPG, PNG, GIF, WebP</li>
//           <li>• Maximum file size: 5MB</li>
//         </ul>
//       </div>

//       {/* Create Folder Modal */}
//       <Modal
//         isOpen={folderModalOpen}
//         onOpenChange={setFolderModalOpen}
//         backdrop="blur"
//         size="md"
//         classNames={{
//           base: "border border-default-200 bg-background",
//           header: "border-b border-default-200 pb-4",
//           footer: "border-t border-default-200 pt-4",
//           body: "py-6",
//         }}
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">
//                 <div className="flex items-center gap-2">
//                   <FolderPlus className="h-5 w-5 text-primary" />
//                   <span className="text-lg font-semibold">Create New Folder</span>
//                 </div>
//                 <p className="text-sm text-default-500 font-normal mt-1">
//                   Organize your files by creating a new folder
//                 </p>
//               </ModalHeader>
//               <ModalBody>
//                 <div className="flex flex-col gap-2">
//                   <label htmlFor="folderName" className="text-sm font-medium text-default-600">
//                     Folder Name
//                   </label>
//                   <Input
//                     id="folderName"
//                     type="text"
//                     placeholder="Enter folder name"
//                     value={folderName}
//                     onChange={(e) => setFolderName(e.target.value)}
//                     autoFocus
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter" && folderName.trim()) {
//                         handleCreateFolder();
//                       }
//                     }}
//                     classNames={{
//                       input: "text-base",
//                       mainWrapper: "w-full"
//                     }}
//                   />
//                 </div>
//               </ModalBody>
//               <ModalFooter>
//                 <Button
//                   variant="flat"
//                   color="default"
//                   onPress={onClose}
//                   className="font-medium"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   color="primary"
//                   onPress={handleCreateFolder}
//                   isLoading={creatingFolder}
//                   isDisabled={!folderName.trim()}
//                   className="font-medium"
//                   endContent={!creatingFolder && <ArrowRight className="h-4 w-4" />}
//                 >
//                   Create Folder
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }


"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { Input } from "@heroui/input";
import {
  Upload,
  X,
  FileUp,
  AlertTriangle,
  FolderPlus,
  ArrowRight,
  Shield,
  Lock,
  Key,
} from "lucide-react";
import { addToast } from "@heroui/toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import axios from "axios";
import {
  generateRSAKeyPair,
  generateAESKey,
  encryptFile,
  encryptAESKeyWithRSA,
  exportPrivateKey,
  exportPublicKey,
  importPublicKey,
} from "@/lib/crypto";

interface FileUploadFormProps {
  userId: string;
  onUploadSuccess?: () => void;
  currentFolder?: string | null;
}

export default function FileUploadForm({
  userId,
  onUploadSuccess,
  currentFolder = null,
}: FileUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Folder creation state
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [creatingFolder, setCreatingFolder] = useState(false);

  // E2EE state
  const [publicKey, setPublicKey] = useState<CryptoKey | null>(null);
  const [keysInitialized, setKeysInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    initializeKeys();
  }, [userId]);

  const initializeKeys = async () => {
    try {
      setIsInitializing(true);
      const privateKeyBase64 = localStorage.getItem(`privateKey_${userId}`);

      if (!privateKeyBase64) {
        // Generate new keypair
        const { publicKey: pubKeyCrypto, privateKey: privKeyCrypto } = await generateRSAKeyPair();
        const priv = await exportPrivateKey(privKeyCrypto);
        localStorage.setItem(`privateKey_${userId}`, priv);
        const pub = await exportPublicKey(pubKeyCrypto);

        // Send public key to server
        await axios.post("/api/keys", { publicKey: pub });

        setPublicKey(pubKeyCrypto);
      } else {
        try {
          // Get public key from server
          const response = await axios.get("/api/keys");
          const pubPem = response.data.publicKey;
          const pubKeyCrypto = await importPublicKey(pubPem);
          setPublicKey(pubKeyCrypto);
        } catch (getError: any) {
          // If GET fails (e.g., 404), regenerate keys
          console.warn("Public key not found on server, regenerating keys");
          const { publicKey: pubKeyCrypto, privateKey: privKeyCrypto } = await generateRSAKeyPair();
          const priv = await exportPrivateKey(privKeyCrypto);
          localStorage.setItem(`privateKey_${userId}`, priv);
          const pub = await exportPublicKey(pubKeyCrypto);

          // Send public key to server
          await axios.post("/api/keys", { publicKey: pub });

          setPublicKey(pubKeyCrypto);
        }
      }

      setKeysInitialized(true);
    } catch (error) {
      console.error("Error initializing keys:", error);
      setError("Failed to initialize encryption keys");
    } finally {
      setIsInitializing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Validate file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit");
        return;
      }

      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        setError("Only image files are allowed");
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];

      // Validate file size (5MB limit)
      if (droppedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit");
        return;
      }

      // Validate file type
      if (!droppedFile.type.startsWith('image/')) {
        setError("Only image files are allowed");
        return;
      }

      setFile(droppedFile);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!file || !publicKey) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Encrypt the file
      const { encryptedFile, aesKey: aesKeyCrypto, iv } = await encryptFile(file);

      // Encrypt AES key with RSA public key
      const encryptedAESKey = await encryptAESKeyWithRSA(publicKey, aesKeyCrypto);

      // Use encrypted file blob
      const encryptedBlob = encryptedFile;

      // Prepare form data with encrypted file and encrypted AES key
      const formData = new FormData();
      formData.append("file", encryptedBlob, file.name);
      formData.append("userId", userId);
      formData.append("encryptedAesKey", encryptedAESKey);
      formData.append("iv", iv); // Don't forget to include the IV
      if (currentFolder) {
        formData.append("parentId", currentFolder);
      }

      await axios.post("/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });

      addToast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded securely.`,
        color: "success",
      });

      // Clear the file after successful upload
      clearFile();

      // Call the onUploadSuccess callback if provided
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file. Please try again.");
      addToast({
        title: "Upload Failed",
        description: "We couldn't upload your file. Please try again.",
        color: "danger",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      addToast({
        title: "Invalid Folder Name",
        description: "Please enter a valid folder name.",
        color: "danger",
      });
      return;
    }

    setCreatingFolder(true);

    try {
      await axios.post("/api/folder/create", {
        name: folderName.trim(),
        userId: userId,
        parentId: currentFolder,
      });

      addToast({
        title: "Folder Created",
        description: `Folder "${folderName}" has been created successfully.`,
        color: "success",
      });

      // Reset folder name and close modal
      setFolderName("");
      setFolderModalOpen(false);

      // Call the onUploadSuccess callback to refresh the file list
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      addToast({
        title: "Folder Creation Failed",
        description: "We couldn't create the folder. Please try again.",
        color: "danger",
      });
    } finally {
      setCreatingFolder(false);
    }
  };

  return (
    <div className="space-y-6 p-1">
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-default-200">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Lock className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-default-900">Secure File Upload</h2>
          <p className="text-sm text-default-500">End-to-end encrypted file storage</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button
          color="primary"
          variant="flat"
          startContent={<FolderPlus className="h-4 w-4" />}
          onClick={() => setFolderModalOpen(true)}
          className="flex-1 shadow-sm"
          radius="lg"
        >
          New Folder
        </Button>
        <Button
          color="primary"
          variant="solid"
          startContent={<FileUp className="h-4 w-4" />}
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 shadow-sm"
          isDisabled={!keysInitialized}
          radius="lg"
        >
          Add Image
        </Button>
      </div>

      {/* File drop area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
          error
            ? "border-danger/50 bg-danger/10"
            : file
              ? "border-primary/50 bg-primary/10"
              : "border-default-300 hover:border-primary/50 hover:bg-primary/5"
        } ${isInitializing ? "opacity-70 pointer-events-none" : ""}`}
      >
        {!file ? (
          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <div className="p-3 bg-primary/10 rounded-full">
                <FileUp className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <p className="text-default-700 font-medium">
                Drag and drop your image here
              </p>
              <p className="text-sm text-default-500 mt-1">
                or{" "}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary cursor-pointer font-medium hover:underline bg-transparent border-0 p-0 m-0"
                  disabled={!keysInitialized}
                >
                  browse files
                </button>
              </p>
              <p className="text-xs text-default-400 mt-2 flex items-center justify-center gap-1">
                <Shield className="h-3 w-3" />
                <span>End-to-End Encrypted • Max 5MB</span>
              </p>
            </div>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              disabled={!keysInitialized}
            />
            {!keysInitialized && (
              <div className="flex items-center justify-center gap-2 text-xs text-default-400">
                <Key className="h-3 w-3 animate-pulse" />
                <span>Initializing encryption keys...</span>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Image Preview */}
            {file.type.startsWith('image/') && (
              <div className="flex justify-center">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-default-200 shadow-sm">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-medium bg-black/60 px-2 py-1 rounded">
                      Preview
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <FileUp className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate text-default-900">
                    {file.name}
                  </p>
                  <p className="text-xs text-default-500">
                    {file.size < 1024
                      ? `${file.size} B`
                      : file.size < 1024 * 1024
                        ? `${(file.size / 1024).toFixed(1)} KB`
                        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                    • {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                  </p>
                </div>
              </div>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={clearFile}
                className="text-default-500 hover:text-danger flex-shrink-0"
                radius="full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {error && (
              <div className="bg-danger-50 text-danger-700 p-3 rounded-lg flex items-center gap-2 border border-danger-200">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-default-600">
                  <span>Encrypting & Uploading</span>
                  <span>{progress}%</span>
                </div>
                <Progress
                  value={progress}
                  color="primary"
                  size="sm"
                  className="max-w-full"
                  aria-label="Upload progress"
                />
              </div>
            )}

            <Button
              color="primary"
              startContent={!uploading && <Upload className="h-4 w-4" />}
              endContent={!uploading && <ArrowRight className="h-4 w-4" />}
              onClick={handleUpload}
              isLoading={uploading}
              className="w-full shadow-sm"
              isDisabled={!!error}
              radius="lg"
              size="lg"
            >
              {uploading ? `Uploading... ${progress}%` : "Upload Securely"}
            </Button>
          </div>
        )}
      </div>

      {/* Security information */}
      <div className="bg-default-50 p-4 rounded-xl border border-default-200">
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span>Security Information</span>
        </h4>
        <ul className="text-xs text-default-600 space-y-2">
          <li className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
            <span>Files are encrypted end-to-end before upload</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
            <span>Only you can decrypt your files with your private key</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
            <span>Images are private and only visible to you</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
            <span>Supported formats: JPG, PNG, GIF, WebP, BMP</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
            <span>Maximum file size: 5MB</span>
          </li>
        </ul>
      </div>

      {/* Create Folder Modal */}
      <Modal
        isOpen={folderModalOpen}
        onOpenChange={setFolderModalOpen}
        backdrop="blur"
        size="md"
        classNames={{
          base: "border border-default-200 bg-background shadow-xl",
          header: "border-b border-default-200 pb-4",
          footer: "border-t border-default-200 pt-4",
          body: "py-6",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <FolderPlus className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold">Create New Folder</span>
                </div>
                <p className="text-sm text-default-500 font-normal mt-1">
                  Organize your files by creating a new folder
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <label htmlFor="folderName" className="text-sm font-medium text-default-600">
                    Folder Name
                  </label>
                  <Input
                    id="folderName"
                    type="text"
                    placeholder="Enter folder name"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && folderName.trim()) {
                        handleCreateFolder();
                      }
                    }}
                    classNames={{
                      input: "text-base",
                      mainWrapper: "w-full"
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="flat"
                  color="default"
                  onPress={onClose}
                  className="font-medium"
                  radius="lg"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleCreateFolder}
                  isLoading={creatingFolder}
                  isDisabled={!folderName.trim()}
                  className="font-medium"
                  endContent={!creatingFolder && <ArrowRight className="h-4 w-4" />}
                  radius="lg"
                >
                  Create Folder
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}