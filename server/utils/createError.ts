type AppError = Error & {
    statusCode: number;
};

const createError = (message: string, statusCode: number): AppError => {
    const err = new Error() as AppError;

    err.message = message;
    err.statusCode = statusCode;

    if (!message || !statusCode) {
        console.log('There is Some Problem');
    }

    return err;
};

export { createError };
