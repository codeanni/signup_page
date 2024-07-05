const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const SignupModel = require('./models/Signup')

//middleware
const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/test')

app.post('/signup' , (req,res) =>{
    const {name, email, password, confirmpassword} = req.body;
    SignupModel.findOne({email:email})
    .then(user =>{
        if(user){
            res.json("Already have an Account")
        }else{
            SignupModel.create({name:name,email:email,password:password,confirmpassword:confirmpassword })
            .then(result => res.json("Account created"))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})
app.listen(3001,() => {
    console.log("server is running")
})


// mongoose.connect(MONGO_URL)
// const db = mongoose.connection;
// db.on('error', (err) =>{
//     console.error("mongodb connection error", err);
// })
// db.once('open', () =>{
//     console.log("mongodb is connected");
// })

// const userSchema = new mongoose.Schema({
//     name:String,
//     email:String,
//     password:String,
//     confirmpassword:String
// })
// const User = mongoose.model('User',userSchema)
// app.post('/register', async(req,res) => {
//     try{
//         const newUser = new User({
//         name:req.body.name,
//         email:req.body.email,
//         password:req.body.password,
//         confirmpassword:req.body.confirmpassword,
//     });
//     const savedUser = await newUser.save()
//     res.status(201).json(savedUser)

//     }catch (error){
//         console.error("error during signup",error)
//         res.status(500).json({error:"inter server error"})

//     }
    
// })

// app.listen(PORT)