import React, { useCallback, useState } from "react";
import { ChevronRight, FolderClosed, FolderOpen, Loader2 } from "lucide-react";
import { FolderItem } from "../types/folder";
import { getFolderChildren } from "../service/folders";

interface FolderTreeProps {
  folders: FolderItem[];
  expandedIds: Set<string>;
  onExpandedChange: (id: string, expanded: boolean) => void;
  onSetNewRoot?: (folder: FolderItem) => void;
}

const FolderNode: React.FC<{
  folder: FolderItem;
  level?: number;
  expandedIds: Set<string>;
  onExpandedChange: (id: string, expanded: boolean) => void;
  onSetNewRoot?: (folder: FolderItem) => void;
}> = React.memo(
  ({ folder, level = 0, expandedIds, onExpandedChange, onSetNewRoot }) => {
    const [children, setChildren] = useState<FolderItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isExpanded = expandedIds.has(folder.id);
    const hasChildren = folder.hasChildren || Boolean(folder.children?.length);

    const loadChildren = useCallback(async () => {
      if (!hasChildren || folder.children || isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await getFolderChildren(folder.id);
        if (response.success && response.data) {
          setChildren(response.data);
        } else {
          setError(response.message || "Failed to load folder contents");
        }
      } catch (err) {
        setError("Error loading folder contents");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, [folder.id, folder.children, hasChildren, isLoading]);

    const handleToggleExpand = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!hasChildren) return;

        const willExpand = !isExpanded;
        if (willExpand) {
          loadChildren();
        }
        onExpandedChange(folder.id, willExpand);
      },
      [folder.id, hasChildren, isExpanded, loadChildren, onExpandedChange]
    );

    const handleDoubleClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (hasChildren && onSetNewRoot) {
          onSetNewRoot(folder);
        }
      },
      [folder, hasChildren, onSetNewRoot]
    );

    const folderChildren = folder.children || children;
    const childCount = folder.childrenCount ?? folderChildren.length;

    return (
      <div>
        <div
          className="flex items-center py-1.5 px-2 rounded-md cursor-pointer hover:bg-slate-100 text-slate-700"
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onDoubleClick={handleDoubleClick}
          role="button"
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-label={folder.name}
        >
          <button
            onClick={handleToggleExpand}
            className={`
            w-4 h-4 flex items-center justify-center transition-transform
            ${hasChildren ? "" : "invisible"}
            ${isExpanded ? "rotate-90" : ""}
          `}
            disabled={!hasChildren}
          >
            <ChevronRight className="w-3 h-3" />
          </button>

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
                {isLoading ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  childCount
                )}
              </span>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="border-l border-slate-200 ml-2">
            {isLoading && (
              <div
                className="flex items-center py-1 px-2"
                style={{ paddingLeft: `${level * 12 + 20}px` }}
              >
                <Loader2 className="w-3 h-3 text-slate-400 animate-spin mr-2" />
                <span className="text-xs text-slate-500">Loading...</span>
              </div>
            )}

            {error && (
              <div
                className="flex items-center py-1 px-2"
                style={{ paddingLeft: `${level * 12 + 20}px` }}
              >
                <span className="text-xs text-red-500">{error}</span>
              </div>
            )}

            {!isLoading &&
              !error &&
              folderChildren?.map((child) => (
                <FolderNode
                  key={child.id}
                  folder={child}
                  level={level + 1}
                  expandedIds={expandedIds}
                  onExpandedChange={onExpandedChange}
                  onSetNewRoot={onSetNewRoot}
                />
              ))}
          </div>
        )}
      </div>
    );
  }
);

FolderNode.displayName = "FolderNode";

export const FolderTree: React.FC<FolderTreeProps> = React.memo(
  ({ folders, expandedIds, onExpandedChange, onSetNewRoot }) => {
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
