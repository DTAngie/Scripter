const Rating = require('../models/ratings');
const Script = require('../models/Script');

module.exports = {
    create
}

async function create(req, res) {
    console.log(req.body);
    try {
        const rating = await Rating.create({score: req.body.rating, rater: req.user, script: req.body.script});
    } catch (err) {
        console.log(err);
    }
    return res.status(201).json({userRating: rating});
}