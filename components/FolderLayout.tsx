import React from "react";
import type { FolderItem } from "../types/folder";
import { FolderTree } from "./FolderTree";
import { AddressBar } from "./AddressBar";

interface FolderLayoutProps {
  folders: FolderItem[];
  expandedIds: Set<string>;
  currentUrl: string;
  onExpandedChange: (id: string, expanded: boolean) => void;
  onSetNewRoot: (folder: FolderItem) => void;
  onNavigateToParent?: () => void;
}

export const FolderLayout = React.memo<FolderLayoutProps>(
  ({
    folders,
    expandedIds,
    currentUrl,
    onExpandedChange,
    onSetNewRoot,
    onNavigateToParent,
  }) => {
    return (
      <div className="min-h-screen flex flex-col">
        <AddressBar
          currentUrl={currentUrl}
          onNavigateToParent={onNavigateToParent}
        />

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

FolderLayout.displayName = "FolderLayout";
