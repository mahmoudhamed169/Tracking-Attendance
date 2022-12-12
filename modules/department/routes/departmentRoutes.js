

const { getAllDepartment, addNewDepartment, updateDepartment, deleteDepartment } = require('../controller/departmentController');
const isAuthrized = require('../../../common/isAuthrized');



const router = require("express").Router();


router.get("/departmnets" , isAuthrized() , getAllDepartment)
router.post('/addNewDepartment' ,isAuthrized(), addNewDepartment);
router.put('/updateDepartment' ,isAuthrized(), updateDepartment);
router.delete('/deleteDepartment' , isAuthrized(),deleteDepartment)




module.exports = router