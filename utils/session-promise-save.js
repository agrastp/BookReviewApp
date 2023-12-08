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

module.exports  = sessionSaveWithPromise;