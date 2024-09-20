import mongoose from "mongoose";

const  UserSchema = new mongoose.Schema(
    {
        fristName: {
            type:String,
            require: true,
            minlength: 2,
            maxlength: 50
        },
        lastName: {
            type:String,
            require: true,
            minlength: 2,
            maxlength: 50
        },
        email: {
            type:String,
            require: true,
            maxlength: 50,
            unique:true
        },
        password: {
            type:String,
            require: true,
            minlength: 5
        },
        picturePath: {
            type:String,
            default:""
        },
        friends:{
            type:Array,
            default:[]
        },
        location:String,
        occupation:String,
        viewedProfile:Number,
        impressions:Number
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", UserSchema)

export default User