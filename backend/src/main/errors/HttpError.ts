// Custom error class to handle HTTP exceptions
class HttpError extends Error { 
  message: string;
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super();
    this.name = this.constructor.name
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default HttpError;
  