"use client";
import React from "react";
import { useDynamicFolders } from "../../hooks/useDynamicFolders";
import { FolderLayout } from "../../components/FolderLayout";
import { EmptyState } from "../../components/EmptyState";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";

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
    <FolderLayout
      folders={folders}
      expandedIds={expandedIds}
      currentUrl={currentUrl}
      onExpandedChange={handleExpandedChange}
      onSetNewRoot={handleSetNewRoot}
      onNavigateToParent={
        pathSegments.length > 0 ? handleNavigateToParent : undefined
      }
    />
  );
};

export default DynamicFolderPage;
