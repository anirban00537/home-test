"use client";
import React from "react";
import { useFolders } from "../hooks/useFolders";
import { useUrlState } from "../hooks/useUrlState";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import { FolderLayout } from "../components/FolderLayout";

const Page: React.FC = () => {
  // Custom hook to manage folder data, loading states, and folder operations
  const {
    folders, // Array of root-level folders
    expandedIds, // Set of folder IDs that are currently expanded
    isLoading, // Boolean indicating if folders are being fetched
    error, // Error message if folder loading fails
    handleExpandedChange, // Function to toggle folder expansion
    handleSetNewRoot, // Function to navigate to a subfolder as new root
  } = useFolders();

  // Custom hook to manage URL state for navigation
  const { currentUrl } = useUrlState();

  // Render loading state while fetching folders
  if (isLoading) return <LoadingState />;

  // Render error state if folder loading failed
  if (error) return <ErrorState />;

  // Render empty state if no folders are available
  if (!folders?.length) return <EmptyState />;

  // Render the main folder layout with sidebar navigation
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
