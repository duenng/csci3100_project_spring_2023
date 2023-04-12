const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3001;
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

  const userSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    tag: { type: String, required: true },
    avatar: { type: String, default: null },
    following: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    follower: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  });

  const postSchema = new mongoose.Schema({
        postId:{type:Number, required: true, unique:true},
        user:{type:Schema.Types.ObjectId, ref: 'User',required: true},
        text: { type: String, required: true },
        like: { type: [Schema.Types.ObjectId], ref:"User",default: [] },
        repost: { type: [Schema.Types.ObjectId],ref:"Post", default: [] },
        date: { type: Date, default: Date.now },
        images: { type: [String], default: [] },
        video: { type: String, default: null },
        comment: { type: [mongoose.Schema.Types.ObjectId], ref: 'Comment', default: null }
    });

    const commentSchema = new mongoose.Schema({
          user:{type:Schema.Types.ObjectId, ref: 'User',required: true},
          replying: {type:Schema.Types.ObjectId, ref: 'User',required: true},
          text: { type: String, required: true },
          date: { type: Date, default: Date.now },
          like: { type: [Schema.Types.ObjectId], ref:"User",default: [] },
          images: { type: [String], default: [] },
          video: { type: String, default: null },
    });

    const User = mongoose.model('User', userSchema);
    const Comment = mongoose.model('Comment', commentSchema);
    const Post = mongoose.model('Post', postSchema);



});


app.listen(port, () => console.log(`Listening on port ${port}`));