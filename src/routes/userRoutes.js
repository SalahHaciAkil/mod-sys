const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// GET /api/users
router.get("/", userController.getAllUsers);

// GET /api/users/:userId
router.get("/:userId", userController.getUserById);

// POST /api/users
router.post("/", userController.createUser);

router.put("/:userId/portfolio", userController.updatePortfolio);

module.exports = router;
