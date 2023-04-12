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
  // const EventSchema = Schema({
  //   eventId: {type: Number, required: true, unique: true },
  //   refId: {type: Number, required: true, unique: true},
  //   title: { type: String, required: true,},
  //   venue: { type: Schema.Types.ObjectId, ref: 'Venue',required: true},
  //   date: { type: String ,required: true},
  //   description: { type: String,},
  //   presenter: {type: String,required:true},
  //   price: {type: String,}
  // });

  // const Event = mongoose.model('Program', EventSchema);



})


app.listen(port, () => console.log(`Listening on port ${port}`));