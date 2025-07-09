import React from "react";
import { FolderItem } from "../types/folder";
import { FolderIcon } from "./FolderIcon";
import { FolderNode } from "./FolderNode";

interface FolderTreeProps {
  folders: FolderItem[];
  expandedIds: Set<string>;
  onExpandedChange: (id: string, expanded: boolean) => void;
  onSetNewRoot?: (folder: FolderItem) => void;
}

export const FolderTree: React.FC<FolderTreeProps> = React.memo(
  ({ folders, expandedIds, onExpandedChange, onSetNewRoot }) => {
    if (!folders?.length) {
      return (
        <div className="flex items-center justify-center py-12 text-slate-400">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 opacity-40">
              <FolderIcon isExpanded={false} className="w-full h-full" />
            </div>
            <span className="text-sm font-medium">No folders found</span>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-1" role="tree" aria-label="Folder tree">
        {folders.map((folder) => (
          <FolderNode
            key={folder.id}
            folder={folder}
            expandedIds={expandedIds}
            onExpandedChange={onExpandedChange}
            onSetNewRoot={onSetNewRoot}
          />
        ))}
      </div>
    );
  }
);

FolderTree.displayName = "FolderTree";
