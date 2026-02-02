import mongoose, { Document,Model,Schema} from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface IUserDocument extends IUser, Document {
    _id: mongoose.Types.ObjectId;
} 



const userSchema:Schema<IUserDocument>=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    }
},{
    timestamps:true

});

const User: Model<IUserDocument> =
 mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema);

export default User;