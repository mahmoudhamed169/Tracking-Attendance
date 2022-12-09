// const validtateReq = require('../../../common/validtateReq');
const isAuthenticated = require("../../../common/isAuthrized");
const { check_In, getAllattendance, check_Out } = require("../controller/attendanceController");



const router = require("express").Router();



router.post("/enter" , isAuthenticated() , check_In ) ;
router.post("/exite" , isAuthenticated() , check_Out ) ;
router.get('/attendances' , getAllattendance)




module.exports = router