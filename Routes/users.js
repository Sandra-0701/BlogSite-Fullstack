const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
  try {
    const { email, number, address, username, password } = req.body;
    const newUser = new user({ email, number, address, username, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body; // Destructure username

    const user = await User.findOne({ username: username });
    if (!user) {
      res.json({ message: "User not found" });
      return;
    }

    if (user.password === password) {
      let payload={usrename:username,password:password}
      let token = jwt.sign(payload,'sandra')
      res.send({message:"login successfull",token:token})
      
    } else {
      res.json({ message: "Login Failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;
