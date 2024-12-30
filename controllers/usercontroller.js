const asyncHandler = require("express-async-handler");
const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registeruser = asyncHandler(async (req, res) => {
   const {name, email, password} = req.body;
   if(!name || !email || !password){
       res.status(400);
       throw new Error('Please enter all fields');
   }
   const useravilable =await User.findOne({email});
   if(useravilable){
       res.status(400);
       throw new Error('User already exists');
   }    
   //first hash the password
   const hahedpassword = await bcrypt.hash(password, 10);//salt10
   console.log(hahedpassword);
   //res.json({message:'Register user'});
   const user = await User.create({
       name,
       email,
       password: hahedpassword
   });
   console.log("User created", user);
   if(user){
       res.status(201).json({
           _id: user._id,
           name: user.name,
           email: user.email
       });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const loginuser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('Please enter all fields');
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
       const accessToken = jwt.sign({
          user:{
            name: user.name,
            email: user.email,
            id: user.id
          }
        }, process.env.JWT_SECRET, {expiresIn: '7d'}); 
    res.json({accessToken});
    }
    else{
        res.status(400);
        throw new Error('Invalid email or password');
    }
    //res.json({message:'Login user'});
}
);


const getcurrentuser = asyncHandler(async (req, res) => {
    res.json(req.user)
});

module.exports = {
    registeruser,
    loginuser,
    getcurrentuser
}
