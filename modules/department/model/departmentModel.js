const mongoose = require('mongoose');
const departmentSchema = require('../schema/depaertmentSchema');




const Department = mongoose.model("departments" , departmentSchema);

module.exports = Department ; 