const errorHandler=(err,req,res,nect)=>{

    const statusCode=res.statuCode===200?500:res.statusCode;

    res.status(statusCode).json({
        messasge:err.messasge,
        stack:process.env.NODE_ENV==="production"?null:err.stack,
    });

};

module.exports={errorHandler};