"use client";
import React from "react";
import { useDynamicFolders } from "../../hooks/useDynamicFolders";
import { FolderTree } from "../../components/FolderTree";
import { EmptyState } from "../../components/EmptyState";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";
import { AddressBar } from "../../components/AddressBar";

const DynamicFolderPage: React.FC = () => {
  const {
    folders,
    expandedIds,
    isLoading,
    error,
    currentUrl,
    pathSegments,
    handleExpandedChange,
    handleSetNewRoot,
    handleNavigateToParent,
    isValidPath,
  } = useDynamicFolders();

  if (!isValidPath) return null;
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
