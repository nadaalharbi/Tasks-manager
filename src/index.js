require('./database/mongoose');
const express = require('express');
const userRouter = require('./routers/user');
const tasksRouter = require('./routers/tasks');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(tasksRouter);


app.listen(port, () => {
    console.log(`Server is up on localhost:${port}`);
});