import AppError from "../errors/AppError.js";
import toResponse from "../utils/toResponse.js";

export function errorMiddleware(error, req, res, next) {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json(toResponse(null, error.message, error.statusCode));
  }

  console.log(error);

  return res.status(500).json(toResponse(null, "Internal server error", 500));
}
