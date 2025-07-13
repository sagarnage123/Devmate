const createError=(message,statusCode)=>{
    const err=new Error();
    err.message=message;
    err.statusCode=statusCode;
    if(!message || !statusCode)
        console.log('There is Some Problem');
        
    return err;  
}

module.exports={createError};