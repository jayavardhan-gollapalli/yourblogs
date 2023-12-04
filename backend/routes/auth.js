const express= require('express');
const router =express.Router();
const { body,validationResult } = require('express-validator');
const bcrypt= require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../models/User');
const fetchuser = require('../middleware/fetchUser');
const JWT_SECRET="n@n!@jAY@";

router.get('/createAccount',[
    body('name').isLength({min:3}),
    body('password').isLength({min:5}),
    body('email').isEmail(),
],async (req,res)=>{
    let error=await validationResult( req );
    console.log("error is",error);
    if(!error.isEmpty()){
        res.send({success:false, error:error.array()})
        return;
        // {
        //     "success": false,
        //     "error": [
        //       {
        //         "type": "field",
        //         "value": "j",
        //         "msg": "Invalid value",
        //         "path": "name",
        //         "location": "body"
        //       },
        //       {
        //         "type": "field",
        //         "value": "jaa",
        //         "msg": "Invalid value",
        //         "path": "password",
        //         "location": "body"
        //       }
        //     ]
        //   }
    }

    let salt = await bcrypt.genSalt(10);
    let hashPass =await bcrypt.hash(req.body.password, salt);
    
    let user = await User.create({
        email:req.body.email,
        name:req.body.name,
        code: req.body.codename,
        password: hashPass
    })
    .then(()=>{res.send({success:true})})
    .catch((error)=>{res.send({success:false, error:error})})
})

// On login return authtoken 
// error 1 for no user found
// error 2 for wrong password
router.post('/login',async (req,res)=>{
    let user= await User.findOne({email:req.body.email}).lean();
    if(!user)res.send({success:false,error:"No user with that mail"});
    else{
        console.log(user);
        let compare= await bcrypt.compare(req.body.password,user.password);
        if(compare){
            let data= {
                id: user._id,
                name: user.name,
                email:user.email,
            }
            let authtoken= jwt.sign(data, JWT_SECRET);
            data.authtoken = authtoken;
            // localStorage.setItem('token',authtoken);
            console.log(data);
            res.send({success:true,user:data});
            return;
        }
        else {
            res.send({success:false,error:"Wrong credentials entered"});
        }
    }
})

//fetch user makes the body
router.post('/verify',fetchuser,async(req,res)=>{
    // if(req.body.success){
    //     res.send(req.body);
    //     console.log("The verification passed")
    //     return;
    // }
    res.send(req.body);
})

router.put('/update',fetchuser,async (req,res)=>{
    if(!user)res.send({success:false, message:["No user with that email"]});
    else{
        console.log(user);
        let compare= await bcrypt.compare(req.body.password,user.password);
        if(compare){
            let data= {
                id: user._id,
                email:user.email,
                name: user.name,
              }
            let authtoken= jwt.sign(data, JWT_SECRET);
            res.send({success:true, authtoken});
            return
        }
        else {
            res.send({success:false,error:["Wrong password"]});
        }
    }
})


module.exports = router;