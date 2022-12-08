const mongoose = require('mongoose');
const attendanceSchema = require('../schema/attendanceSchema');





const Attendance = mongoose.model("attendance" , attendanceSchema);

module.exports = Attendance ; 