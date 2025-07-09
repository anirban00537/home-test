import { useState, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFolders, getFolderChildren } from "../service/folders";
import { FolderItem, ApiResponse } from "../types/folder";
import {
  pathToFolderState,
  findFolderByPath,
} from "../service/folderNavigation";

export const useDynamicFolders = () => {
  const params = useParams();
  const router = useRouter();
  const pathSegments = (params.path as string[]) || [];
  const currentPath = `/${pathSegments.join("/")}`;

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const { expandedIds: initialIds } = pathToFolderState(currentPath);
    return initialIds;
  });

  const rootFolder = useMemo(
    () => findFolderByPath(currentPath),
    [currentPath]
  );

  const { data, isLoading, error } = useQuery<ApiResponse<FolderItem[]>>({
    queryKey: rootFolder ? ["folders", rootFolder.id] : ["folders"],
    queryFn: () =>
      rootFolder ? getFolderChildren(rootFolder.id) : getFolders(),
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

  const handleNavigateToParent = useCallback(() => {
    const pathParts = currentPath.split("/").filter(Boolean);
    const parentPath =
      pathParts.length > 1 ? `/${pathParts.slice(0, -1).join("/")}` : "/";
    router.push(parentPath);
  }, [currentPath, router]);

  const currentUrl = useMemo(() => {
    if (typeof window === "undefined")
      return `http://localhost:3000${currentPath}`;
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
