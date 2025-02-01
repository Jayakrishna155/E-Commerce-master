const express = require("express")
const app =express()
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const cors = require("cors")
require("dotenv").config();
const port = process.env.PORT||4000;
// const passport = require('passport');
// const session = require('express-session');
// const GoogleStatergy = require('passport-google-oauth20').Strategy;

// app.use(session({
//     secret:"secret",
//     resave:false,
//     saveUninitialized:true,
// }))
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//     new GoogleStatergy({
//         clientID:process.env.GOOGLE_CLIENT_ID,
//         clientSecret:process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL:"http://localhost:3000/auth/google/callback"
//     },
//     (accessToken,refreshToken,profile,done)=>{
//        return done(null,profile);
//     }
// )
// );

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://jayakrishna:jaya123@jayakrishna.skfvg.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Jayakrishna")

app.get("/",(req,res)=>{
    res.send("Express app is running")
})



//image storage engine
const storage = multer.diskStorage({
    destination:"./upload/images",
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})
app.use("/images",express.static('upload/images'));
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`https://e-commerce-backend-91i0.onrender.com/images/${req.file.filename}`
    })
})


//schema
const Product = mongoose.model("product",{
    id:{
        type:Number,
        require:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    new_price:{
        type:Number,
        require:true
    },
    old_price:{
        type:Number,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    available:{
        type:Boolean,
        default:true
    }
})
//USER MODEL
const Users = mongoose.model("users",{
     name:{
        type:String,
     },
     email : {
        type:String,
        unique:true,
     },
     password:{
        type:String,
     },
     cartData:{
        type:Object
     },
     date:{
        type:Date,
        default:Date.now
     }
})

app.post("/signup",async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check)
    {
        return res.status(400).json({success:false,error:"Existing User Found with same email address"})
    }
    let cart={};
    for(let i=0;i<300;i++)
    {
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();
    const data = {
        user:{
            id:user.id,
        }
    }
    const token = jwt.sign(data,'secret_com');
    res.json({success:true,token})
})
//login
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email})
    if(user)
    {
        const passCmp = req.body.password === user.password;
        if(passCmp)
        {
            const data = {
                user:{
                    id:user.id,
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token})
        }
        else
        {
            res.json({success:false,error:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,error:"Wrong Email Address"});
    }
})
app.post("/addproduct",async(req,res)=>{
    const products  = await Product.find({});
    let id = 1;
    if(products.length>0)
    {
        let last_product = products.slice(-1);
        let last_item= last_product[0];
        id = last_item.id;
        id+=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    })
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

app.post("/deleteproduct",async(req,res)=>{
   const product = await Product.findOneAndDelete({id:req.body.id});
   console.log("removed");
   res.json({
    success:true,
    name:req.body.name,
   })
})
//all products
app.get("/allproducts", async (req, res) => {
    try {
        const allproducts = await Product.find({});
        res.json(allproducts);  // Send products as JSON
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
});

//newcollection data
app.get("/newcollections",async(req,res)=>{
    let products  =  await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    res.send(newcollection);
})

//popular 
app.get("/popularwomen",async (req,res)=>{
    let products = await Product.find({category:"women"});
    let popularproducts = products.slice(0,4);
    res.send(popularproducts)
})
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    console.log('Token:', token);
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, 'secret_ecom');
        console.log('Decoded Data:', data); // Debug decoded data
        req.user = data.user;
        next();
    } catch (err) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

app.post("/addtocart", fetchUser, async (req, res) => {
    const user = await Users.findOne({_id: req.user.id});
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }
    const quantity = (user.cartData[req.body.itemId] || 0) + 1;
    
    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { $set: { [`cartData.${req.body.itemId}`]: quantity } },
        { new: true }
    );
    res.send({ message: 'Cart Item Added successfully' });
    
});
app.post("/removefromcart", fetchUser, async (req, res) => {
    const user = await Users.findOne({_id: req.user.id});
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }
    let quantity = 0;
    if(user.cartData[req.body.itemId]>0)
    {
         quantity = (user.cartData[req.body.itemId] || 0)-1;
    }

    
    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { $set: { [`cartData.${req.body.itemId}`]: quantity} },
        { new: true }
    );
    res.send({ message: 'Cart Item removed successfully' });
    
});

app.post('/getcart',fetchUser,async(req,res)=>{
     console.log("getcart")
     const user = await Users.findOne({_id: req.user.id});
     res.json(user.cartData)
})
app.listen(port,(error)=>{
   if(!error)
   {
     console.log("server running on port "+port);
   }
   else
   {
    console.log("Error : "+error);
   }
})

