import { Model, model, models, Schema } from "mongoose";

interface IUser extends  Document {
    _id? : String,
    name : string,
    email : string,
    imageUrl : string,
    cartItmes : object,
}

const userSchema  = new Schema<IUser>({
    _id : {type : String , required : true},
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    imageUrl : {type : String , required : true},
    cartItmes : {type : Object , default : {}}
},{minimize : false})

const userModel: Model<IUser> = models.User || model<IUser>("User", userSchema);
export default userModel