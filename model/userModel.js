import mongoose from "mongoose";
// import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
// Define User schema
const userSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true
    },
    password: {
        type: String,
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
});
userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
  });
  
  // JWT token
  userSchema.methods.getJWTtoken = function(){
    return jwt.sign({id:this._id} , process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
  };
  
  // Compared password
  userSchema.methods.comparePassword = async function(enterpassword){
    if (!enterpassword) {
      throw new Error("No password provided for comparison.");
  }
  
  // Check if this.password is provided
  if (!this.password) {
      throw new Error("No stored password found for comparison.");
  }
        return bcrypt.compare(enterpassword,this.password)
  }

  // Create User model
const User = mongoose.model('User', userSchema);

export default User