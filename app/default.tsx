"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { FolderItem } from "../types/folder";
import { FolderTree } from "../components/FolderTree";
import { AddressBar } from "../components/AddressBar";

interface DefaultPageProps {
  folders: FolderItem[];
  expandedIds: Set<string>;
  onExpandedChange: (id: string, expanded: boolean) => void;
  onSetNewRoot: (folder: FolderItem) => void;
}

const DefaultPage = React.memo<DefaultPageProps>(
  ({ folders, expandedIds, onExpandedChange, onSetNewRoot }) => {
    const pathname = usePathname();
    const currentUrl =
      typeof window === "undefined"
        ? `http://localhost:3000${pathname}`
        : `${window.location.origin}${pathname}`;

    return (
      <div className="min-h-screen flex flex-col">
        <AddressBar currentUrl={currentUrl} />

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
  }
);

DefaultPage.displayName = "DefaultPage";

export default DefaultPage;
