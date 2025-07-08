import { folderStructure } from "../../../lib/folder-tree";
import { successResponse, errorResponse } from "../../../lib/api-response";

export async function GET() {
  try {
    return successResponse(folderStructure, "Folders fetched successfully");
  } catch (error) {
    return errorResponse("Failed to fetch folders", 500);
  }
}
