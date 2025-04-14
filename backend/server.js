const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const connectDB=require('./config/db')
const userRoutes=require('./routes/userRoutes')
const ticketRoutes=require('./routes/ticketRoutes')



const app=express()
dotenv.config()
app.use(express.json())
app.use(cors())


const PORT=process.env.PORT
connectDB()



app.get('/',(req,res)=>{
    res.send("Welcome to the Project!")
})

// API Routes
app.use('/api/users',userRoutes)
app.use('/api/users/ticket',ticketRoutes)

// Admin Routes
app.use('/api/admin',ticketRoutes)





app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    
})