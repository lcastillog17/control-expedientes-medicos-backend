const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersControllers");
const { protectRoute } = require('../config/jwt');

// Ruta para registrar un nuevo usuario
router.post("/register", usersController.createUser);

// Ruta para iniciar sesión
router.post("/login", usersController.loginUser);

router.use(protectRoute);

// Ruta para obtener un usuario por su ID
router.get("/:id?", usersController.getUserById);

module.exports = router;
