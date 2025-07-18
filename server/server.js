const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");

require("dotenv").config();


const app=express();
const userRoutes=require("./routes/userRoutes.js");
const User=require("./models/User.js")
const noteRoutes=require("./routes/noteRoutes.js");
const tagRoutes=require("./routes/tagRoutes.js")


app.use(cors());
app.use(express.json());

app.use("/api/users",userRoutes);
app.use("/api/notes",noteRoutes);
app.use("/api/tags",tagRoutes);

app.get("/",(req,res)=>{

    res.send("Hello");
    
});

app.get("/api/test",(req,res)=>{
    res.json({message:"Hey hello from devmate"});
    
});

const { errorHandler } = require("./middleware/errorMiddleware.js");
app.use(errorHandler);




const PORT=process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("✅ MongoDB connected");  
}).catch((e)=>{
    console.log('❌ MongoDB connection failed:', e);
    
});

app.listen(PORT,(err)=>{

    if(err)
    {
        console.log('Error found while setting up the server',err);
    }
    else
    console.log(` Server is running at the PORT ${PORT}`);
    
});
