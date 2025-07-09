import { FolderItem } from "../types/folder";
import { folderStructure } from "../lib/folderTree";

export const findFolderByPath = (path: string): FolderItem | null => {
  if (!path || path === "/") return null;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const searchFolder = (folders: FolderItem[]): FolderItem | null => {
    for (const folder of folders) {
      if (folder.path === normalizedPath) {
        return folder;
      }
      if (folder.children?.length) {
        const found = searchFolder(folder.children);
        if (found) return found;
      }
    }
    return null;
  };

  return searchFolder(folderStructure);
};

export const findParentFolder = (childPath: string): FolderItem | null => {
  if (!childPath) return null;

  // Get parent path by removing last segment
  const pathParts = childPath.split("/").filter(Boolean);
  if (pathParts.length <= 1) return null; // No parent if at root level

  pathParts.pop(); // Remove last segment
  const parentPath = `/${pathParts.join("/")}`;

  return findFolderByPath(parentPath);
};

export const getPathAncestors = (path: string): string[] => {
  const segments = path.split("/").filter(Boolean);
  const ancestors: string[] = [];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    ancestors.push(currentPath);
  }

  return ancestors;
};

export const getAncestorFolderIds = (path: string): string[] => {
  const ancestors = getPathAncestors(path);
  const ancestorFolders = ancestors
    .map(findFolderByPath)
    .filter(Boolean) as FolderItem[];

  return ancestorFolders.map((folder) => folder.id);
};

export const pathToFolderState = (path: string) => {
  if (!path || path === "/") {
    return {
      selectedFolder: null,
      rootFolder: null,
      expandedIds: new Set<string>(),
    };
  }

  const targetFolder = findFolderByPath(path);
  if (!targetFolder) {
    return {
      selectedFolder: null,
      rootFolder: null,
      expandedIds: new Set<string>(),
    };
  }

  const parentFolder = findParentFolder(path);
  const ancestorIds = getAncestorFolderIds(path);

  return {
    selectedFolder: targetFolder,
    rootFolder: parentFolder,
    expandedIds: new Set(ancestorIds),
  };
};
