const sequelize = require('../config/connection');
const {Book, Review, User} = require('../models');

const userData = require('./userData.json');
const bookData = require('./bookData.json');
const reviewData = require('./reviewData.json');

let userDataWithHashedPasswords = hashUserPasswords(userData);

const seedDatabase = async () => {
    await sequelize.sync({ force: false });

    // Villy: I will come back and change it when necessary
    await User.bulkCreate(userDataWithHashedPasswords, {
        individualHooks: true,
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

// I, Gabriel, took this function from my module 14 challenge.
function hashUserPasswords(userData){

    for(let counter = 0; counter < userData.length; counter++){

        let hashedPassword = bcrypt.hashSync(userData[counter].password, 10)

        userData[counter].password = hashedPassword;
    }

    return userData;
}

