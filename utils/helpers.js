const {v4: uuidv4} = require('uuid');

module.exports = {

    //Helper functions from module 14 challenge (Gabriel).
    count: (index) => {

        return index + 1;
    },

    equals: (argumentOne, argumentTwo) => {

        if(argumentOne === argumentTwo){

            return true;
        
        } else {

            return false;
        }
    },

    generateUuid:() => {

        let uuid = uuidv4();
        return uuid;
    },

    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
}