const Department = require("../model/departmentModel");
const { StatusCodes } = require("http-status-codes");

const Department = require("../model/departmentModel");
const { StatusCodes } = require("http-status-codes");

const getAllDepartment = async (req, res) => {
  try {
    if (theUser.role == "admin") {
      const departments = await Department.find({}).populate("createdBy");
      res.json({ message: "All Department", data: departments });
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
  let { departmentName } = req.body;
  if (theUser.role == "admin") {
    try {
      const department = await Department.findOne({ departmentName });
      if (department) {
        res.status(StatusCodes.BAD_REQUEST).json({
          massege: "department is already existes",
        });
      } else {
        let newDepartment = new Department({ departmentName });
        await newDepartment.save();
        res.json({ massege: "Added success", Department: newDepartment });
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
      let { _id } = req.params;
      let { The_Head } = red.body;
      const department = await Department.updateOne({_id}, { The_Head });
      res.status(StatusCodes.OK).json({ message: "Update done" });
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
      let { _id } = req.params;
      
      const department = await Department.deleteOne({ _id: id })
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
