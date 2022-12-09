const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectID, ref: "users" },
    attendance: [
      {
        date: { type: Date },
        userName: { type: String },
        entry: { type: Date },
        exit: { type: Date },
        requestToLeave :{type: Boolean}
      },
    ],
  },
  {
    usePushEach: true,
  }
);

module.exports = attendanceSchema;
