const mongoose = require('mongoose');
const express = require('express');
const app = express();
const User = require('./model/User');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Enabling The Promise on Mongoose
mongoose.Promise = global.Promise;

// Starting Our Database server in local
mongoose.connect('mongodb://localhost:27017/mongoose');
const db = mongoose.connection;

// Connecting To our Database Server
db.once('open', () => console.log('Connected'));
db.on('error', (err) => {
    console.log(/Couldn't Connect/, err);
});
// ============== EXPRESS API =================

// Creating User Data to Our Database
app.post('/users',(req, res) => {
        // Inserting DATA To Database
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isActive: req.body.isActive
    });

    newUser.save().then(savedUser => {
        res.send('Saved from POSTMAN BRO');
        console.log(savedUser);
    }).catch(err=>{
        res.status(404).send(`USER NOT SAVED Because ${err}`);
    });
});

// Reading all User Data from our Database
app.get('/users', (req, res) => {
    User.find({}).then(users=> {
        res.send(users);
    }).catch(err=> {
        res.status(404).send(/Can't Show The USERS data/);
    });
});

// Patching/Updating just one row/document user by its id from database
app.patch('/users/:id', (req , res)=> {
    const id = req.params.id;
    const firstName = req.body.firstName;

    User.findByIdAndUpdate(id, {$set: {firstName: firstName}}, {new: true})
        .then(savedUser=> {
            res.status(200).send('User Have been Updated');
        }).catch(err=>{
            res.status(404).send(`User Cannot be saved ${err}`);
        });
});

// Put/Updating All document user by its id from Database
app.put('/users/:id', (req, res)=> {
    User.findOne({_id: req.params.id}).then(user=>{
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.isActive = req.body.isActive;
        user.save().then(savedUser=>{
            res.send(`User have Been Updated:\n`+ savedUser);
        }).catch(err=>{
            res.send(err);
        });
    });
});

// Deleting A user bt its id
app.delete('/users/:id', (req, res) => {
    User.findOneAndDelete({_id: req.params.id}).then(user=>{
        res.send(`The User ${user.firstName} has been Deleted`);
    }).catch(err=> {
        res.send('Couldnt find user id' + err);
    });
});


// We're Connecting to This url
app.listen(port, ()=> {
    console.log(`listening on ${port}`);
});