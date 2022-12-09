const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const getAllUsers = async (req, res) => {  
  const users = await User.find({}).populate("department").select("-password");
  res.json({ message: "allUsers", users });
};

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

const verifyUser = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, "shhhhh");
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      res.status(StatusCodes.RESET_CONTENT).json({ message: "invalid email" });
    } else {
      await User.updateOne({ email: decoded.email }, { verified: true });

      // setup email data with unicode symbols
      let mailOptionsTwo = {
        from: '"Tracking Attendance " <mahmoudnodejs@gmail.com>', // sender address
        to: `${decoded.email}`, // list of receivers
        subject: `Hello ${user.fristName}  ${user.lastName} ✔`, // Subject line
        text: "Hello world ?", // plain text body
        html: `
                 <div class="myDiv">
                    <h2> Aprrovment ✔</h2>
                    <h5>Your data is reviewed ...... You can login now</h5>
                  </div>
  
              `, // html body
      };

      // send mail with defined transport object
      await transporter.sendMail(mailOptionsTwo, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
      });

      res
        .status(StatusCodes.CREATED)
        .send("The account has been successfully verified");
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
    console.log(error);
  }
};

const UnverifyUser = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, "shhhhh");
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      res.status(StatusCodes.RESET_CONTENT).json({ message: "invalid email" });
    } else {
      await User.deleteOne({ email: decoded.email });

      // setup email data with unicode symbols
      let mailOptionsTwo = {
        from: '"Tracking Attendance " <mahmoudnodejs@gmail.com>', // sender address
        to: `${decoded.email}`, // list of receivers
        subject: `Hello ${user.fristName}  ${user.lastName} ✔`, // Subject line
        text: "Hello world ?", // plain text body
        html: `
                 <div class="myDiv">
                    <h2> Rejection  </h2>
                    
                  </div>
  
              `, // html body
      };

      // send mail with defined transport object
      await transporter.sendMail(mailOptionsTwo, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
      });

      res
        .status(StatusCodes.CREATED)
        .send("The account has been successfully rejected");
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
    console.log(error);
  }
};

const sign_up = async (req, res) => {
  let { fristName, lastName, email, password, role } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(StatusCodes.RESET_CONTENT).json({
        message: "email is already existes",
      });
    } else {
      let newUser = new User({
        fristName,
        lastName,
        email,
        password,
        role,
      });
      await newUser.save();
      const token = jwt.sign({ email }, "shhhhh");

      // setup email data with unicode symbols
      let mailOptions = {
        from: '"Tracking Attendance " <mahmoudnodejs@gmail.com>', // sender address
        to: "mh4190207@gmail.com", // list of receivers
        subject: "Hello Mahmoud Hamed ✔", // Subject line
        text: "Hello world ?", // plain text body
        html: `
                 <div class="myDiv">
                    <h2>New Rigitration</h2>                    
                    <h3>${fristName} ${lastName} with this email ${email} is tring to make Registraton</h3>
                    <a href="https://app-atms.onrender.com/verifyUser/${token}">Approve!</a>
                    <a href="https://app-atms.onrender.com/unverifyUser/${token}">Reject!</a>
                    
                  </div>
  
              `, // html body
      };

      let mailOptionsTwo = {
        from: '"Tracking Attendance " <mahmoudnodejs@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: `Hello ${fristName}  ${lastName} ✔`, // Subject line
        text: "Hello world ?", // plain text body
        html: `
                 <div class="myDiv">
                    <h2>Waiting for Aprrovment</h2>
                    <h5>Your data will be reviewed ...... You will be answered with approval or rejection</h5>
                  </div>
  
              `, // html body
      };

      // send mail with defined transport object
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
        // res.status(StatusCodes.CREATED).json({ message: "check your email" });
      });
      await transporter.sendMail(mailOptionsTwo, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
        // res.status(StatusCodes.CREATED).json({ message: "check your email" });
      });
      res.status(StatusCodes.CREATED).json({ message: "check your email" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
    console.log(error);
  }
};

const sign_in = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(StatusCodes.RESET_CONTENT).json({ message: "Invalid Email" });
    } else {
      if (!user.verified) {
        res.status(StatusCodes.RESET_CONTENT).json({ message: "Sorry..... your account has not been activated" });
      } else {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          var token = jwt.sign(
            {
              _id: user._id,
              role: user.role,
              name: user.fristName + " " + user.lastName,              
              department: user.department,

            },
            "shhhhh"
          );
          res.status(StatusCodes.OK).json({
            token,
            user: {
              name: user.fristName + " " + user.lastName,
              email: user.email,              
              department: user.department,
            },
          });
        } else {
          res.status(StatusCodes.RESET_CONTENT).json({ message: "password is not corrected" });
        }
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ massage: "error", error });
  }
};

module.exports = {
  getAllUsers,
  sign_up,
  verifyUser,
  UnverifyUser,
  sign_in,
};
