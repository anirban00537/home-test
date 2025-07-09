import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getFolders } from "../service/folders";
import { FolderItem, ApiResponse } from "../types/folder";

export const useFolders = () => {
  const router = useRouter();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const { data, isLoading, error } = useQuery<ApiResponse<FolderItem[]>>({
    queryKey: ["folders"],
    queryFn: getFolders,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const handleExpandedChange = useCallback((id: string, expanded: boolean) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (expanded) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

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
