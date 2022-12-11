const Department = require("../model/departmentModel");
const { StatusCodes } = require("http-status-codes");

const Department = require("../model/departmentModel");
const { StatusCodes } = require("http-status-codes");
const User = require("../../users/model/userModel");

const getAllDepartment = async (req, res) => {
  try {
    if (theUser.role == "admin") {
      const departments = await Department.findALL({}).populate("The_Head");
      res.status(StatusCodes.ACCEPTED).json({ status:true ,message: "All Department", data: departments });
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
    console.log(error);
  }
};

const addNewDepartment = async (req, res) => {
  let { departmentName  , email } = req.body;
  if (theUser.role == "admin") {
    try {
      const user = await User.findOne({email})
      const department = await Department.findOne({ departmentName : departmentName.toLowerCase() });
      if (department ) {
        res.status(StatusCodes.ACCEPTED).json({status :false,
          message: "department is already existes",
        });
      } else {
        if(!user){res.status(StatusCodes.CREATED).json({ status :false ,message: "invalid email" });}
        let newDepartment = new Department({ departmentName : departmentName.toLowerCase() , The_Head : user._id });
        await newDepartment.save();
        res.status(StatusCodes.CREATED).json({status :false , message: "Added success", Department: newDepartment });
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "error", error });
      console.log(error);
    }
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    if (theUser.role == "admin") {
      
      let { departmentName ,email } = red.body;
      const user = await User.findOne({email})
      if(!user){res.status(StatusCodes.CREATED).json({ status :false ,message: "invalid email" });}
      const department = await Department.findOneAndUpdate({departmentName : departmentName.toLowerCase} , {The_Head:user._id})
      

      
      
      res.status(StatusCodes.OK).json({status:true, message: "Update done" , department });
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
    console.log(error);
  }
};



const deleteDepartment = async (req, res) => {
  try {
    if (theUser.role == "admin") {
      let { departmentName } = req.body;
      
      const department = await Department.findByIdAndDelete({departmentName :departmentName.toLowerCase()})
      res.status(StatusCodes.OK).json({ message: "deleted success" });
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
    console.log(error);
  }
};

module.exports = {
  getAllDepartment,
  addNewDepartment,
  updateDepartment,
  deleteDepartment,  
};
