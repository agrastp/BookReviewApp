const sequelize = require('../config/connection');
const {Book, Review, User} = require('../models');

const userData = require('./userData.json');
const bookData = require('./bookData.json');
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    // Villy: I will come back and change it when necessary
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Book.bulkCreate(bookData);

    await Review.bulkCreate(reviewData);

    process.exit(0);
}

seedDatabase();
