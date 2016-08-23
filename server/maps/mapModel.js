var Q = require('q');
var mongoose = require('mongoose');

var MapSchema = new mongoose.Schema({
  // userId: {
  //   type: String,
  //   required: true,
    
  // },
  searchKeyword: {
    type: String,
    required: true,
    
  }
});

module.exports = mongoose.model('maps', MapSchema);
