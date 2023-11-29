const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
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
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {

            type: DataTypes.INTEGER,
            allowNull: false,
            references: {

                model: 'User',
                key: 'id'
            }
        },
        book_id: {

            type: DataTypes.INTEGER,
            allowNull: false,
            references: {

                model: 'Book',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: false,
        underscored: true,
        modelName: 'Review',
    }
)

module.exports = Review;