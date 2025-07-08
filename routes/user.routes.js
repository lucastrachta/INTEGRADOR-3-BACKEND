//cvamos a requerir express
const express = require ('express')
const router = express.Router()

const userController = require("../controllers/user.controller") 
//dos puntos porque paso de estar 
// en user.routes a pasar a estar en routes luego a cero y entra a c
//controllers y luego a user.controller

//ruta para obtener usuarios
//GET/users
router.get("/users" , userController.getUsers )

//ruta para crear usuarios 
//Post/ users
router.post ("/users", userController.createUser)


module.exports =router;




//ESTE CODIGO DE ABAJO ES LO PRIMERO DEL COMIENZO DE 
//LA CLASE LO DE ARRIBA ES LO ULTIMO.. LO QUE VA
//ruta para obtener todos los usuarios
// router.get("/users" , (req, res) => {
//  res.send("Endpoint para obtener todos los usuarios")})
// console.log(router)

// router.post("/users" , (req,res) => { res.send("usuario CREADO con exito") })