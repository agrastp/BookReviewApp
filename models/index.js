const User = require('./User.js');
const Book = require('./Book.js');
const Review = require('./Review.js');

Review.belongsTo(User, {

    foreignKey: 'user_id',
    OnDelete: 'CASCADE'
});

User.hasMany(Review, {

    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Review.belongsTo(Book, {

    foreignKey: 'book_id',
    onDelete: 'CASCADE'
});

Book.hasMany(Review, {

    foreignKey: 'book_id',
    onDelete: 'CASCADE'
});

module.exports = {User, Review, Book}