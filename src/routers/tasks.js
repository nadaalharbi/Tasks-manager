const express = require('express');
const Tasks = require('../models/tasks');
const router = new express.Router();


// *** TASKS ***
// Create new task
router.post('/tasks', (req, res) => {
    const task = new Tasks(req.body);

    task.save().then(() => {
        res.send(task);
    }).catch((error) => {
        res.statusCode(400).send(error);
    });
});

// Get all tasks 
router.get('/tasks', (req, res) => {
    Tasks.find({}).then((tasks) => {
        res.status(201).send(tasks);
    }).catch((error) => {
        res.status(500).send(error);
    });

});

// Get task by id 
router.get('/tasks/:id', (req,
    res) => {
    const _id = req.params.id;

    Tasks.findById(_id).then((task) => {
        if (!task) {
            return res.statusCode(404).send();
        }
        res.send(task);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

// UPDATE 
router.patch('/tasks/:id', (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Unknown Updates!' });
    }

    Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidator: true })
        .then((task) => {
            if (!task) {
                return res.status(404).send();
            }
            res.send(task);
        }).catch((error) => {
            res.status(500).send(error);
        })
});

//DELETE
router.delete('/tasks/:id', (req,res)=>{
    Tasks.findByIdAndDelete(req.params.id).then((task)=>{
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }).catch((error)=>{
        res.status(500).send();
    });
});



// Using Promise Chaining
Tasks.findByIdAndDelete('5f04e29f41f3250630499a05').then((taskDeleted) => {
    console.log(taskDeleted);
    return Tasks.countDocuments({ completed: false });
}).then((countUncompletedTasks) => {
    console.log('countUncompletedTasks: ' + countUncompletedTasks);
}).catch((error) => {
    console.log(error);
});

const deleteTaskAndCount = async (id) => {
    const deletedTask = await Tasks.findByIdAndDelete(id);
    const countUncompletedTask = await Tasks.countDocuments({ completed: false });
    return deletedTask + ',' + countUncompletedTask;
}

deleteTaskAndCount('5f04e29f41f3250630499a05').then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});


module.exports = router

