const mongoose = require('mongoose');

//Create Tasks model that has two properties description, and a boolean variable completed
const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        requierd: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
        trim: true
    }
});

module.exports = Tasks;