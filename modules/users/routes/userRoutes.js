const isAuthrized = require("../../../common/isAuthrized");
const validateRequest = require("../../../common/validtateReq");
const { getAllUsers, verifyUser, UnverifyUser, sign_up, sign_in, setUserRole, setUserDepartment, getAllEmplyee, getAllHead } = require("../controller/userController");
const router = require("express").Router();



router.get('/users' , getAllUsers) ;

router.post("/signUp" ,sign_up)
router.get("/verifyUser/:token", verifyUser);

router.get("/unverifyUser/:token", UnverifyUser);
router.post('/signIn' , sign_in)
router.post('/serRole' , isAuthrized() , setUserRole )
router.post('/setDepartment' , isAuthrized() , setUserDepartment )
router.get('/employee' , isAuthrized() , getAllEmplyee );
router.get('/heads' , isAuthrized() , getAllHead)








module.exports = router;