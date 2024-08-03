// index.js (or server.js)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();
const port = 5000; // or any port you prefer

// Middleware
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

// Connect to MongoDB
const mongoURL = 'mongodb://localhost:27017/events'; // Replace with your MongoDB connection string
//mongoose.connect(mongoURL);
mongoose.connect(mongoURL, {}).then(() => {
  console.log('Connected to MongoDB');
  //checkAndCreateCollections();
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Define Mongoose Schema and Model
const userSchema = new mongoose.Schema({
  userid: String,
  emailaddress: String
});
// Define Schemas
const eventSchema = new mongoose.Schema({
  id: Number,
  userid:String,
  name: String,
  date: Date,
  location: String,
  description: String
});

const users = mongoose.model('users', userSchema);
const event = mongoose.model('events', eventSchema);


// POST endpoint to add a new user
app.post('/add-user', async (req, res) => {
  const { userid, emailaddress } = req.body;
  try {
    const user = await users.findOne({ userid: userid });
    if(!user){
      const newUser = new users({ userid, emailaddress });
      await newUser.save();
      res.status(201).json({ message: 'User added successfully', user: newUser });
    }else{
      res.status(203).json({ message: 'exists'});
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error });
  }
});

// POST endpoint to add a new event
app.post('/events', async (req, res) => {
  const { id,userid, name,description,location } = req.body;
  try {
      const newEvent = new event({ id,userid, name,description,location });
      await newEvent.save();
      res.status(201).json({ message: 'Event added successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Error adding event', error });
  }
});

// Route to get all records
app.get('/events', async (req, res) => {
  try {
    const {userid} = req.query;
    
    const records = await event.find({userid:userid}); // Fetch all records from the database
    res.status(200).json(records);       // Send the records as a JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors
  }
});


// Route to delete record
app.delete('/events/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const records = await event.deleteOne({id:id}); // Fetch all records from the database
    res.status(200).json(records);       // Send the records as a JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors
  }
});

// PUT endpoint to add a new event
app.put('/events/:id', async (req, res) => {
  const eventId = parseInt(req.params.id);
  //const { name, description,location, date} = req.body;
  const updateData = req.body;

  // Find the record by ID and update it
  const updatedRecord = await event.findByIdAndUpdate(eventId, updateData, {
    new: true,       // Return the updated document
    runValidators: true, // Run schema validators on the updated fields
  });
  if (!updatedRecord) {
    return res.status(404).send('Record not found');
  }
  res.status(200).json(updatedRecord); // Send the updated record back
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
