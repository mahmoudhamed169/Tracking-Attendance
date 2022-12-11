// const validtateReq = require('../../../common/validtateReq');
const isAuthenticated = require("../../../common/isAuthrized");
const { check_In, getAllattendance, check_Out, verifyAttendance, unVerifyAttendance, approveRequest, rejectRequest } = require("../controller/attendanceController");



const router = require("express").Router();



router.post("/enter" , isAuthenticated() , check_In ) ;
router.post("/exite" , isAuthenticated() , check_Out ) ;
router.get('/attendances' , getAllattendance);
router.get('/verifyAttendance/:token' , verifyAttendance);
router.get('/unVerifyAttendance/:token' , unVerifyAttendance);
router.get('/approveRequest/:token' ,approveRequest );
router.get('/rejectRequest/:token' , rejectRequest);






module.exports = router