const User = require("../models/userModel"); // Importa el modelo de Usuario de MongoDB
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/jwt");

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const cypherPassword = await bcrypt.hash(password, 10);
    const newUser = { ...req.body, password: cypherPassword };

    // Crea un nuevo usuario
    const user = new User(newUser);
    await user.save();

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error("Error al crear un usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para iniciar sesión de usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Verifica la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Genera un token JWT y envíalo en la respuesta
    const token = generateToken(user);
    res.status(200).json({ message: "Inicio de sesión exitoso", token});
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id || req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
