const {scrypt} = require('crypto');
const { promisify } = require('util');

const N = 16384; // CPU/memory cost parameter
const r = 8; // Block size parameter
const p = 1; // Parallelization parameter

const scryptAsync = promisify(scrypt);

/*The Xpert Learning Assistant helped me write this function.  It takes
users, hashes their passwords, and then returns the users with the hashed passwords.*/
async function hashMultiplePasswords(userData){

    

    for (let counter = 0; counter < userData.length; counter++){

        let derivedKey = await scryptAsync(userData[counter].password, userData[counter].salt, 64, {N, r, p});
        let derivedKeyHex = derivedKey.toString('hex');

        userData[counter].password = derivedKeyHex;
    }

    return userData;
}

/* This function hashes a single password and hashes it, then returns it, or its 
derived key as necessary.*/
async function hashSinglePassword(password, salt, reasonForCallingFunction){

    let derivedKey = await scryptAsync(password, salt, 64, {N, r, p});

    if (reasonForCallingFunction === "authentication"){

        return derivedKey;
    
    } else if (reasonForCallingFunction === "creation"){

        let derivedKeyHex = derivedKey.toString('hex');
        return derivedKeyHex;
    }

    
}

module.exports = {hashMultiplePasswords, hashSinglePassword};