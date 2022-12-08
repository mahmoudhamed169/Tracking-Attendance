const validateRequest = require("../../../common/validtateReq");
const { getAllUsers, verifyUser, UnverifyUser, sign_up, sign_in } = require("../controller/userController");
const router = require("express").Router();



router.get('/users' , getAllUsers) ;

router.post("/signUp" ,sign_up)
router.get("/verifyUser/:token", verifyUser);

router.get("/unverifyUser/:token", UnverifyUser);
router.post('/signIn' , sign_in)








module.exports = router;