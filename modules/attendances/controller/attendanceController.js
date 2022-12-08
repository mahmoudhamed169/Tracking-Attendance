const Attendance = require("../model/attendanceModel");
const { StatusCodes } = require("http-status-codes");
const { date } = require("joi");

const check_In = async (req, res) => {
  try {
    let yourDate = new Date();

    const today = yourDate.toISOString().split("T")[0];

    const data = {
      date: new Date(),
      entry: new Date(),
    };
    console.log(theUser);
    const userAttendance = await Attendance.findOne({ user: theUser._id });

    if (userAttendance) {
      const lastCheckIn =
        userAttendance.attendance[userAttendance.attendance.length - 1];
      const lastCheckInTimestamp = lastCheckIn.date.toISOString().split("T")[0];

      //   console.log(lastCheckIn.entry.getHours())
      if (today > lastCheckInTimestamp) {
        userAttendance.attendance.push(data);
        await userAttendance.save();
        res.json({ message: "success....You have been signed in for today" });
      } else {
        res.json({
          message: "error....You have been signed in for today aleady",
        });
      }
    } else {
      let newAttendance = new Attendance({
        user: theUser._id,
        attendance: [data],
      });
      await newAttendance.save();
      // console.log(newAttendance)
      res.json({ message: "success....You have been signed in for today" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
    console.log(error);
  }
};





const getAllattendance = async (req , res ) => {
    const date = new Date()
    const attendances = await Attendance.find({}).select({attendance: {$elemMatch: {data : date}}});
    console.log(attendances)

    

}












module.exports = {
  check_In,
  getAllattendance
};
