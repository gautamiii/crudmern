const express =  require("express");
const router = express.Router();
const users = require("../models/userSchema");

const dotenv = require('dotenv'); 

const jwt = require('jsonwebtoken');
//router.get("/",(req,res)=>{
 //   console.log("connect");
//});
//register user
router.post("/register", async(req,res)=>{
   console.log(req.body);
    const {name,email,age,mobile,work,add,desc,password} = req.body;
    if(!name || !email || !age || !mobile || !work || !add || !desc || !password){
        res.status(422).send("plz fill the data");
    }
    try {
        const preuser = await users.findOne({email:email});
        console.log(preuser);
        if(preuser){
            const json = '{"result":"user already exist", "count":null}';
            res.status(422).send(JSON.parse(json));
        }else{
            const aduser = new users({
                name,email,age,mobile,work,add,desc,password
            });
            await aduser.save();
            res.status(201).json(aduser);
            console.log(aduser);
        }
    } catch (error) {
        res.status(422).send(error);
    }
});

//get login data and login user

router.post("/login", async(req,res)=>{
    console.log(req.body);
    const {email,password} = req.body;
    try {
        const log_user = await users.findOne({email:email, password:password});
        if(log_user){
            console.log("anything matched");
            //
            let jwtSecretKey = process.env.JWT_SECRET_KEY; 

            let data = { 
        
                time: Date(), 
        
                userId: 12, 
        
            } 
              
            const token = jwt.sign(data, jwtSecretKey); 
            //
        
           return res.json({result:true,token:token});
            
        }else{
            console.log("email and pass not matchecd");
            return   res.json({result:false});
        }
    } catch (error) {
        res.status(422).send(error);
    }
});

//get userdata

router.get("/getdata",async(req,res)=>{
    try {
        console.log('m here', req.header('Authorization')        )

        let token = req.header('Authorization');

        if(!token){
            //verify
            return res.status(200).json({data:[], status:401});
        }
        const userdata = await users.find();
        console.log(userdata);
        res.status(200).json({data:userdata, status:200});
    } catch (error) {
        res.status(404).json(error);
    }
})

//get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;
        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual);
    } catch (error) {
        res.status(404).json(userindividual);
    }
})


//update userdata

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;
       // console.log("gautamm");
        //console.log({id});
        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });
        console.log(updateduser);
        res.status(201).json(updateduser);
    } catch (error) {
        res.status(422).json(error);
    }
});


//delete user

router.delete("/deleteuser/:id", async(req,res)=>{

    try {
        const {id} = req.params;

        const deleteuser = await users.findByIdAndDelete({_id:id})
        console.log(deleteuser);
        res.status(201).json(deleteuser);
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;