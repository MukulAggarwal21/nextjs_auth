import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username : {
        type : String, 
        required: [true , "Please provide a username"] ,
        unique : [ true , "Please provide a unique username , Someone already have taken it "] , 
    } , 

     email : {
        type : String, 
        required: [true , "Please provide an  email"] ,
        unique : [ true , "Please provide a unique email , Someone already have taken it "] , 
    } ,

     password : {
        type : String, 
        required: [true , "Please provide a  password"] ,
    } ,

     isVerified : {
        type : Boolean, 
        default : false 
    } ,
 
     isAdmin : {
        type : Boolean, 
        default : false 
    } ,

    forgotPasswordToken : String , 
    forgotPasswordTokenExpiry : Date ,
    verifyToken : String , 
    verifytokenExpiry : Date
})

const User = mongoose.models.users || mongoose.model("users" , userSchema)


export default User