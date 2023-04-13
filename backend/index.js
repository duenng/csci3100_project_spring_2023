const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var admin = require("firebase-admin");

var serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const mongoURI = 'mongodb+srv://duenng:t5l5q29t@csci3100.unxmyiq.mongodb.net/test';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB:', err);
});

mongoose.connection.once("open",function(){
  console.log("Connection is open...");

  const userSchema = new Schema({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true , unique: true},
    tag: { type: String, required: true, unique: true },
    avatar: { type: String, default: null },
    following: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    follower: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
	  token: { type: String, required: true, unique: true },
  });

  const postSchema = new Schema({
        postId:{type:Number, required: true, unique:true},
        user:{type:Schema.Types.ObjectId, ref: 'User',required: true},
        text: { type: String, required: true },
        like: { type: [Schema.Types.ObjectId], ref:"User",default: [] },
        reposting:{type:Schema.Types.ObjectId, ref: 'Post', default:null},
        repost: { type: [Schema.Types.ObjectId],ref:"Post", default: [] },
        date: { type: Date, default: Date.now },
        images: { type: [String], default: [] },
        video: { type: String, default: null },
        comment: { type: [Schema.Types.ObjectId], ref: 'Comment', default: null }
    });

    const commentSchema = new Schema({
          user:{type:Schema.Types.ObjectId, ref: 'User',required: true},
          replying: {type:Schema.Types.ObjectId, ref: 'User',required: true},
          text: { type: String, required: true },
          date: { type: Date, default: Date.now },
          like: { type: [Schema.Types.ObjectId], ref:"User",default: [] },
          images: { type: [String], default: [] },
          video: { type: String, default: null },
    });

    const adminSchema = new Schema({
      userId: { type: Number, required: true, unique: true },
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    });

    const User = mongoose.model('User', userSchema);
    const Comment = mongoose.model('Comment', commentSchema);
    const Post = mongoose.model('Post', postSchema);
    const Admin = mongoose.model('Admin', postSchema);

    const newUserId = async () =>{
      let last = await User.findOne().sort('-userId');
      if(!last) return 1;
      let id =  last.userId +1;
      return  id;
    }

    const newPostId = async () =>{
      let last = await Post.findOne().sort('-postId');
      if(!last) return 1;
      let id =  last.postId +1;
      return  id;
    }

    const newAdminId = async () =>{
      let last = await Admin.findOne().sort('-postId');
      if(!last) return 1;
      let id =  last.postId +1;
      return  id;
    }

    //create
    //create user
    app.post("/user", async (req,res)=>{
      let Id = await newUserId();
      let {username, tag, avatar, token} = req.body;
      if(!username || !tag || !token) {
        return res.status(422).send("Missing required data in request body");
      }
      let option ={
        userId:Id,
        username:username,
        tag:tag,
        avatar:avatar,
        token:token,
      }
      try{
        let result = await User.create(option)
        return res.status(201).json(result)

      }catch(err){
        console.log(err);
        return res.status(400).send(err);
      }
    })

    //create post
    app.post("/post", async (req,res)=>{
      let Id = await newPostId();
      let {userId, text, reposting,date,images,video} = req.body;
      let user = await User.findOne({userId:userId});
      if (!user) {
        return res.status(404).send("User not found");
      }
      let repostedPost = null;
      if(reposting){
        repostedPost = await Post.findOne({postId:reposting});
        if(!repostedPost){
          return res.status(404).send("Repost target not found");
        }
      }
      let option={
        postId:Id,
        user:user._id,
        text:text,
        reposting:repostedPost._id,
        date:date,
        images:images,
        video:video
      }
      try{
        let result = await Post.create(option)
        return res.status(201).json(result)

      }catch(err){
        console.log(err);
        return res.status(400).send(err);
      }
    })

    //create comment 
    app.post("/comment", async (req,res)=>{
      let {userId, postId,replying,text,images,video,date} = req.body;
      let user = await User.findOne({userId:userId});
      if (!user) {
        return res.status(404).send("User not found");
      }
      let post = await Post.findOne({postId:postId});
      if (!post) {
        return res.status(404).send("User not found");
      }
      
      let option={
        user:user._id,
        replying:replying,
        text:text,
        date:date,
        images:images,
        video:video
      }
      try{
        let result = await Comment.create(option)
        await Post.updateOne({_id:post._id},{$push:{comment:result._id}});
        return res.status(201).json(result)

      }catch(err){
        console.log(err);
        return res.status(400).send(err);
      }
    })

    //create admin user
    app.post("/admin", async (req,res)=>{
      let Id = await newAdminId();
      let {username,password} = req.body;
      if(!username||!password){
        return res.status(400).send("Missing required data in request body")
      }
      let option ={
        userId:Id,
        username:username,
        tag:tag,
        avatar:avatar,
        token:token,
      }
      try{
        let result = await User.create(option)
        return res.status(201).json(result)

      }catch(err){
        console.log(err);
        return res.status(400).send(err);
      }
    })

    // read
    // Get user by token
    app.get("/user/token/:token", async (req, res) => {
      let token = req.params.token;
      try {
        let user = await User.findOne({ token: token });
        if (!user) {
          return res.status(404).send("User not found");
        }
        return res.status(200).json(user);
      } catch (err) {
        console.log(err);
        return res.status(400).send(err);
      }
    });



});


app.listen(port, () => console.log(`Listening on port ${port}`));