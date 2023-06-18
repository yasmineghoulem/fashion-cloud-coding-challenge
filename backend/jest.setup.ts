const mongoose = require('mongoose');

// Increase the timeout value for Mongoose operations
mongoose.set('maxTimeMS', 1000000); // Set the desired timeout value in milliseconds
