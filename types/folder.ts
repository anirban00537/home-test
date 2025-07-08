export interface FolderItem {
  id: string;
  name: string;
  type: "folder" | "file";
  children?: FolderItem[];
  path?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}
