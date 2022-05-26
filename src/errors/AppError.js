export default class AppError {
  message;
  statusCode;

  constructor(message = "An error has occurred", statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
