import { folderStructure } from "../../../lib/folderTree";
import { successResponse, errorResponse } from "../../../lib/apiResponse";

export async function GET() {
  try {
    return successResponse(folderStructure, "Folders fetched successfully");
  } catch (error) {
    return errorResponse("Failed to fetch folders", 500);
  }
}
 