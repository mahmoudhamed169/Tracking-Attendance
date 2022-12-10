const express = require('express');
const connection = require('./configration/configDb');
const userRouter = require('./modules/users/routes/userRoutes')
const attendanceRouter = require('./modules/attendances/routes/attendanceRoutes')
var cron = require('node-cron');






// cron.schedule(' * * * * *', () => {
//     console.log('running a task every minute');
//   });
//   cron.schedule("*/10 * * * * *", function() {
//     console.log("running a task every 10 second");
//   }); 



require('dotenv').config() ; 
const app = express() ; 

app.use(express.json());
app.use(userRouter) ;
app.use(attendanceRouter);


const port = process.env.PORT;



connection();
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));