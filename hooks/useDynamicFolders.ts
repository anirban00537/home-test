import { useState, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFolders, getFolderChildren } from "../service/folders";
import { FolderItem, ApiResponse } from "../types/folder";
import { pathToFolderState, findFolderByPath } from "../lib/folderNavigation";

// Hook for managing dynamic folder navigation with expanded state and path-based loading
export const useDynamicFolders = () => {
  const params = useParams();
  const router = useRouter();
  const pathSegments = (params.path as string[]) || [];
  const currentPath = `/${pathSegments.join("/")}`;

  // Track expanded folder IDs based on current path
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const { expandedIds: initialIds } = pathToFolderState(currentPath);
    return initialIds;
  });

  // Get current root folder based on path
  const rootFolder = useMemo(
    () => findFolderByPath(currentPath),
    [currentPath]
  );

  // Fetch folders based on current root
  const { data, isLoading, error } = useQuery<ApiResponse<FolderItem[]>>({
    queryKey: rootFolder ? ["folders", rootFolder.id] : ["folders"],
    queryFn: () =>
      rootFolder ? getFolderChildren(rootFolder.id) : getFolders(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Handle folder expansion state
  const handleExpandedChange = useCallback((id: string, expanded: boolean) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (expanded) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  // Navigate to a new root folder
  const handleSetNewRoot = useCallback(
    (folder: FolderItem) => {
      router.push(folder.path);
    },
    [router]
  );

  // Navigate to parent folder
  const handleNavigateToParent = useCallback(() => {
    const pathParts = currentPath.split("/").filter(Boolean);
    const parentPath =
      pathParts.length > 1 ? `/${pathParts.slice(0, -1).join("/")}` : "/";
    router.push(parentPath);
  }, [currentPath, router]);

  // Get current absolute URL
  const currentUrl = useMemo(() => {
    if (typeof window === "undefined") return `${currentPath}`;
    return `${window.location.origin}${currentPath}`;
  }, [currentPath]);

  const folders = data?.success ? data.data : [];

  return {
    folders,
    expandedIds,
    isLoading,
    error,
    currentUrl,
    pathSegments,
    handleExpandedChange,
    handleSetNewRoot,
    handleNavigateToParent,
    isValidPath: rootFolder || currentPath === "/",
  };
};
