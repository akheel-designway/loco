const Sequelize = require('sequelize');
var MODELS = require('../models/models');

const {
  fn,
  col,
  Op
} = Sequelize;


let {
  Products,
  User,
  Contact
} = MODELS;


module.exports = {
  createProduct: async function (body) {
    return Products.create(body);
  },
  getAllProducts: async function (body) {
    return Products.findAll();
  },
  createCart: async function (body) {
    // Item not found, create a new one
    try {
      const item = await ShoppingCart.create({ 'meta': body.meta })
      return {
        id: item.id,
        created: true
      };

    } catch (error) {
      throw error
    }
  },
  updateCart: async function (body) {
    var where = {
      id: body.id
    }
    try {
      const foundItem = await ShoppingCart.findOne({
        where
      });
      if (foundItem) {
        // Item not found, create a new one
        const item = await ShoppingCart.update({ 'meta': body.meta }, {
          where,
          returning: true,
          plain: true
        })
        return {
          item: item[1],
          created: true
        };
      }

    } catch (error) {
      throw error
    }
  },

  getCart: async function (id) {
    var where = {
      id: id
    }
    try {
      const foundItem = await ShoppingCart.findOne({
        where
      });
      if (foundItem) {
        return foundItem;
      }

    } catch (error) {
      throw error
    }
  },
  login: async function(body) {
    var where = {
      username: body.username,
      password: body.password,
    }
    try {
      const foundItem = await User.findOne({
        where,
        attributes: ['username','token']
      });
      if (foundItem) {
        return foundItem;
      }else{
        throw 'UNF'
      }

    } catch (error) {
      throw error
    }
  },
  createUser: async function (body) {
    return User.create(body);
  },
  saveContact:  async function (body) {
    return Contact.create(body);
  },
  checkToken: async function(token){
      return User.findOne({
          where: {
            token: token
          }
        })
        .then(results => {
          return results
        });
  }
}