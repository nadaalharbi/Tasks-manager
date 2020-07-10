const express = require('express');
const User = require('../models/user');
const router = new express.Router();


// *** USERS ***
// Create new User
router.post('/users', (req, res) => {
    const user = new User(req.body);
    console.log(user);

    user.save().then(() => {
        console.log(user);
        //send 201 code that's the request has been fulfilled!
        res.status(201).send(user);
    }).catch((error) => {
        console.log('Failed saving a user');
        res.statusCode(400).send(error);
    });
});

// Get All users WITH using Async & Await
router.get('/users', async (req, res) => {
    // one Async with single promise 
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        //500 code for internal server error
        res.status(500).send(error);
    }
});

// Accessing the route param, get user by id
router.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then((user) => {
        //if user not found stop, and send 404
        if (!user) {
            return res.statusCode(404).send();
        }
        //otherwise, send it
        res.send(user);

    }).catch((error) => {
        res.status(500).send(error);
    });
});

// UPDATE 
// update user by id using patch http method
router.patch('/users/:id', (req, res) => {

    // Prevent updating un-allowed/un-existed property
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    // Error handling 
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidator: true })
        .then((user) => {
            // if theres no user with that id
            if (!user) {
                return res.status(404).send();
            }
            // Otherwise, if found
            res.send(user);
        }).catch((error) => {
            //if error hrouterend or a validation issue hrouterened
            res.status(400).send(error);
        });
});

//DELETE
router.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send();
    });
});


//find user with id then updage its age
User.findByIdAndUpdate('5f0506b978fd010c513e3843', { age: 23 }).then((user) => {
    console.log(user);
    // Chained promise.. count the total User that has the same age
    return User.countDocuments({ age: 23 });
}).then((countUser) => {
    console.log(countUser);
}).catch((error) => {
    console.log(error)
});

//Using Asyn & Await 
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return user + ", " + count;
}
updateAgeAndCount('5f0506b978fd010c513e3843', 2).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

module.exports = router
