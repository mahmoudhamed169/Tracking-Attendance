const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectID, ref: "users" },
    email : {type: String},
    attendance: [
      {
        date: { type: Date },
        userName: { type: String },
        userEmail : {type: String},        
        entry: { type: Date },
        exit: { type: Date },
        requestToLeave :{type: Boolean , default: false}
      },
    ],
  },
  {
    usePushEach: true,
  }
);

module.exports = attendanceSchema;
