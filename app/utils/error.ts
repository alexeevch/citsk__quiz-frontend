export class AppApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number, cause?: Error) {
    super(message);
    this.name = "AppApiError";
    this.statusCode = statusCode;
    this.cause = cause;

    Object.setPrototypeOf(this, AppApiError.prototype);
  }
}
