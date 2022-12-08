const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentName: { type: String },
    The_Head :{type :mongoose.Schema.Types.ObjectID , ref : "users"}    
  },
  {
    timestamps: true,
  }
);



module.exports = departmentSchema ; 