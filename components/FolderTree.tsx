import React, { useCallback } from "react";
import { ChevronRight, FolderClosed, FolderOpen } from "lucide-react";
import { FolderItem } from "../types/folder";

interface FolderTreeProps {
  folders: FolderItem[];
  onFolderSelect?: (folder: FolderItem) => void;
  selectedFolderId?: string;
  expandedIds: Set<string>;
  onExpandedChange: (id: string, expanded: boolean) => void;
}

interface FolderNodeProps {
  folder: FolderItem;
  level?: number;
  selectedFolderId?: string;
  expandedIds: Set<string>;
  onFolderSelect?: (folder: FolderItem) => void;
  onExpandedChange: (id: string, expanded: boolean) => void;
}

const FolderNode: React.FC<FolderNodeProps> = ({
  folder,
  level = 0,
  selectedFolderId,
  expandedIds,
  onFolderSelect,
  onExpandedChange,
}) => {
  const isExpanded = expandedIds.has(folder.id);
  const isSelected = folder.id === selectedFolderId;
  const hasChildren = Boolean(folder.children?.length);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 0 && hasChildren) {
        onExpandedChange(folder.id, !isExpanded);
      }
      onFolderSelect?.(folder);
    },
    [folder, hasChildren, isExpanded, onExpandedChange, onFolderSelect]
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onFolderSelect?.(folder);
    },
    [folder, onFolderSelect]
  );

  return (
    <div>
      <div
        className={`
          flex items-center py-1.5 px-2 rounded-md cursor-pointer 
          transition-all duration-150 ease-in-out hover:bg-slate-100
          ${isSelected ? "bg-blue-50 text-blue-700" : "text-slate-700"}
        `}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        role="button"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        aria-label={`${folder.name}${
          hasChildren ? ", " + folder.children!.length + " items" : ""
        }`}
      >
        <div
          className={`
          w-4 h-4 flex items-center justify-center
          transition-transform duration-150
          ${hasChildren ? "" : "invisible"}
          ${isExpanded ? "rotate-90" : ""}
        `}
        >
          <ChevronRight className="w-3 h-3" />
        </div>

        <div className="flex items-center ml-1 min-w-0 flex-1">
          {isExpanded ? (
            <FolderOpen className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
          ) : (
            <FolderClosed className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
          )}

          <span className="text-sm font-medium truncate" title={folder.name}>
            {folder.name}
          </span>

          {hasChildren && (
            <span className="ml-auto text-xs text-slate-400">
              {folder.children?.length}
            </span>
          )}
        </div>
      </div>

      {isExpanded && hasChildren && folder.children && (
        <div className="border-l border-slate-200 ml-2">
          {folder.children.map((child) => (
            <FolderNode
              key={child.id}
              folder={child}
              level={level + 1}
              selectedFolderId={selectedFolderId}
              expandedIds={expandedIds}
              onFolderSelect={onFolderSelect}
              onExpandedChange={onExpandedChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FolderTree: React.FC<FolderTreeProps> = ({
  folders,
  onFolderSelect,
  selectedFolderId,
  expandedIds,
  onExpandedChange,
}) => {
  if (!folders?.length) {
    return (
      <div className="flex items-center justify-center py-8 text-slate-500">
        <span className="text-sm">No folders found</span>
      </div>
    );
  }

  return (
    <div className="space-y-0.5" role="tree" aria-label="Folder tree">
      {folders.map((folder) => (
        <FolderNode
          key={folder.id}
          folder={folder}
          selectedFolderId={selectedFolderId}
          expandedIds={expandedIds}
          onFolderSelect={onFolderSelect}
          onExpandedChange={onExpandedChange}
        />
      ))}
    </div>
  );
};
