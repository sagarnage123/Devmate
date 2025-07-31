const errorHandler=(err,req,res,next)=>{

    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal server error";

    res.status(statusCode).json({
        success:false,
        message:message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,

    });

};

module.exports={errorHandler};