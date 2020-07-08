const mongoose = require('mongoose');

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