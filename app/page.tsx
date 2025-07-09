"use client";
import React from "react";
import { useFolders } from "../hooks/useFolders";
import { useUrlState } from "../hooks/useUrlState";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import { FolderLayout } from "../components/FolderLayout";

const Page: React.FC = () => {
  const {
    folders,
    expandedIds,
    isLoading,
    error,
    handleExpandedChange,
    handleSetNewRoot,
  } = useFolders();

  const { currentUrl } = useUrlState();

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
    />
  );
};

export default Page;
