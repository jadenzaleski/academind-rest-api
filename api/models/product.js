const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../instance');

class Product extends Model {}

Product.init({
    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Product'
});

module.exports = Product;
