type AppError = Error & {
    statusCode: number;
};

const createError = (message: string, statusCode: number): AppError => {
    const err = new Error() as AppError;

    err.message = message;
    err.statusCode = statusCode;

    

    return err;
};

export { createError };
