const createError=(message,statusCode)=>{
    const err=new Error();
    err.statusCode=statusCode;

    return err;  
}

module.exports={createError};