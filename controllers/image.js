const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '02fa4efdd26d4e5ba934ad7f559893e5'
});

const handleApiCall = (req, res ) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            console.log(data)
            res.json(data)
        })
        .catch(err => res.status(400).json('Unable to work with API'))
}

    

//ADVANCED: const handleImage = (db) => (req, res) => {
const handleImage = (req, res, db) => {
    const { id } = req.body
    
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then( entries => {
            res.json((entries[0]))
        })
        .catch(err => {
            res.status(400).json('Unable to get entries')
        })
}

module.exports = {
    handleImage,
    handleApiCall
}