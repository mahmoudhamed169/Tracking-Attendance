const Attendance = require("../model/attendanceModel");
const { StatusCodes } = require("http-status-codes");



const check_In = async (req, res) => {
  try {
    let yourDate = new Date();

    const today = yourDate.toISOString().split("T")[0];

    const data = {
      date: new Date(),
      entry: new Date(),
      userName: theUser.name,
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
        res.status(statusCodes.OK).json({ message: "success....You have been signed in for today" });
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
      res.status(statusCodes.CREATED).json({ message: "success....You have been signed in for today" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
    console.log(error);
  }
};



const check_Out =  async(req, res) =>{
  try {
     
    const userAttendance = await Attendance.findOne({user : theUser._id}) ; 
    let yourDate = new Date();
    let exit = new Date();
    const today = yourDate.toISOString().split("T")[0];
  
    if(userAttendance) {
      if (userAttendance.attendance && userAttendance.attendance.length >0) {
        const lastCheckIn = userAttendance.attendance[userAttendance.attendance.length - 1];
        const lastCheckInTimestamp = lastCheckIn.date.toISOString().split("T")[0];
        if (today != lastCheckInTimestamp) {
          res.status(StatusCodes.ACCEPTED).json({message : "You didn't check in  today"});
        }
        else{
          if (exit.getHours()>=14  || lastCheckIn.requestToLeave == true ){
            lastCheckIn.exit = exit ;
            res.status(StatusCodes.ACCEPTED).json({message : "success','You have been successfully check out"});
          }
          else{
            res.status(StatusCodes.ACCEPTED).json({message : "You can't leave now"});
          }

        }
      }
      else {
        res.status(StatusCodes.ACCEPTED).json({message : "error','You do not have an attendance entry "});
  
      }
      
    }
    else {
      res.status(StatusCodes.ACCEPTED).json({message : "invalied Attendance"});

    }
    
  } catch (error) {
    
  }

}



const getAllattendance = async (req, res) => {
  const date = new Date();
  const attendances = await Attendance.find({}).select({
    attendance: { $elemMatch: { data: date } },
  });
  console.log(attendances);
};

module.exports = {
  check_In,
  getAllattendance,
  check_Out,
};
