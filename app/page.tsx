"use client";
import React, { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFolders } from "../service/folders";
import { FolderItem, ApiResponse } from "../types/folder";
import { FolderTree } from "../components/FolderTree";
import { FolderDetails } from "../components/FolderDetails";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { AddressBar } from "../components/AddressBar";

const Page: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const { data, isLoading, error } = useQuery<ApiResponse<FolderItem[]>>({
    queryKey: ["folders"],
    queryFn: getFolders,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime in newer versions)
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

  const currentUrl = useMemo(() => {
    return selectedFolder
      ? `localhost:3000${selectedFolder.path}`
      : "localhost:3000/";
  }, [selectedFolder]);

  const folders = useMemo(() => {
    return data?.success && data.data ? data.data : [];
  }, [data?.success, data?.data]);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!folders.length) return <EmptyState />;

  return (
    <div className="min-h-screen flex flex-col">
      <AddressBar currentUrl={currentUrl} />

      <main className="flex flex-1">
        <aside className="w-64 border-r border-slate-200 bg-slate-50">
          <nav className="p-2" aria-label="Folder navigation">
            <FolderTree
              folders={folders}
              onFolderSelect={handleFolderSelect}
              selectedFolderId={selectedFolder?.id}
              expandedIds={expandedIds}
              onExpandedChange={handleExpandedChange}
            />
          </nav>
        </aside>

        <section className="flex-1 bg-white p-6">
          {selectedFolder ? (
            <FolderDetails folder={selectedFolder} />
          ) : (
            <EmptyState />
          )}
        </section>
      </main>
    </div>
  );
};

export default Page;
