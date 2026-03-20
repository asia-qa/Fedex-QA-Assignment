import { ErrorResponse } from "@support/types/error-response";

export function buildErrorResponse(
  statusCode: number,
  errorMessage: string,
  contentType = "application/json",
): ErrorResponse {
  return {
    status: statusCode,
    message: errorMessage,
    contentType,
  };
}
