"use client";
import React, { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFolders } from "../service/folders";
import { FolderItem, ApiResponse } from "../types/folder";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import DefaultPage from "./default";

const Page: React.FC = () => {
  const router = useRouter();
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const { data, isLoading, error } = useQuery<ApiResponse<FolderItem[]>>({
    queryKey: ["folders"],
    queryFn: getFolders,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const handleFolderSelect = useCallback((folder: FolderItem) => {
    setSelectedFolder(folder);
  }, []);

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
      router.push(folder.path);
    },
    [router]
  );

  const folders = useMemo(() => {
    return data?.success && data.data ? data.data : [];
  }, [data?.success, data?.data]);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!folders.length) return <EmptyState />;

  return (
    <DefaultPage
      folders={folders}
      selectedFolder={selectedFolder}
      expandedIds={expandedIds}
      onFolderSelect={handleFolderSelect}
      onExpandedChange={handleExpandedChange}
      onSetNewRoot={handleSetNewRoot}
    />
  );
};

export default Page;
