export default function toResponse(payload = null, message, statusCode = 200) {
  const response = {
    message,
    statusCode,
  };

  if (statusCode < 200) {
    response.status = "info";
  } else if (statusCode < 300) {
    response.status = "success";
  } else if (statusCode < 400) {
    response.status = "redirect";
  } else if (statusCode < 500) {
    response.status = "error";
  } else if (statusCode < 600) {
    response.status = "serverError";
  }

  if (payload) {
    response.payload = payload;
  }

  return response;
}
