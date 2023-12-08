const {v4: uuidv4} = require('uuid');

module.exports = {

    // This helper function increments a counter for the use of generating some IDs.
    count: (index) => {

        return index + 1;
    },

    /*Helper functions from module 14 challenge (Gabriel).  This function
    compares two arguments to see if they are equal.*/
    equals: (argumentOne, argumentTwo) => {

        if(argumentOne === argumentTwo){

            return true;
        
        } else {

            return false;
        }
    },

    // This helper function generates a UUID for the use of an element ID.
    generateUuid:() => {

        let uuid = uuidv4();
        return uuid;
    },

    // This helper function formates the date appropriately.
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
}