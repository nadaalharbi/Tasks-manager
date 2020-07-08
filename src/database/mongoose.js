//const validate = require('validator');
//const { default: validator } = require('validator');
const mongoose = require('mongoose');
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';
mongoose.connect(connectionURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});

// //Create a mongoose model in real-life such as user, task ..etc
// // each model will objects(name) with a type-property pairs
// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         default: 'Anonymous'
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is not valid.');
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if (value.includes('password')) {
//                 throw new Error('Password must not include password word.');
//             }
//         }
//     },
//     age: {
//         type: Number,
//         validate(value) {
//             //to prevent Negative numbers.
//             if (value < 0) {
//                 throw new Error('Age must be a postive number');
//             }
//         }
//     }
// });


// const Tasks = mongoose.model('Tasks', {
//     description: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }

// });

//-------------------------------------


// const me = new User({
//     email: ' nadA@gmail.COM    ',
//     password: '     34aa999',
//     age: 22// or '23' it will be casted to Number
// });
// // Save it to MongoDB
// me.save().then(() => {
//     console.log(`saved Successfuly! ${me}`);
//     //using promise
// }).catch((error) => {
//     console.log(`An error occured while saving! ${error}`);
// });

// const morningTask = new Tasks({
//     description: 'Read the documentaion of mongoose.',
//     completed: true
// });
// morningTask.save().then(() => {
//     console.log(`saved Successfuly! ${morningTask}`);
// }).catch((error) => {
//     console.log(`An error occured while saving! ${error}`)

// });