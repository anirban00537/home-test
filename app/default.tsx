"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { FolderItem } from "../types/folder";
import { FolderTree } from "../components/FolderTree";
import { AddressBar } from "../components/AddressBar";

interface DefaultPageProps {
  folders: FolderItem[];
  expandedIds: Set<string>;
  onExpandedChange: (id: string, expanded: boolean) => void;
  onSetNewRoot: (folder: FolderItem) => void;
}

const DefaultPage: React.FC<DefaultPageProps> = ({
  folders,
  expandedIds,
  onExpandedChange,
  onSetNewRoot,
}) => {
  const pathname = usePathname();
  const currentUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}${pathname}`
      : "http://localhost:3000/";

  return (
    <div className="min-h-screen flex flex-col">
      <AddressBar currentUrl={currentUrl} onNavigateToParent={undefined} />

      <main className="flex flex-1">
        <aside className="w-64 border-r border-slate-200 bg-slate-50">
          <nav className="p-2" aria-label="Folder navigation">
            <FolderTree
              folders={folders}
              expandedIds={expandedIds}
              onExpandedChange={onExpandedChange}
              onSetNewRoot={onSetNewRoot}
            />
          </nav>
        </aside>
      </main>
    </div>
  );
};

export default DefaultPage;
