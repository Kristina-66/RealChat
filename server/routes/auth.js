const {
  user,
  getAllUsers,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/user", user);
router.get("/allusers", getAllUsers);
router.get("/logout/:id", logOut);

module.exports = router;
