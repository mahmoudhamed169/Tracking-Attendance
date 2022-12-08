const express = require('express');
const connection = require('./configration/configDb');
const userRouter = require('./modules/users/routes/userRoutes')
const attendanceRouter = require('./modules/attendances/routes/attendanceRoutes')



require('dotenv').config() ; 
const app = express() ; 

app.use(express.json());
app.use(userRouter) ;
app.use(attendanceRouter);


const port = process.env.PORT;



connection();
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));