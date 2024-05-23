const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../instance');
const Product = require('./product');

class Order extends Model {
}

Order.init({
    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    product: {
        type: DataTypes.UUID,
        references: {
            model: Product,
            key: '_id'
        },
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Order'
});

// Define associations
Order.belongsTo(Product, {foreignKey: 'product'});
Product.hasMany(Order, {foreignKey: 'product'});

module.exports = Order;
