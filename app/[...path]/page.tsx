"use client";
import React, { useState, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFolders, getFolderChildren } from "../../service/folders";
import { FolderItem } from "../../types/folder";
import { FolderTree } from "../../components/FolderTree";
import { EmptyState } from "../../components/EmptyState";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";
import { AddressBar } from "../../components/AddressBar";
import {
  pathToFolderState,
  findFolderByPath,
} from "../../service/folderNavigation";

const DynamicFolderPage: React.FC = () => {
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

  // Redirect to home if invalid path
  if (!rootFolder && currentPath !== "/") {
    router.replace("/");
    return null;
  }

  const { data, isLoading, error } = useQuery({
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

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!folders?.length) return <EmptyState />;

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
