//es mas resumido el codigo
function getUsers(req,res){
return res.send("function to receive all users")}

function createUser(req,res){
return res.send("function to create a user")}
//se crea un objeto en el module.exports
module.exports = {getUsers, createUser}