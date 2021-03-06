const validate = require('validator');
const mongoose = require('mongoose');
const { default: validator } = require('validator');

// Crate a User model with four prop. name, email, password and age.
// Each model will have objects with a type-property pairs
const User = mongoose.model('User', {
    name: {
        type: String,
        default: 'Anonymous'
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid.');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password must not include password word.');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            //to prevent Negative numbers.
            if (value < 0) {
                throw new Error('Age must be a postive number');
            }
        }
    }
});

module.exports = User;



