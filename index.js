//para empezar dotenv
require('dotenv').config() 

//mongoose para conectar a mongodb
const mongoose = require('mongoose')
//express para crear el servidor
const express = require('express')
//inicializamos express
const app = express()
const port = 3000

app.get("/", (req, res) => {
 return res.send("Hello World esta andando!")
}   )



app.get("/products" , (req,res) => {
  const products = [
    { id: 1, name: "Producto 1", price: 100 },
    { id: 2, name: "Producto 2", price: 200 },
    { id: 3, name: "Producto 3", price: 300 }
  ] 
  return res.send(products)
})

app.post("/products", (req, res) => {
return res.send("Producto creado") })   






console.log("otro mensaje ahora con !!!!$$$!!!lucas")

//con instalar la libreria "no demon" asi install i -D nodemon es lo mismo que poner --watch en donde dice "dev" 
//"scripts": {
    // "start": "node index.js",
    // "dev": "node --watch index.js",
    //luego hacemos npm run dev y es con --watch o con instalar nodemon
//ahora con nodemon es lo mismo que poner --watch en donde dice "dev" 

//no olvidarnos del return en el get o post

mongoose.connect(process.env.MONGO_URI)
.then(() =>  {
//si la conexion es exitosa se ejecuta este bloque
console.log("Conectado a MongoDB conexion exsitosa")
 app.listen(port, () => {
  console.log(`el servidor esta corriendo en el servidor http://localhost:${port}`)
} ) 
}  )
.catch(error  => {
  console.error("Error al conectar a MongoDB:", error)
})