"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFolders, getFolderChildren } from "../../service/folders";
import { FolderItem, ApiResponse } from "../../types/folder";
import { FolderTree } from "../../components/FolderTree";
import { EmptyState } from "../../components/EmptyState";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";
import { AddressBar } from "../../components/AddressBar";
import {
  pathToFolderState,
  findFolderByPath,
  findParentFolder,
} from "../../service/folderNavigation";

const DynamicFolderPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const pathSegments = (params.path as string[]) || [];
  const currentPath = `/${pathSegments.join("/")}`;

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [rootFolder, setRootFolder] = useState<FolderItem | null>(null);

  useEffect(() => {
    const { selectedFolder, rootFolder, expandedIds } =
      pathToFolderState(currentPath);

    if (!selectedFolder && currentPath !== "/") {
      router.replace("/");
      return;
    }

    setRootFolder(rootFolder);
    setExpandedIds(expandedIds);
  }, [currentPath, router]);

  const queryKey = rootFolder ? ["folders", rootFolder.id] : ["folders"];

  const queryFn = useCallback(() => {
    return rootFolder ? getFolderChildren(rootFolder.id) : getFolders();
  }, [rootFolder]);

  const { data, isLoading, error } = useQuery<ApiResponse<FolderItem[]>>({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const handleExpandedChange = useCallback((id: string, expanded: boolean) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (expanded) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  }, []);

  const handleSetNewRoot = useCallback(
    (folder: FolderItem) => {
      setRootFolder(folder);
      setExpandedIds(new Set());
      router.push(folder.path);
    },
    [router]
  );

  const handleNavigateToParent = useCallback(() => {
    const pathParts = currentPath.split("/").filter(Boolean);
    if (pathParts.length > 1) {
      pathParts.pop();
      router.push(`/${pathParts.join("/")}`);
    } else {
      router.push("/");
    }
  }, [currentPath, router]);

  const currentUrl = useMemo(() => {
    const baseUrl =
      typeof window !== "undefined"
        ? `${window.location.protocol}//${window.location.host}`
        : "http://localhost:3000";

    return `${baseUrl}${currentPath}`;
  }, [currentPath]);

  const folders = useMemo(() => {
    return data?.success && data.data ? data.data : [];
  }, [data?.success, data?.data]);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!folders.length) return <EmptyState />;

  return (
    <div className="min-h-screen flex flex-col">
      <AddressBar
        currentUrl={currentUrl}
        onNavigateToParent={
          pathSegments.length > 0 ? handleNavigateToParent : undefined
        }
      />

      <main className="flex flex-1">
        <aside className="w-64 border-r border-slate-200 bg-slate-50">
          <nav className="p-2" aria-label="Folder navigation">
            <FolderTree
              folders={folders}
              expandedIds={expandedIds}
              onExpandedChange={handleExpandedChange}
              onSetNewRoot={handleSetNewRoot}
            />
          </nav>
        </aside>
      </main>
    </div>
  );
};

export default DynamicFolderPage;
