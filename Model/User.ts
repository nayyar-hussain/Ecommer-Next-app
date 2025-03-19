import mongoose, { Model, model, models, Schema } from "mongoose";

interface IUser extends  Document {
    _id? : mongoose.Types.ObjectId,
    name : string,
    password : string,
    email : string,
    imageUrl : string,
    cartItmes : object,
}

const userSchema  = new Schema<IUser>({
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    imageUrl : {type : String , required : true},
    cartItmes : {type : Object , default : {}}
},{minimize : false})

const userModel: Model<IUser> = models.User || model<IUser>("User", userSchema);
export default userModel