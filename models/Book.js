const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

//Create a new Sequelize model for books
class Book extends Model {}

//Defines columns on model
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
        //link to database connection
        sequelize,
        //creates created_at and updated_at fields
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'book',
    }
)

module.exports = Book;