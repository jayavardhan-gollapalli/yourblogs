const express= require('express');
const router =express.Router();
const { body,validationResult } = require('express-validator');
const Blog = require('../models/Blog');
const fetchUser = require('../middleware/fetchUser');


router.get('/publicBlogs',async (req,res)=>{
    try{
        let blogs=await Blog.find({public:true}).lean();
        blogs.forEach((blog)=>{
            delete blog.user;
        })
        res.send({success:true,blogs});
        // {
        //     "success": true,
        //     "blogs": [
        //       {
        //         "_id": "65083706b7f02ea0cf4f066f",
        //         "title": "daadtahaf",
        //         "tag": [],
        //         "description": "fdallfdjajdfkadfajdfalkjfdkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkfdallfdjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkfdallfdjajdfkadfajdfkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
        //         "public": true,
        //         "author": "Anonymous",
        //         "date": "2023-09-18T11:39:50.097Z",
        //         "__v": 0
        //       }
        //     ]
        //   }
    }catch(e){
        error={
            name:e.name,
            message:e.message,
            stack:e.stack            
        }
        console.log("error",e);
        res.send({success:false,error});
    }
})
        // {
        //     "user": {
        //       "is": true,
        //       "details": {
        //         "id": "64feed7b4235b415a4366907",
        //         "email": "jaya@gmail.com",
        //         "name": "jayavardhan",
        //         "iat": 1695050932
        //       }
        //     }
        //   }
router.get('/myBlogs',fetchUser,async (req,res)=>{
    if(req.body.user.is){
        let public=await Blog.find({user:req.body.user.id,public:true});
        let private=await Blog.find({user:req.body.user.id,public:false});
        // console.log(jayavardhan);
        res.send({success:true,public,private});
    }else{
        res.send({success:false,error:req.body.user.error});
    }
})

//sends the blog details of the blog
router.get('/blog/:id',fetchUser,async(req,res)=>{
    try{
        // console.log(Jayavardhan);
        let blog= await Blog.findById(req.params.id).lean();
        console.log(req.body.user.is);
        if(req.body.user.is){
            if(blog.user===req.body.user.details.id){
                blog.readit= true;
            }else{
                blog.readit=false;
            }
        }else{
            blog.readit=false;
        }
        await delete blog.user;
        res.send({success:true, blog})
    }catch(e){
        res.send({success:false, error:{
            name:e.name,
            message:e.message,
            stack:e.stack
        }});
    }
})

router.post('/addBlog',[
    body('name').isLength({min:5}),
    body('tag').isLength({max:5}),
    body('description').isLength({min:50}),
    body('title').isLength({max:50,min:5}),
    body('email').isEmail()
],fetchUser,async (req,res)=>{
    // let {title,tag,description,content} = req.body;
    let success=true;
    let errors=await validationResult(req);
    console.log(errors);
    if(errors.length){
        success=false;
        let err= errors.array();
        let er= err.map((element)=>{
            return element.path;
        })
        console.log("Errors in the validation")
        res.send({success,errors:er});
        return;
    }
    try{
        console.log("body after fetching user",req.body);
        let {title,description,public}=req.body;
        let id= req.body.user.details.id;
        let tags =await req.body.tags.map((element)=>{
            return element;
        })
        console.log("tags",tags);
        // body after fetching user {
        //     email: 'jaya@gmail.com',
        //     name: 'jayavardhan',
        //     user: 'nani',
        //     title: 'daadtahaf',
        //     description: 'fdallfdjajdfkadfajdfalkjfdkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkfdallfdjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkfdallfdjajdfkadfajdfkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
        //     author: 'Nanii',
        //     success: true,
        //     id: '64feed7b4235b415a4366907'
        //   }
        let blog= Blog({
            user:id,
            title,
            description,
            tags,
            public
        })
        blog.save();
        res.send({success:true,blog});
        return;
    }catch(err){
        success=false;
        console.log("Errors in saving")
        res.send({success,error:err})
        return;
    }
})
router.post('/makePublic',async (req,res)=>{
    // let {title,tag,description,content} = req.body;
    let success=true;
    let errors=await validationResult(req);
    if(errors.length){
        success=false;
        let err= errors.array();
        let er= err.map((element)=>{
            return element.path;
        })
        console.log("Errors in the validation")
        res.send({success,errors:er});
        return;
    }
    try{
        let blog = Blog(req.body);
        await blog.save();
        res.send({success,blog});
        return
    }catch(e){
        success=false;
        console.log("Errors in saving")
        res.send({success,error:["Some error occured"]})
        return;
    }
})



module.exports = router;