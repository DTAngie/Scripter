const Rating = require('../models/ratings');
const Script = require('../models/script');

module.exports = {
    create,
    show,
    update
}

async function create(req, res) {
    try {
        const rating = await Rating.create({score: req.body.rating, rater: req.user, script: req.body.script});
        res.status(201).json({rating: rating});
    } catch (err) {
        res.status(404).json({404:'Bad Request'});
    }
}

async function show(req, res) {
    try {
        const rating = await Rating.findOne({rater: req.user, script: req.query.script});
        if(rating) {
            res.status(200).json({rating: rating});
        } else {
            res.status(200).json({rating: null});
        }
    } catch (err) {
        res.status(404).json({404:'Bad Request'});
    }
}

async function update(req, res) {
    try {
        const rating = await Rating.findOne({_id: req.params.id});
        rating.score = req.body.rating;
        rating.save();
        res.status(200).json({rating: rating});
    } catch (err) {
        res.status(404).json({404:'Bad Request'});
    }
}