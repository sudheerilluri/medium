const mongoose = require('mongoose');

// MongoDB URL
const mongoURL = 'mongodb://localhost:27017/events'; // 'events' is the database name

// Connect to MongoDB
mongoose.connect(mongoURL, {}).then(() => {
    console.log('Connected to MongoDB');
    checkAndCreateCollections();
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Define Schemas
const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    location: String,
    description: String
});

const sessionSchema = new mongoose.Schema({
    logintime: Date,
    logouttime: Date,
    ipaddress: String
});

const userSchema = new mongoose.Schema({
    userid: Number,
    emailaddress: String
});

// Define Models
const Event = mongoose.model('events', eventSchema);
const Session = mongoose.model('sessions', sessionSchema);
const Users = mongoose.model('users', userSchema);

// Function to check and create collections if they don't exist
async function checkAndCreateCollections() {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (!collectionNames.includes('events')) {
        await Event.createCollection();
        console.log('Created "events" collection');
    }

    if (!collectionNames.includes('sessions')) {
        await Session.createCollection();
        console.log('Created "sessions" collection');
    }

    if (!collectionNames.includes('users')) {
        await Users.createCollection();
        console.log('Created "users" collection');
    }

    console.log('Database setup completed');
    mongoose.connection.close(); // Close connection when done
}
