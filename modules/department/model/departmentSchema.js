const mongoose = require('mongoose');
const departmentSchema = require('../schema/departmentSchema');




const Department = mongoose.model("departments" , departmentSchema);

module.exports = Department ; 