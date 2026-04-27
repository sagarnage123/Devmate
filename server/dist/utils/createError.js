"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const createError = (message, statusCode) => {
    const err = new Error();
    err.message = message;
    err.statusCode = statusCode;
    
    return err;
};
exports.createError = createError;
