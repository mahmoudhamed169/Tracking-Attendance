const cron = require("node-cron");
const Attendance = require("../modules/attendances/model/attendanceModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
      user: "mahmoudnodejs@gmail.com",
      pass: "jpsqmnyhjucjdabv",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });


module.exports = async () => {
  const today = new Date();
  const attendances = await Attendance.find({ attendance: { $elemMatch: {} } });
  users = [];
  for (let i = 0; i < attendances.length; i++) {
    users.push(attendances[i].attendance[attendances[i].attendance.length - 1]);
  }
  var attendanceToday = await users.filter(
    (obj) =>
      obj.date.toISOString().split("T")[0] === today.toISOString().split("T")[0]
  );
  // console.log(attendanceToday)
  for (let i = 0; i < attendanceToday.length; i++) {
    let user = attendanceToday[i].userEmail;
    const token = jwt.sign({ user }, "shhhhh");
    let mailOptions = {
      from: '"Tracking Attendance " <mahmoudnodejs@gmail.com>', // sender address
      to: `${user}`, // list of receivers
      subject: "Verify Your Attendance", // Subject line
      text: "Simple Question", // plain text body
      html: `
                     <div class="myDiv">
                        <h2>Verify Your Attendance</h2>                    
                        <h3> How many legs does the cat have?</h3>
                        <a style="font-size: 18px;" href="https://app-atms.onrender.com/verifyAttendance/${token}">Four !</a>
                        <a style="font-size: 18px;" href="https://app-atms.onrender.com/unVerifyAttendance/${token}">Five !</a>                        
                      </div>
        
                  `, // html body
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message %s sent: %s", info.messageId, info.response);
      // res.status(StatusCodes.CREATED).json({ message: "check your email" });
    });
  }
};

// define cron job at 9:30 ?
