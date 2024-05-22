const { Sequelize, DataTypes} = require('sequelize');
const Product = require("../models/product");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
        timestamps: false,
    }
});

const orderSchema = sequelize.define('order', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    product: {
        type: DataTypes.UUID,
        references: {
            model: Product,
            key: '_id'
        },
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }

});



orderSchema.sync()
    .then(r => console.log('orderSchema synchronized successfully.'))
    .catch(err => console.log(err));
module.exports = orderSchema;