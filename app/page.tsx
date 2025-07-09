"use client";
import React from "react";
import { useFolders } from "../hooks/useFolders";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import DefaultPage from "./default";

const Page: React.FC = () => {
  const {
    folders,
    expandedIds,
    isLoading,
    error,
    handleExpandedChange,
    handleSetNewRoot,
  } = useFolders();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;
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
