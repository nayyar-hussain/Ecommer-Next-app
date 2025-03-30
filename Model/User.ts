import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type:String,
      
      required: true,
    },
    email: {
      type: String,
     
      required: true,
      unique : true
    },
    imageUrl: {
      type: String,
      required: true,
      
    },
  },
  {
    timestamps: true,
  }
);


const userModel = models.User || mongoose.model("User", userSchema);

export default userModel;