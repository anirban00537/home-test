import { NextResponse } from "next/server";
import { ApiResponse } from "../types/folder";

// This function is used to return a success response
export function successResponse<T>(
  data: T,
  message: string = "Request successful",
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status }
  );
}

// This function is used to return an error response
export function errorResponse(
  message: string = "Internal server error",
  status: number = 500
): NextResponse<ApiResponse<null>> { 
  return NextResponse.json(
    {
      success: false,
      data: null,
      message,
    },
    { status }
  );
}
