// This file seeds the database with the starting data from the bookData.json, reviewData.json, and userData.json files.
const sequelize = require('../config/connection');
const {Book, Review, User} = require('../models');

const {hashMultiplePasswords} = require('../utils/hash-password.js')


const userData = require('./userData.json');
const bookData = require('./bookData.json');
const reviewData = require('./reviewData.json');




const seedDatabase = async () => {

    let userDataWithHashedPasswords = await hashMultiplePasswords(userData);
    
    await sequelize.sync({ force: false });

    await User.bulkCreate(userDataWithHashedPasswords, {
        insectionidualHooks: true,
        returning: true,
    });

    await Book.bulkCreate(bookData);

    await Review.bulkCreate(reviewData);

    process.exit(0);
}

try{

    seedDatabase();

} catch (error){

    console.log(error);
}



