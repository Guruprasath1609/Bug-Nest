const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
},
{
    timestamps:true
})


// Hashes password if password gets modified
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
        const salt= await bcrypt.genSalt(10)
        this.password=await bcrypt.hash(this.password,salt)
        next()
})

// Checks the entered password and the password present in the database
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}


module.exports=mongoose.model('User',userSchema)