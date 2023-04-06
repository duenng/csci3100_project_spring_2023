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


app.listen(port, () => console.log(`Listening on port ${port}`));