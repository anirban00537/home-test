import axios from "axios";
import { ApiResponse, FolderItem } from "../types/folder";

// This api is used to get the root folders
export const getFolders = async (): Promise<ApiResponse<FolderItem[]>> => {
  const response = await axios.get("/api/folders");
  return response.data;
};

// This api is used to get the children of a folder
export const getFolderChildren = async (
  folderId: string
): Promise<ApiResponse<FolderItem[]>> => {
  const response = await axios.get(`/api/folders/${folderId}`);
  return response.data;
};
