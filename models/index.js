
/*This file defines the relationships between the sequelize models.*/
const User = require('./User');
const Book = require('./Book');
const Review = require('./Review');

Review.belongsTo(User, {
    foreignKey: 'user_id',

});

User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Review.belongsTo(Book, {
    foreignKey: 'book_id',

});

Book.hasMany(Review, {
    foreignKey: 'book_id',
    onDelete: 'CASCADE'
});

User.belongsToMany(Book, {
    through: {
        model: Review,
        unique: false
    },
    as: 'user_idk',
});
 
Book.belongsToMany(User, {
    through: {
        model: Review,
        unique: false
    },
    as: 'user',
});

module.exports = {User, Review, Book}