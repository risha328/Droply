"use client"

import { useState, useEffect } from "react"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { Search, X, Filter, FileText, ImageIcon, Folder, File, MoreHorizontal } from "lucide-react"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown"
import { Badge } from "./ui/Badge"

interface FileSearchBarProps {
  onSearch: (query: string) => void
  onFilter: (filter: string) => void
  placeholder?: string
  className?: string
}

export default function FileSearchBar({
  onSearch,
  onFilter,
  placeholder = "Search files and folders...",
  className = "",
}: FileSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, onSearch])

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
    onFilter(filter)
  }

  const clearSearch = () => {
    setSearchQuery("")
    onSearch("")
  }

  const filterOptions = [
    {
      key: "all",
      label: "All Types",
      icon: <File className="h-4 w-4" />,
      description: "Show all files and folders",
      color: "default" as const,
    },
    {
      key: "image",
      label: "Images",
      icon: <ImageIcon className="h-4 w-4" />,
      description: "Photos, pictures, and graphics",
      color: "success" as const,
    },
    {
      key: "folder",
      label: "Folders",
      icon: <Folder className="h-4 w-4" />,
      description: "Directory folders only",
      color: "primary" as const,
    },
    {
      key: "document",
      label: "Documents",
      icon: <FileText className="h-4 w-4" />,
      description: "PDFs, Word docs, spreadsheets",
      color: "warning" as const,
    },
    {
      key: "other",
      label: "Other",
      icon: <MoreHorizontal className="h-4 w-4" />,
      description: "Other file types",
      color: "secondary" as const,
    },
  ]

  const selectedOption = filterOptions.find((f) => f.key === selectedFilter)

  return (
    <div className={`flex flex-col sm:flex-row gap-3 items-stretch sm:items-center ${className}`}>
      {/* Search Input */}
      <div className="relative flex-1 max-w-lg">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<Search className="h-4 w-4 text-default-400 pointer-events-none flex-shrink-0" />}
          endContent={
            searchQuery && (
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={clearSearch}
                className="h-6 w-6 min-w-6 text-default-400 hover:text-default-600 hover:bg-default-100 rounded-full"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )
          }
          classNames={{
            base: "w-full",
            mainWrapper: "h-full",
            input: ["text-sm", "bg-transparent", "text-default-700", "placeholder:text-default-400", "font-medium"],
            inputWrapper: [
              "h-11",
              "px-4",
              "bg-default-50",
              "border-2",
              "border-default-200",
              "hover:border-default-300",
              "focus-within:border-primary",
              "focus-within:bg-background",
              "shadow-sm",
              "hover:shadow-md",
              "transition-all",
              "duration-200",
              "rounded-lg",
              "group-data-[focus=true]:border-primary",
              "group-data-[focus=true]:shadow-md",
            ],
          }}
        />
      </div>

      {/* Filter Dropdown */}
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button
            variant="bordered"
            startContent={
              <div className="flex items-center gap-2">
                {selectedOption?.icon}
                {selectedFilter !== "all" && (
                  <Badge children="" color={selectedOption?.color} size="sm" className="w-2 h-2 min-w-2 min-h-2" />
                )}
              </div>
            }
            endContent={<Filter className="h-3.5 w-3.5 text-default-400" />}
            className={`
              h-11 px-4 min-w-[120px] sm:min-w-[140px]
              bg-background border-2 border-default-200
              hover:border-default-300 hover:bg-default-50
              data-[pressed=true]:scale-[0.98]
              transition-all duration-200 rounded-lg
              font-medium text-default-700
              ${selectedFilter !== "all" ? "border-primary/30 bg-primary/5" : ""}
            `}
          >
            <span className="hidden sm:inline text-sm">{selectedOption?.label}</span>
            <span className="sm:hidden text-sm">Filter</span>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="File type filter"
          selectedKeys={[selectedFilter]}
          selectionMode="single"
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string
            handleFilterChange(selected)
          }}
          className="min-w-[260px]"
          itemClasses={{
            base: [
              "rounded-lg",
              "text-default-700",
              "transition-colors",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-default-100",
              "data-[selectable=true]:focus:bg-default-100",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500",
            ],
          }}
        >
          {filterOptions.map((option) => (
            <DropdownItem
              key={option.key}
              startContent={
                <div className="flex items-center gap-2">
                  {option.icon}
                  <Badge children="" color={option.color} size="sm" className="w-2 h-2 min-w-2 min-h-2" />
                </div>
              }
              description={<span className="text-xs text-default-400 font-normal">{option.description}</span>}
              className="py-3"
            >
              <div className="flex flex-col">
                <span className="font-medium text-sm">{option.label}</span>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
