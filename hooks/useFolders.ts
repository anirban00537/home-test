import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getFolders } from "../service/folders";
import { FolderItem, ApiResponse } from "../types/folder";

// Hook for managing root-level folder navigation and expansion state
export const useFolders = () => {
  const router = useRouter();
  // Track which folders are expanded in the UI
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Fetch root-level folders with caching
  const { data, isLoading, error } = useQuery<ApiResponse<FolderItem[]>>({
    queryKey: ["folders"],
    queryFn: getFolders,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Toggle folder expansion state
  const handleExpandedChange = useCallback((id: string, expanded: boolean) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (expanded) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  // Navigate to selected folder
  const handleSetNewRoot = useCallback(
    (folder: FolderItem) => {
      router.push(folder.path);
    },
    [router]
  );

  const folders = data?.success ? data.data : [];

  return {
    folders,
    expandedIds,
    isLoading,
    error,
    handleExpandedChange,
    handleSetNewRoot,
  };
};
