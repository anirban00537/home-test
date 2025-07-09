"use client";
import React from "react";
import { FolderItem } from "../types/folder";
import { FolderTree } from "../components/FolderTree";
import { AddressBar } from "../components/AddressBar";
import { useUrlState } from "../hooks/useUrlState";

interface DefaultPageProps {
  folders: FolderItem[];
  expandedIds: Set<string>;
  onExpandedChange: (id: string, expanded: boolean) => void;
  onSetNewRoot: (folder: FolderItem) => void;
}

const DefaultPage = React.memo<DefaultPageProps>(
  ({ folders, expandedIds, onExpandedChange, onSetNewRoot }) => {
    const { currentUrl } = useUrlState();

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
