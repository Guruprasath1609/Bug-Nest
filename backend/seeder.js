const User=require('./models/User')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

// connection to MongoDB
mongoose.connect(process.env.MONGO_URI)

// Admin Creation 
const createAdmin = async () => {
  try {
    const admin = await User.create({
      name: "admin",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });
    await admin.save();
    console.log('Admin Created Successfully');
    
  } catch (error) {
    console.error(error);
    console.log("Failed to create");
  }
};

// The Script needs to be called to create a admin in the database
createAdmin()