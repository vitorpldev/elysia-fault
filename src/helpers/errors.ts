export class ApiError extends Error {
  constructor(message: string, public status: number, public title: string) {
    super(message);
  }
}

export class BadRequest extends ApiError {
  constructor(message: string) {
    super(message, 400, 'BadRequest');
  }
}

export class Unauthorized extends ApiError {
  constructor(message: string = 'Invalid authentication credentials') {
    super(message, 401, 'Unauthorized');
  }
}

export class PaymentRequired extends ApiError {
  constructor(message: string = 'Payment required to proceed') {
    super(message, 402, 'PaymentRequired');
  }
}

export class Forbidden extends ApiError {
  constructor(message: string = 'Access denied due to insufficient permissions') {
    super(message, 403, 'Forbidden');
  }
}

export class NotFound extends ApiError {
  constructor(message: string = 'Requested resource not found') {
    super(message, 404, 'NotFound');
  }
}

export class Conflict extends ApiError {
  constructor(message: string = 'Resource conflict occurred') {
    super(message, 409, 'Conflict');
  }
}

export class Gone extends ApiError {
  constructor(message: string = 'Requested resource is no longer available') {
    super(message, 410, 'Gone');
  }
}

export class LengthRequired extends ApiError {
  constructor(message: string = 'Content length is required') {
    super(message, 411, 'LengthRequired');
  }
}

export class PreconditionFailed extends ApiError {
  constructor(message: string = 'Precondition for the request failed') {
    super(message, 412, 'PreconditionFailed');
  }
}

export class UnsupportedMediaType extends ApiError {
  constructor(message: string = 'Unsupported media type') {
    super(message, 415, 'UnsupportedMediaType');
  }
}

export class RequestRangeNotSatisfiable extends ApiError {
  constructor(message: string = 'Request range is not satisfiable') {
    super(message, 416, 'RequestRangeNotSatisfiable');
  }
}

export class ExpectationFailed extends ApiError {
  constructor(message: string = 'Expectation failed') {
    super(message, 417, 'ExpectationFailed');
  }
}

export class Teapot extends ApiError {
  constructor(message: string = "I'm a teapot") {
    super(message, 418, 'Teapot'); // I'm a teapot (RFC 2324)
  }
}

export class MisdirectedRequest extends ApiError {
  constructor(message: string = 'The request was directed to an incorrect server') {
    super(message, 421, 'MisdirectedRequest');
  }
}

export class UnprocessableEntity extends ApiError {
  constructor(message: string = 'Request data is invalid or cannot be processed') {
    super(message, 422, 'UnprocessableEntity');
  }
}

export class UpgradeRequired extends ApiError {
  constructor(message: string = 'The server requires the client to upgrade to a newer version') {
    super(message, 426, 'UpgradeRequired');
  }
}

export class UnsupportedUpgrade extends ApiError {
  constructor(message: string = 'The server does not support the upgrade requested by the client') {
    super(message, 427, 'UnsupportedUpgrade');
  }
}

export class InvalidSSLCertificate extends ApiError {
  constructor(message: string = "The client's SSL certificate is invalid") {
    super(message, 428, 'InvalidSSLCertificate');
  }
}

export class TooManyRequests extends ApiError {
  constructor(message: string = 'Request limit exceeded') {
    super(message, 429, 'TooManyRequests');
  }
}

export class RequestHeaderFieldsTooLarge extends ApiError {
  constructor(message: string = 'The request headers are too large') {
    super(message, 431, 'RequestHeaderFieldsTooLarge');
  }
}
export class UnavailableForLegalReasons extends ApiError {
  constructor(message: string = 'The resource is unavailable due to legal reasons') {
    super(message, 451, 'UnavailableForLegalReasons');
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = 'Internal server error') {
    super(message, 500, 'InternalServerError');
  }
}

export class GatewayTimeout extends ApiError {
  constructor(message: string = 'Timeout occurred while communicating with upstream server') {
    super(message, 502, 'GatewayTimeout');
  }
}

export class Unavailable extends ApiError {
  constructor(message: string = 'The server is currently unavailable') {
    super(message, 503, 'Unavailable');
  }
}

export class DependencyTimeout extends ApiError {
  constructor(message: string = 'Timeout occurred while waiting for external dependency') {
    super(message, 504, 'DependencyTimeout');
  }
}

export class VariantAlsoNegotiates extends ApiError {
  constructor(
    message: string = 'The server is capable of serving the request, but the client has indicated an alternate preference'
  ) {
    super(message, 506, 'VariantAlsoNegotiates');
  }
}

export class InsufficientStorage extends ApiError {
  constructor(
    message: string = 'The server does not have sufficient storage available to fulfill the request'
  ) {
    super(message, 507, 'InsufficientStorage');
  }
}

export class LoopDetected extends ApiError {
  constructor(message: string = 'An infinite loop has been detected in the request') {
    super(message, 508, 'LoopDetected');
  }
}
