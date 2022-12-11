const Attendance = require("../model/attendanceModel");
const { StatusCodes } = require("http-status-codes");

const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");



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



const check_In = async (req, res) => {
  try {
    let yourDate = new Date();

    const today = yourDate.toISOString().split("T")[0];

    const data = {
      date: new Date(),
      entry: new Date(),
      userName: theUser.name,
      userEmail : theUser.email
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
        res.status(StatusCodes.OK).json({status:true , message: "success....You have been signed in for today" });
      } else {
        res.status(StatusCodes.ACCEPTED).json({ status:false ,
          message: "error....You have been signed in for today aleady",
        });
      }
    } else {
      let newAttendance = new Attendance({
        user: theUser._id,
        email : theUser.email,
        attendance: [data],
      });
      await newAttendance.save();
      // console.log(newAttendance)
      res.status(statusCodes.CREATED).json({status:true  , message: "success....You have been signed in for today" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
    
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
          res.status(StatusCodes.ACCEPTED).json({ status:false ,message : "You didn't check in  today"});
        }
        else{
          if (exit.getHours()>=14  || lastCheckIn.requestToLeave == true ){
            lastCheckIn.exit = exit ;
            res.status(StatusCodes.ACCEPTED).json({ status:true , message : "success','You have been successfully check out"});
          }
          else{
            res.status(StatusCodes.ACCEPTED).json({ status:false , message : "You can't leave now"});
          }

        }
      }
      else {
        res.status(StatusCodes.ACCEPTED).json({status:false , message : "error','You do not have an attendance entry "});
  
      }
      
    }
    else {
      res.status(StatusCodes.ACCEPTED).json({status:false , message : "invalied Attendance"});

    }
    
  } catch (error) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "error", error });
  
    
  }

}



const getAllattendance = async (req, res) => {
  try {
    const today = new Date();
    const attendances = await Attendance.find({ attendance : { $elemMatch: {  } } }) ;
    users = []
    for (let i = 0; i < attendances.length; i++) {
      users.push(attendances[i].attendance[attendances[i].attendance.length - 1])
    }
    var attendanceToday =  await users.filter(obj => obj.date.toISOString().split("T")[0] === today.toISOString().split("T")[0] );
    res.status(StatusCodes.ACCEPTED).json({status:true , attendanceToday})
    
  } catch (error) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "error", error });
    
  }
 
  
  
};



const verifyAttendance = async  (req, res) => {
  try {
    const time = new Date();
    const decoded = jwt.verify(req.params.token, "shhhhh");
    const user = await Attendance.findOne({ email: decoded.email });
    if (time.getHours() <= 11) {
      res.status(StatusCode.OK).send(" correct answer .....  Your attendance has been verified successfully") ;
      }
      else {
        await user.attendance.pop() ;
        res.status(StatusCode.ACCEPTED).send( "Your attendance has not been verified today") ;
      }

    
  } catch (error) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "error", error });
    
  }
}


const unVerifyAttendance = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, "shhhhh");
    const user = await Attendance.findOne({ email: decoded.email });
    await user.attendance.pop() ;
    res.status(StatusCode.ACCEPTED).send( "wrong answer .....Your attendance has not been verified today") ;
    
  } catch (error){
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "error", error });
    
  }
}





const requestToLeave = async (req, res)=>{
  try {
    let {name , email  , reason } = req.body;
    const userAttendance = await Attendance.findOne({ user: theUser._id });
    const token = jwt.sign({ email }, "shhhhh");
    let yourDate = new Date();
    const today = yourDate.toISOString().split("T")[0];
    const lastCheckIn = userAttendance.attendance[userAttendance.attendance.length - 1];
    const lastCheckInTimestamp = lastCheckIn.date.toISOString().split("T")[0];
    if (today == lastCheckInTimestamp){
      let mailOptions = {
        from: '"Tracking Attendance " <mahmoudnodejs@gmail.com>', // sender address
        to: `mh4190207@gmail.com`, // list of receivers
        subject: "Hello Mahmoud Hamed ✔", // Subject line
        text: "Leave request", // plain text body
        html: `
                       <div class="myDiv">
                          <h2>Leave request</h2>                    
                          <h3> ${name} wants to leave work now for this reason ${reason} <br> his email is : ${email}</h3>
                          <a style="font-size: 18px;" href="https://app-atms.onrender.com/approveRequest/${token}">Approve !</a>
                          <a style="font-size: 18px;" href="https://app-atms.onrender.com/rejectRequest/${token}">Reject!</a>                        
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
      res.status(StatusCodes.OK).json({status : true , message :"Your request is being reviewed now..... track your email"})
    


    }
    else {
      res.status(StatusCodes.ACCEPTED).json({status:false,message:"You didn't come today.....or maybe you didn't confirm your attendance"})
    }
    
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
      console.log(error)
    
  }
}




const approveRequest = async  (req, res) => {
  try {
    
    const decoded = jwt.verify(req.params.token, "shhhhh");
    console.log(decoded.email)
    const user = await Attendance.findOne({ email: decoded.email });
    console.log(user) 
    const lastCheckIn = user.attendance[user.attendance.length - 1];
    lastCheckIn.requestToLeave = true ;
    let mailOptions = {
      from: '"Tracking Attendance " <mahmoudnodejs@gmail.com>', // sender address
      to: `${decoded.email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Leave request", // plain text body 
      html: `
                     <div class="myDiv">
                        <h2>Leave request</h2>                    
                        <h3>Your request to leave has been approved.....you can check out now</h3>                                              
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
    res.status(StatusCodes.OK).send("The request has been approved successfully");


    
  } catch (error) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "error", error });
    console.log(error)
    
  }
}


const rejectRequest = async  (req, res) => {
  try {
    
    const decoded = jwt.verify(req.params.token, "shhhhh");
    let mailOptions = {
      from: '"Tracking Attendance " <mahmoudnodejs@gmail.com>', // sender address
      to: `${decoded.email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Leave request", // plain text body
      html: `
                     <div class="myDiv">
                        <h2>Leave request</h2>                    
                        <h3> sorry ....Your request to leave has been Recjected.....Continue your work until the end of the day</h3>                                              
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
    res.status(StatusCodes.OK).send("The request has been rejected successfully");


    
  } catch (error) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "error", error });
    
  }
}




























module.exports = {
  check_In,
  getAllattendance,
  check_Out,
  verifyAttendance,
  unVerifyAttendance,
  approveRequest,
  rejectRequest,
  requestToLeave,
};
