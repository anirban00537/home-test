import { folderStructure } from "../../../../lib/folderTree";
import { successResponse, errorResponse } from "../../../../lib/apiResponse";
import { findFolderById } from "./services";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const parentFolder = findFolderById(folderStructure, id);

    if (!parentFolder) {
      return errorResponse(`Folder with ID ${id} not found`, 404);
    }

    const children =
      parentFolder.children?.map((child) => ({
        id: child.id,
        name: child.name,
        type: child.type,
        path: child.path,
        hasChildren: Boolean(child.children?.length),
        childrenCount: child.children?.length || 0,
      })) || [];

    return successResponse(
      children,
      `Children of folder ${id} fetched successfully`
    );
  } catch (error) {
    console.log(error, "this is error");
    return errorResponse("Failed to fetch folder children", 500);
  }
}
