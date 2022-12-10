const mongoose =  require('mongoose') ; 
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
    {
      fristName: { type: String  },
      lastName: { type: String },
      email: { type: String, required: true },
      password: { type: String },      
      department: { type: mongoose.Schema.Types.ObjectID, ref: "departments" },  
      department_name : { type: String },
      role: { type: String },
      verified: { type: Boolean, default: false },
    },
    {
      timestamps: true,
    }
  );
  userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 7);
    next();
  });


  module.exports = userSchema;