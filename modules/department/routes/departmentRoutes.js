const validtateReq = require('../../../common/validtateReq');
const isAuthenticated = require("../../../common/isAuthrized");
const { getAllDepartment, addNewDepartment, updateDepartment, deleteDepartment } = require('../controller/departmentController');



const router = require("express").Router();


router.get("/Departments" , isAuthenticated(),getAllDepartment);
router.post('/addNewDepartment' ,isAuthenticated(), addNewDepartment);
router.put('/updateDepartment' ,isAuthenticated(), updateDepartment);
router.delete('/deleteDepartment' , isAuthenticated(),deleteDepartment)




module.exports = router