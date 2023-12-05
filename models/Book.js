const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false

        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        page_num: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image_path: {
            type: DataTypes.BLOB('long'), 
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'book',
    }
)

module.exports = Book;