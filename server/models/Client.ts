import mongoose,{Document,Model,Schema} from "mongoose";

export interface IClient {
    userId: mongoose.Types.ObjectId;
    name: string;
    email?: string;
    phone?: string;
    company?: string;
    address?: string;
    notes?: string;
}

interface IClientDocument extends IClient, Document {
    _id: mongoose.Types.ObjectId;
}

const clientSchema=new Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true

        },
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            trim:true
        },
        phone: {
            type: String,
            trim: true
        },
        company: {
            type: String,
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
        notes: {
            type: String,
            trim: true
        }

    },
    {
        timestamps:true
    }
);

clientSchema.index({userId:1,email:1},{unique:true});

const Client: Model<IClientDocument> =
    mongoose.models.Client ||
    mongoose.model<IClientDocument>("Client", clientSchema);

export default Client;