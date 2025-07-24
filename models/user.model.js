const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

name: {type: String, required: true,trim:true },

email: {type: String, required: true,trim:true, unique: true},

password: {type: String, required: true,trim:true },

image: {type:String},
role: {type: String, default: 'client', enum: ['client', 'admin']},

createdAt: {type: Date, default: Date.now},

})
  module.exports= mongoose.model('User', userSchema);