const Rating = require('../models/ratings');
const Script = require('../models/Script');

module.exports = {
    create,
    show
}

async function create(req, res) {
    console.log(req.body);
    try {
        const rating = await Rating.create({score: req.body.rating, rater: req.user, script: req.body.script});
        res.status(201).json({userRating: rating});
    } catch (err) {
        console.log(err);
    }
}

async function show(req, res) {
    try {
        const rating = await Rating.findOne({rater: req.query.user, script: req.query.script}).exec();
        if(rating) {
            res.status(200).json({rating: rating.score});
        } else {
            res.status(200).json({rating: null});
        }
        // TODO: Test this to ensure that it's working
    } catch (err) {
        console.log(err);
    }
}