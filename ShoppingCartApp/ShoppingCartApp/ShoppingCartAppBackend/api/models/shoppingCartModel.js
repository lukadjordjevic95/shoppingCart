
'use strict';
const { v4: uuidv4 } = require('uuid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
Number.prototype.countDecimals = function () {
  if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
  return this.toString().split(".")[1].length || 0; 
}

var ProductSchema = new Schema({
  id: {
    type: String,
    default: uuidv4
  },
  name: {
    type: String,
    required: 'Enter the name of the Product',
    default: null
  },
  price: {
    type: Number,
    required: 'Enter the price of the Product',
    default: 0.00,
    validate: {
      validator: function (v) {
          return v.countDecimals() <= 2
      },
      message: 'Your number have more than 2 decimals'
  }
  },
  quantity: {
    type: Number,
    required: 'Enter the quantity of the Product',
    default: 1
  }
});

module.exports = mongoose.model('Products', ProductSchema);