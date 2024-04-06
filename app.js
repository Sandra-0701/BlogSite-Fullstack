const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./db/mongoDb'); // Import MongoDB connection
const userRoutes = require('./Routes/users'); // Import user routes
const blogRoutes = require('./Routes/blogRoute');
const cors = require('cors');
const app = express();
const path = require('path');

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', userRoutes); // Use user routes
app.use('/api', blogRoutes);

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, '/build')));

// Serve the index.html file for any other routes
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

// Port configuration
const PORT = process.env.PORT || 3000; // Default port is 3000 if PORT is not specified in the environment variables

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
