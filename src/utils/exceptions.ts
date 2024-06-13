class BaseError {
  public message: string
  public cause: Error
  public name: string
  public stack: string

  constructor(message: string, cause: Error){
    this.cause = cause;
    this.stack = cause?.stack;
  }
}

export class ConnectionError extends BaseError {
  constructor(message: string, cause: Error){
    super(message, cause)
    this.name = 'ConnectionError';
    this.message = message;
    this.cause = cause;
    this.stack = cause?.stack;
  }
}

export class EmptyResponseError extends BaseError {
  constructor(message: string, cause: Error){
    super(message, cause)
    this.name = 'EmptyResponseError';
    this.message = message;
    this.cause = cause;
    this.stack = cause?.stack;
  }
}

export class HttpRequestError extends BaseError {
  constructor(message: string, cause?: Error){
    super(message, cause)
    this.name = 'HttpRequestError'
    this.message = message;
    this.cause = cause;
    this.stack = cause?.stack;
  }
}