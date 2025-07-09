"use client";
import React, { useState, useCallback } from "react";
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

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  const folders = data?.success ? data.data : [];
  if (!folders?.length) return <EmptyState />;

  return (
    <DefaultPage
      folders={folders}
      expandedIds={expandedIds}
      onExpandedChange={handleExpandedChange}
      onSetNewRoot={handleSetNewRoot}
    />
  );
};

export default Page;
