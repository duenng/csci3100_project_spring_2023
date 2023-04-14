const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const routes = require('./routes');

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let feedLimit = 50

var admin = require("firebase-admin");

var serviceAccount = require("./firebase-service-account.json");
const { async } = require('@firebase/util');

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
    username: { type: String, required: true },
    tag: { type: String, required: true },
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
          belong:{type:Schema.Types.ObjectId, ref: 'Post',required: true},
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
    const Admin = mongoose.model('Admin', adminSchema);

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
      try{
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
        let result = await User.create(option)
        return res.status(201).json(result)

      }catch(err){
        console.log(err);
        return res.status(400).send(err);
      }
    })

    //create post
    app.post("/post", async (req,res)=>{
      console.log(req)
      try{
      let Id = await newPostId();
      let {userId, text, reposting,date,images,video} = req.body;
      let user = await User.findOne({userId:userId});
      if (!user) {
        return res.status(404).send("User not found");
      }
      let repostedId= null;
      if(reposting){
        let repostedPost = await Post.findOne({postId:reposting});
        if(repostedPost){
          repostedId = repostedPost._id
        }
      }
      let option={
        postId:Id,
        user:user._id,
        text:text,
        reposting:repostedId,
        date:date,
        images:images,
        video:video
      }
      console.log(option)
        let result = await Post.create(option)
        if(repostedId){
          await Post.updateOne({_id:repostedId},{$push:{repost:result._id}});
        }
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
        belong:post._id,
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
    // Get all post info by postId
    app.get("/post/:ID", async (req, res) => {
      let ID = req.params.ID;
      try {
        let post = await Post.findOne({ postId:ID})
        .populate(['user',{path:'like',select:"userId"},"reposting",{path:"comment",populate:["user",{path:'like',select:"userId"}]}]);
        if (!post) {
          return res.status(404).send("Post not found");
        }
        return res.status(200).json(post);
      } catch (err) {
        console.log(err);
        return res.status(400).send(err);
      }
    });

    //validate post ID
    app.get("/post/validate/:ID", async (req, res) => {
      let ID = req.params.ID;
      try {
        let post = await Post.findOne({ postId:ID});
        if (!post) {
          return res.status(404).send("Post not found");
        }
        return res.status(200).json(post);
      } catch (err) {
        console.log(err);
        return res.status(400).send(err);
      }
    });

    //admin login
    app.get("/admin/login", async (req, res) => {
      try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username:username, username:password });
        if (!admin) {
          return res.status(401).json({ error: "Invalid username or password" });
        }
        return res.status(200).json({username:admin.username});
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
    });

    //like a post
    app.post("/like/:ID", async(req,res)=>{
      try {
        const { userId } = req.body;
        const postId  = req.params.ID;
    
        const user = await User.findOne({ userId:userId });
        if (!user) {
          return res.status(404).send("User not found");
        }
        const post = await Post.findOne({ postId:postId });
        if (!post) {
          return res.status(404).send("Post not found");
        }

        if (!post.like.includes(user._id)) {
          await Post.updateOne({_id:post._id},{$push:{like:user._id}});
        }

        return res.status(200).json(post);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
    //dislike
    app.post("/dislike/:ID", async (req, res) => {
      try {
        const { userId } = req.body;
        const postId  = req.params.ID;
    
        const user = await User.findOne({ userId: userId });
        if (!user) {
          return res.status(404).send("User not found");
        }
    
        const post = await Post.findOne({ postId: postId });
        if (!post) {
          return res.status(404).send("Post not found");
        }
    
        if (post.like.includes(user._id)) {
          await Post.updateOne({ _id: post._id }, { $pull: { like: user._id } });
        }
    
        return res.status(200).json(post);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
    });

    //follow
    app.post("/follow/:followerId", async (req, res) => {
      try {
        let targetId = req.params.followerId;
        let {userId} = req.body
        let user = await User.findOne({userId:userId});
        if (!user) {
          return res.status(404).send("User not found");
        }
        let target = User.findOne({userId:targetId})
        if (!target) {
          return res.status(404).send("Follow target not found");
        }
        if(!target.follower.includes(user._id)&&user.following.includes(target._id)){
          await User.updateOne({_id:user._id},{$push:{following:target._id}});
          await User.updateOne({_id:target._id},{$push:{follower:user._id}});
        }
        return res.status(200).json(user);
      } catch (error) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
    
    // unfollow
    app.post("/unfollow/:followerId", async (req, res) => {
      try {
        let targetId = req.params.followerId;
        let { userId } = req.body;
        let user = await User.findOne({ userId: userId });
        if (!user) {
          return res.status(404).send("User not found");
        }
        let target = await User.findOne({ userId: targetId });
        if (!target) {
          return res.status(404).send("Unfollow target not found");
        }
        if (target.follower.includes(user._id) && user.following.includes(target._id)) {
          await User.updateOne({ _id: user._id }, { $pull: { following: target._id } });
          await User.updateOne({ _id: target._id }, { $pull: { follower: user._id } });
        }
        return res.status(200).json(user);
      } catch (error) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
    });


    //get preview post info from following
    app.get("/followingPosts/:ID", async (req,res)=>{
      try {
        //console.log(req)
        const userId = req.params["ID"]
        console.log(userId)
        let user = await User.findOne({userId:userId})
        if(!user){
          return res.status(404).send("User not found");
        }
        let list = user.following
        if(!list){
          return res.status(200).json([])
        }
        let posts = await Post.find({user:{$in:list}}).populate(['user',{path:'like',select:"userId"},"reposting"]).sort('-date').limit(feedLimit);
        //console.log(following)
        return res.status(200).send(posts)
      } catch (err) {
        console.log(err);
        return res.status(500).send({ error: "Internal server error" });
      }
    });

    //get preview post info of an user by Id
    app.get("/userPost/:ID", async (req,res)=>{
      try {
        const id = req.params.ID
        let user = await User.findOne({userId:id})
        if(!user){
          return res.status(404).send("User not found");
        }
        let posts = Post.find({user:user._id}).populate(['user',{path:'like',select:"userId"},"reposting"]).sort('-date').limit(feedLimit);
        return res.status(200).json(posts)
      } catch (error) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
    });

    //get users by keyword
    app.get("/searchUsers/:keyword",async(req,res)=>{
      try {
        let keyword = req.params.keyword;
        let users =  await User.find({ username: { $regex: new RegExp(keyword), $options: "i" } }).limit(feedLimit).select({ username: 1, tag: 1, avatar:1})
        return res.status(200).json(users)
      } catch (error) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
    })
    
    // admin get all users
    app.get("/admin/user",async(req,res)=>{
      try {
        let users =  await User.find().select({ userId:1, username: 1, tag: 1, avatar:1,following:1,follower:1})
        return res.status(200).json(users)
      } catch (error) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
    })

    //admin delete user
    app.delete("/admin/user/:ID", async (req, res) => {
      try {
        let id = req.params.ID;
        let user = await User.findOne({userId:id});
        let posts = await Post.find({ user: user._id });
        for (let i = 0; i < posts.length; i++) {
          let post = posts[i];
          await Comment.deleteMany({ _id: { $in: post.comment } });
          await Post.deleteOne({ _id: post._id });
        }
        let comments = await Comment.find({ user: user._id });
        for (let i = 0; i < comments.length; i++) {
          let comment = comments[i];
          await Post.updateOne(
            { _id: comment.belong },
            { $pull: { comment: comment._id } }
          );
          await Comment.deleteOne({ _id: comment._id });
        }
        await User.deleteOne({ _id: user._id });
        return res.status(204).send(`Deleted user ${id}`);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
    });

});
app.use(routes);
app.listen(port, () => console.log(`Listening on port ${port}`));