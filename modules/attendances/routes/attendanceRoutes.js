// const validtateReq = require('../../../common/validtateReq');
const isAuthenticated = require("../../../common/isAuthrized");
const { check_In, getAllattendance } = require("../controller/attendanceController");



const router = require("express").Router();



router.post("/enter" , isAuthenticated() , check_In )
router.get('/attendances' , getAllattendance)




module.exports = router