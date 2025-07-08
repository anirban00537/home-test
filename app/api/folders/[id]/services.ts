import { FolderItem } from "@/types/folder";

export const findFolderById = (
  folders: FolderItem[],
  id: string
): FolderItem | null => {
  for (const folder of folders) {
    if (folder.id === id) {
      return folder;
    }
    if (folder.children?.length) {
      const found = findFolderById(folder.children, id);
      if (found) return found;
    }
  }
  return null;
};
