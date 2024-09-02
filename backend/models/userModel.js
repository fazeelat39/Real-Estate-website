const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

     name : String,
     email : {
        type : String,
        unique : true,
        required : true
     },

     password : {
        type : String,
        required : true
     },
     profilePic: {
        type : String,
      },

      role:
      {
         type: String,
         default : '../common/role/GENERAL',
      }
    
},
{
    timestamps: true
 }
);

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")){
      next();
   }
   this.password = await bcrypt.hash(this.password, 10);
 });

 userSchema.methods.getJwtToken = function() {
   return Jwt.sign({id: this._id}, process.env.TOKEN_SECRET_KEY,{
   expiresIn: process.env.TOKEN_EXPIRES,
 });
 }; 

 userSchema.methods.comparePassword = async function (enteredPassword){
 return await bcrypt.compare(enteredPassword, this.password)
};


const userModel = mongoose.model("user",userSchema)

module.exports = userModel