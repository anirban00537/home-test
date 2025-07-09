"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FolderItem } from "../types/folder";
import { FolderTree } from "../components/FolderTree";
import { FolderDetails } from "../components/FolderDetails";
import { EmptyState } from "../components/EmptyState";
import { AddressBar } from "../components/AddressBar";

interface DefaultPageProps {
  folders: FolderItem[];
  selectedFolder: FolderItem | null;
  expandedIds: Set<string>;
  onFolderSelect: (folder: FolderItem) => void;
  onExpandedChange: (id: string, expanded: boolean) => void;
  onSetNewRoot: (folder: FolderItem) => void;
}

const DefaultPage: React.FC<DefaultPageProps> = ({
  folders,
  selectedFolder,
  expandedIds,
  onFolderSelect,
  onExpandedChange,
  onSetNewRoot,
}) => {
  const currentUrl =
    typeof window !== "undefined" ? window.location.href : "localhost:3000/";

  return (
    <div className="min-h-screen flex flex-col">
      <AddressBar currentUrl={currentUrl} onNavigateToParent={undefined} />

      <main className="flex flex-1">
        <aside className="w-64 border-r border-slate-200 bg-slate-50">
          <nav className="p-2" aria-label="Folder navigation">
            <FolderTree
              folders={folders}
              onFolderSelect={onFolderSelect}
              selectedFolderId={selectedFolder?.id}
              expandedIds={expandedIds}
              onExpandedChange={onExpandedChange}
              onSetNewRoot={onSetNewRoot}
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

export default DefaultPage;
