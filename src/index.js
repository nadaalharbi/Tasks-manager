require('./database/mongoose');
const express = require('express');
//const User = require('../models/user');
//const Tasks = require('../models/tasks');
const userRouter = require('./routers/user');
const tasksRouter = require('./routers/tasks');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(tasksRouter);


app.listen(port, () => {
    console.log(`Server is up on localhost:${port}`);
});