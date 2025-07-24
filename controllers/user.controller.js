
const User= require ('../models/user.model')
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET // Importa jsonwebtoken para manejar tokens
//se importa el modelo de usuario
const bcrypt = require('bcryptjs'); 
//es mas resumido el codigo
async function getUsers(req,res){

    try {
      const users = await User.find()
      
       return res.status(200).send({
        "message": "Usuarios obtenidos correctamente"
        , users
 })
} catch (error) {
        console.log(error)
return res.status(500).send({
message:"Error al obtener los usuarios"

})}
}

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Buscar usuario por ID en la base de datos
    const user = await User.findById(userId);

    // Si no se encuentra, devolver 404
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Si se encuentra, devolver los datos
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
 // Asegurate de tener esto arriba del archivo



 async function createUser(req, res) {
  console.log(req.body);

  // Desestructuramos los datos que vienen del cliente
  const { name, email, password,role, image } = req.body;

  // Validación 
  if (!name || !email || !password) {
    return res.status(400).send({ message: "Faltan campos obligatorios" });
  }

  // Hasheamos la contraseña antes de guardar
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    image,role
    });

  console.log(user);

  user.save()
    .then(userSaved => {
      userSaved.password = undefined; // No envio contraseña al frontend
      return res.status(201).send(userSaved);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Error: el usuario no se ha podido crear");
    });
}




//se crea una funcion para eliminar un usuario por su id
//se usa el metodo findByIdAndDelete de mongoose para eliminar un usuario por su id
    async function deleteUserById(req, res) {
        try {
            const id = req.params.id; // Extrae el id de los parámetros de la solicitud
            const userDeleted = await User.findByIdAndDelete(id);
            
            // console.log("user deleted" , userDeleted)
            
            if(!userDeleted) { 
              res.status(404).send({message: "usuario no encontrado,  ya ha sido borrado al parecer"})
            }
            //si el usuario todavia estaba lo borra status200 y si ya lo borro no borra nada y no hay userDeleted
            //y da el status (404) usuario no encontrado si habia algo lo borra si no hay nada xq borro avisa que ya se borro xq no hay nada
      return res.status(200).send({ message: "Usuario eliminado correctamente", userDeleted });
        } 
        catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Error al eliminar el usuario" });
        }
    }   
      
    async function updateUserById(req, res) {
    try {
        const id = req.params.id;
        const userData = req.body;

        // Actualiza el usuario por ID, y devuelve el nuevo con { new: true }
        const userUpdated = await User.findByIdAndUpdate(id, userData, { new: true });

        if (!userUpdated) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        return res.status(200).send({
            message: "Usuario actualizado correctamente",
            user: userUpdated
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error al actualizar el usuario" });
    }
}


// Asegúrate de instalar bcryptjs si no lo has hecho






async function loginUser(req, res) {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Email y contraseña son requeridos" });
    }

    email = email.toLowerCase().trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({ message: "Contraseña incorrecta" });
    }
 // No enviar contraseña al frontend
    user.password = undefined;


// generar un token de acceso (JWT) para el usuario autentiacado"
const token = jwt.sign(user.toJSON(), secret, {expiresIn : "1h"})

console.log("token generado,", token)




    return res.status(200).send({ message: "Inicio de sesión exitoso",
      user,token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error al iniciar sesión" });
  }
}

module.exports = {getUsers, createUser, getUserById, deleteUserById,updateUserById,loginUser}





