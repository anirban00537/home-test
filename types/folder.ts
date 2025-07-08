export interface FolderItem {
  id: string;
  name: string;
  type: "folder" | "file";
  children?: FolderItem[];
  path?: string;
}
