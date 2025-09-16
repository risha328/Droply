"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { FileUp, FileText, User, Sparkles, Cloud, Shield } from "lucide-react";
import FileUploadForm from "@/components/FileUploadForm";
import FileList from "@/components/FileList";
import UserProfile from "@/components/UserProfile";
import { useSearchParams } from "next/navigation";

interface DashboardContentProps {
  userId: string;
  userName: string;
}

export default function DashboardContent({
  userId,
  userName,
}: DashboardContentProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<string>("files");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [stats, setStats] = useState({ totalFiles: 0, storageUsed: '0 B', sharedFiles: 0 });

  // Set the active tab based on URL parameter
  useEffect(() => {
    if (tabParam === "profile") {
      setActiveTab("profile");
    } else {
      setActiveTab("files");
    }
  }, [tabParam]);

  // Fetch stats on component mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  const handleFileUploadSuccess = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleFolderChange = useCallback((folderId: string | null) => {
    setCurrentFolder(folderId);
  }, []);

  // const getGreetingMessage = () => {
  //   const hour = new Date().getHours();
  //   if (hour < 12) return "Good morning";
  //   if (hour < 17) return "Good afternoon";
  //   return "Good evening";
  // };

  const getUniqueWelcomeText = () => {
    const messages = [
      "Ready to conquer your digital world?",
      "Your files are waiting for your magic touch!",
      "Let's make file management an adventure!",
      "Your digital sanctuary awaits exploration!",
      "Time to organize and elevate your files!",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <>
      {/* Enhanced Welcome Section */}
      <div className="mb-16 text-center relative min-h-[250px] flex flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-3xl -z-10" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 rounded-3xl -z-10"></div>
        <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
          {/* <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          <span className="text-lg font-medium text-primary/80 tracking-wide">
            {getGreetingMessage()} */}
          {/* </span> */}
        </div>

        <h1 className="text-2xl lg:text-3xl font-black text-default-900 mb-6 leading-tight">
          Welcome back,{" "}
          <span className="text-primary">
            {userName?.length > 20
              ? `${userName?.substring(0, 20)}...`
              : userName?.split(" ")[0] || "Explorer"}
          </span>
          <span className="text-3xl">! ✨</span>
        </h1>

        <p className="text-2xl lg:text-3xl text-default-600 font-light leading-relaxed mb-4">
          {getUniqueWelcomeText()}
        </p>

        {/* <p className="text-lg text-default-500 flex items-center justify-center lg:justify-start gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span>Your files are secure, organized, and ready for action</span>
          <Cloud className="h-5 w-5 text-secondary ml-2" />
        </p> */}
      </div>

      {/* Enhanced Stats Overview */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 border-2 border-primary/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
          <CardBody className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-4xl font-black text-default-900 mb-1">{stats.totalFiles}</p>
                <p className="text-default-600 font-medium">Total Files</p>
                <p className="text-xs text-default-400 mt-1">Growing collection</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/5 via-secondary/10 to-primary/5 border-2 border-secondary/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
          <CardBody className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-xl group-hover:bg-secondary/20 transition-colors">
                <FileUp className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <p className="text-4xl font-black text-default-900 mb-1">{stats.storageUsed}</p>
                <p className="text-default-600 font-medium">Storage Used</p>
                <p className="text-xs text-default-400 mt-1">Efficient usage</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 border-2 border-primary/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
          <CardBody className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-4xl font-black text-default-900 mb-1">{stats.sharedFiles}</p>
                <p className="text-default-600 font-medium">Shared Files</p>
                <p className="text-xs text-default-400 mt-1">Collaborative space</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Tabs
        aria-label="Dashboard Tabs"
        color="primary"
        variant="underlined"
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
        classNames={{
          tabList: "gap-8 p-2 bg-default-50/50 rounded-xl border border-default-200/50",
          tab: "py-4 px-6 text-lg font-semibold",
          cursor: "bg-gradient-to-r from-primary to-secondary h-1 rounded-full",
        }}
      >
        <Tab
          key="files"
          title={
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6" />
              <span>My Files</span>
            </div>
          }
        >
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-default-50 to-default-100 border-2 border-default-200/60 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="flex gap-3 pb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-default-900">Upload Files</h2>
                    <p className="text-sm text-default-500">Add new files to your collection</p>
                  </div>
                </CardHeader>
                <CardBody>
                  <FileUploadForm
                    userId={userId}
                    onUploadSuccess={handleFileUploadSuccess}
                    currentFolder={currentFolder}
                  />
                </CardBody>
              </Card>
            </div>

      <div className="lg:col-span-2">
        <Card className="bg-gradient-to-br from-default-50 to-default-100 border-2 border-default-200/60 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex gap-3 pb-4">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <FileText className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-default-900">Your Files</h2>
              <p className="text-sm text-default-500">Manage and organize your digital assets</p>
            </div>
          </CardHeader>
          <CardBody>
            <FileList
              userId={userId}
              refreshTrigger={refreshTrigger}
              onFolderChange={handleFolderChange}
            />
          </CardBody>
        </Card>
      </div>
          </div>
        </Tab>

        <Tab
          key="profile"
          title={
            <div className="flex items-center gap-3">
              <User className="h-6 w-6" />
              <span>Profile</span>
            </div>
          }
        >
          <div className="mt-10">
            <UserProfile />
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
