import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{type:String, required:true, minlength:3, maxlength:100},
    email:{type:String, required:true, minlength:6, maxlength:100},
    password:{type:String, required:true, minlength:3, maxlength:100},
    admin:{type:Boolean,default:false},
    createAt:{type:Date, default:Date.now}
})

export default mongoose.model('User',userSchema)