//cvamos a requerir express
const express = require ('express')
const router = express.Router()

const userController = require("../controllers/user.controller") 
//dos puntos porque paso de estar 
// en user.routes a pasar a estar en routes luego a cero y entra a c
//controllers y luego a user.controller
//esto trae todo el archivo user.controller.js

//ruta para obtener usuarios
//GET/users
router.get("/users" , userController.getUsers )

//ruta para crear usuarios 
//Post/ users
router.post ("/users", userController.createUser)

//ruta para obtener un usuario por id
//GET/users/:id
router.get("/users/:id", userController.getUserById)


//ruta para borrar usuario por id
router.delete("/users/:id", userController.deleteUserById)

//ruta para actualizar usuario por id
router.put("/users/:id", userController.updateUserById)

router.post("/login", userController.loginUser)

module.exports =router;




