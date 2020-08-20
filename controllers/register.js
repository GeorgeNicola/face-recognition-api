const handleRegister =  (req, res, db, bcrypt) => {
    const  {email, name, password } = req.body

    if(!email || !name || !password){
        return res.status(400).json('Incorrect form submission')
    }//Credentials validations ( server-side )

    const hash = bcrypt.hashSync(password) 
    //Hash ( Crypt ) the password

    db.transaction( trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email') //Returns the email
        .then( loginEmail => {  //loginEmail = .returning() result

            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0])
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
        res.status(400).json('Unable to register')
    })//If transaction fails => error
    //Transactions are used when you have to do more than 1 thing ( Passw Hash + Add user to DB )
}

module.exports = {
    handleRegister: handleRegister
}