const express = require('express'),
    router = express.Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const userData = require('../database').userData;

let saltRounds = 3;

//get user id
function getUid() {
    let userId = '';
    uuidv4().split('-').forEach((seg) => {
        userId += seg;
    });
    return userId;
}

function getDate() {
    let d = new Date();
    let date = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
    return date;
}
router.post('/auth/signup', (req, res) => {
    let userObj = {};

    //check if the user email already exists
    userData.findOne({ email: req.body.email }, (err, result) => { 
        //if it already exists, do something
        if (result != null) {
            res.json({error: true,message: 'User already exists!'});
        } else {
            //hash the password
            bcrypt.hash(req.body.password, saltRounds)
            .then((err, hash) => {
                userObj = {
                uid: getUid(),
                username: {
                    firstName: req.body.username.firstName,
                    lastName: req.body.username.lastName || ''
                    },
                    email: req.body.email,
                    password: hash,
                    dateJoined: getDate()
                }
                let newData = new userData(userObj);
                    newData.save((err, results) => {
                        res.send({error: false, message: 'User created successfully!'});
                })
            });
        }
    })
});

module.exports = router;