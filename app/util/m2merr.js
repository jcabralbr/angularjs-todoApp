var common_error = require('common-errors');
var result = require('./result');

function InvalidArgument(message){
        this.constructor.prototype.__proto__ = Error.prototype // Make this an instanceof Error.
        Error.call(this) // Does not seem necessary. Perhaps remove this line?
        Error.captureStackTrace(this, this.constructor) // Creates the this.stack getter
        this.name = this.constructor.name; // Used to cause messages like "UserError: message" instead of the default "Error: message"
        this.message = message; // Used to set the message
        this.status = result.InvalidArgumentError;

}

exports.InvalidArgument = InvalidArgument;



function BadRequest(message){
    this.constructor.prototype.__proto__ = Error.prototype // Make this an instanceof Error.
    Error.call(this) // Does not seem necessary. Perhaps remove this line?
    Error.captureStackTrace(this, this.constructor) // Creates the this.stack getter
    this.name = this.constructor.name; // Used to cause messages like "UserError: message" instead of the default "Error: message"
    this.message = message; // Used to set the message
    this.status = result.BadRequestError;

}


exports.BadRequest = BadRequest;



function InternalError(message){
    this.constructor.prototype.__proto__ = Error.prototype // Make this an instanceof Error.
    Error.call(this) // Does not seem necessary. Perhaps remove this line?
    Error.captureStackTrace(this, this.constructor) // Creates the this.stack getter
    this.name = this.constructor.name; // Used to cause messages like "UserError: message" instead of the default "Error: message"
    this.message = message; // Used to set the message
    this.status = result.InternalError;

}

exports.InternalError = InternalError;



function ResourceNotFoundError(message){
    this.constructor.prototype.__proto__ = Error.prototype // Make this an instanceof Error.
    Error.call(this) // Does not seem necessary. Perhaps remove this line?
    Error.captureStackTrace(this, this.constructor) // Creates the this.stack getter
    this.name = this.constructor.name; // Used to cause messages like "UserError: message" instead of the default "Error: message"
    this.message = message; // Used to set the message
    this.status = result.ResourceNotFoundError

}

exports.ResourceNotFoundError = ResourceNotFoundError;