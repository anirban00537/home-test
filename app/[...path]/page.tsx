"use client";
import React from "react";
import { useDynamicFolders } from "../../hooks/useDynamicFolders";
import { FolderLayout } from "../../components/FolderLayout";
import { EmptyState } from "../../components/EmptyState";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";

const DynamicFolderPage: React.FC = () => {
  // Custom hook to manage dynamic folder navigation and state
  const {
    folders, // Current folder's children or root folders
    expandedIds, // Set of folder IDs that are currently expanded
    isLoading, // Boolean indicating if folders are being fetched
    error, // Error message if folder loading fails
    currentUrl, // Current URL path for the address bar
    pathSegments, // Array of path segments from URL
    handleExpandedChange, // Function to toggle folder expansion
    handleSetNewRoot, // Function to navigate deeper into folder structure
    handleNavigateToParent, // Function to navigate back to parent folder
    isValidPath, // Boolean indicating if current path is valid
  } = useDynamicFolders();

  // Return null for invalid paths (next.js will show 404)
  if (!isValidPath) return null;

  // Render loading state while fetching folder data
  if (isLoading) return <LoadingState />;

  // Render error state if folder loading failed
  if (error) return <ErrorState />;

  // Render empty state if no folders are found in current directory
  if (!folders?.length) return <EmptyState />;

  // Render the folder layout with navigation capabilities
  return (
    <FolderLayout
      folders={folders}
      expandedIds={expandedIds}
      currentUrl={currentUrl}
      onExpandedChange={handleExpandedChange}
      onSetNewRoot={handleSetNewRoot}
      // Only show parent navigation if we're not at root level
      onNavigateToParent={
        pathSegments.length > 0 ? handleNavigateToParent : undefined
      }
    />
  );
};

export default DynamicFolderPage;
