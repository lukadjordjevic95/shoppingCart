'use strict';
module.exports = function(app) {
  var shoppingCartController = require('../controllers/shoppingCartController');

  // shoppingCartController Routes
  app.route('/products')
    .get(shoppingCartController.list_all_products)
    .post(shoppingCartController.create_a_product);


  app.route('/products/:productId')
    .get(shoppingCartController.read_a_product)
    .put(shoppingCartController.update_a_product)
    .delete(shoppingCartController.delete_a_product);
};