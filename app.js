const express = require('express')
//inicializamos express
const app = express()
const userRoutes = require('./routes/user.routes')

app.get("/", (req, res) => {
  res.send("Hello World esta andando!")
}   )

app.use(userRoutes)

module.exports= app