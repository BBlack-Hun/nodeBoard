const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {
    tyep: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  gender: String,
  status: String,
});

const Userdb = mongoose.model('userdb', schema);

module.experts = Userdb;
