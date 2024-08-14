const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const user = req.body; 
    const account = await User.findOne().where('username').equals(user.username)
    if(account){
        res.status(101).send("Username already exist");
        return ;
    }
    if (!user.password || !user.username) {
        res.status(404).send("Username and password are required"); 
        return;     
    }
    if (user.password.length < 4) {
        res.status(404).send("Password length must be >= 4");
        return; 
    }

    const newUser = new User(user);
    const saltRounds = 10;

    const hashedPwd = await bcrypt.hash(newUser.password, saltRounds);
    newUser.password = hashedPwd; 

    try {
        await newUser.save();
        res.send("Registration successful"); 
    } catch(err) {
        res.status(404).send("Couldn't register account");
    }
});

router.post('/login', async (req, res) => {
    const loginData = req.body; 
    const account = await User.findOne().where('username').equals(loginData.username)

    if (!account) {
        res.status(404).send("No such account"); 
        return;
    }
    const match = await bcrypt.compare(loginData.password, account.password)
    if (!match) {
        res.status(404).send("Incorrect password"); 
        return; 
    }
    req.session.user = {
        isLoggedIn: true,
        username: account.username,
        type: account.type,
    };
    
    console.log('Cookie set:', req.session.user);
    res.send({
        msg: "Login succesful",
        type :account.type,
    })
});


module.exports = router;
