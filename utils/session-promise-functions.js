/* This function implements promises for the saving of the session. */
async function sessionSaveWithPromise(req){

    return new Promise((resolve, reject) => {

        req.session.save((error, result) => {

            if(error){

                reject(error);
            
            } else {

                resolve(result)
            }
        })
    })
}

/* This function implements promises for the destruction of the session 
when the user logs out. */
async function sessionDestroyWithPromise(req){

    return new Promise((resolve, reject) => {

        req.session.destroy((error, result) => {

            if(error){

                reject(error);
            
            } else {

                resolve(result)
            }
        })
    })
}

module.exports  = {sessionSaveWithPromise, sessionDestroyWithPromise}