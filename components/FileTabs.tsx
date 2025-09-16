"use client"

import { File, Star, Trash, Home, RefreshCw } from "lucide-react"
import { Button } from "@heroui/button"
import { Badge } from "@/components/badge"
import type { File as FileType } from "@/lib/db/schema"
import { cn } from "@/lib/utils"

interface FileTabsProps {
  activeTab: string
  onTabChange: (key: string) => void
  files: FileType[]
  starredCount: number
  trashCount: number
}

export default function FileTabs({ activeTab, onTabChange, files, starredCount, trashCount }: FileTabsProps) {
  const tabs = [
    // {
    //   key: "home",
    //   icon: <Home className="h-4 w-4" />,
    //   label: "Home",
    // },
    // {
    //   key: "refresh",
    //   icon: <RefreshCw className="h-4 w-4" />,
    //   label: "Refresh",
    // },
    {
      key: "all",
      icon: <File className="h-4 w-4" />,
      label: "All Files",
      count: files.filter((file) => !file.isTrash).length,
    },
    {
      key: "starred",
      icon: <Star className="h-4 w-4" />,
      label: "Starred",
      count: starredCount,
    },
    {
      key: "trash",
      icon: <Trash className="h-4 w-4" />,
      label: "Trash",
      count: trashCount,
    },
  ]

  return (
    <div className="flex w-full overflow-x-auto">
      <div className="flex gap-1 p-1 bg-muted/50 rounded-lg border border-border/50">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <Button
              key={tab.key}
              variant={isActive ? "solid" : "ghost"}
              size="sm"
              onClick={() => onTabChange(tab.key)}
              className={cn(
                "h-9 px-4 text-sm font-medium transition-all duration-200 rounded-md",
                "min-w-[120px] flex items-center justify-center gap-2",
                isActive
                  ? "bg-background text-foreground shadow-sm border border-border/50"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/80",
              )}
              aria-label={tab.label}
            >
              {tab.icon}
              <span className="hidden sm:inline font-medium">{tab.label}</span>
              <span className="sm:hidden font-medium">{tab.label.split(" ")[0]}</span>
              {tab.count !== undefined && (
                <Badge
                  variant={isActive ? "secondary" : "outline"}
                  className={cn(
                    "ml-1 h-5 px-1.5 text-xs font-medium",
                    isActive ? "bg-muted text-muted-foreground" : "border-muted-foreground/30 text-muted-foreground",
                  )}
                  aria-label={`${tab.count} files`}
                >
                  {tab.count}
                </Badge>
              )}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
