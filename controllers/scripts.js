const Script = require('../models/Script');
const Rating = require('../models/ratings');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();

module.exports = {
    create,
    index,
    allScripts,
    getFeatured,
    show,
    edit,
    update,
    delete: deleteOne
}

async function create(req, res) {
    try {
        let uploadedURL = '';
        if (req.file) {
            const filePath = `${uuidv4()}/${req.file.originalname}`;
            const params = {Bucket: 'movielib2020', Key: filePath, Body: req.file.buffer};
            const poster = await s3.upload(params).promise();
            uploadedURL = poster.Location;
        }
        const script = await Script.create({
            title: req.body.title,
            synopsis: req.body.synopsis,
            logline: req.body.logline,
            genre: req.body.genre,
            mediaType: req.body.mediaType,
            stage: req.body.stage,
            budget: req.body.budget,
            author: req.user,
            castIdeas: req.body.castIdeas,
            posterURL: uploadedURL,
        });
        res.status(201).json({scriptID: script._id});
    } catch (err){
        res.status(404).json({404:'Bad Request'});
    }
}

async function index(req, res) {
    try {
        const scripts = await Script.find({author: req.user});
        res.status(200).json({scripts});
    } catch (err) {
        res.status(404).json({404:'Bad Request'});
    }
}

async function allScripts(req, res) {
    try {
        const scripts = await Script.find(req.query).limit(15).populate('author').exec();
        const author = req.query.author ? await User.findOne({_id: req.query.author}) : null;
        const username = author ? author.username : null;
        res.status(200).json({scripts: scripts, author: username});
    } catch(err) {
        res.status(404).json({404:'Bad Request'});
    }
}

async function getFeatured(req, res){
    try {
        const scripts = await Script.find({ averageRating: { $ne: null } }).sort({averageRating: 'desc'}).limit(3).select('title logline posterURL').exec();
        res.status(200).json({scripts});
    } catch (err) {
        res.status(404).json({404:'Bad Request'});
    }
}

async function show(req, res) {
    try {
        const script = await Script.findOne({_id: req.params.id}).populate('author', 'username').exec();
        const avg = await calculateAverageScore(script);
        script.averageRating = avg;
        script.save();
        res.status(200).json({script});
    } catch (err) {
        res.status(404).json({404:'Bad Request'});
    }


    async function calculateAverageScore(scriptID){
        try {
            const ratings = await Rating.find({script: scriptID});
            if (ratings.length > 0) {
                let sumTotal = 0;
                ratings.forEach(function(rating) {
                    sumTotal += rating.score;
                })
                return Math.round(sumTotal/ratings.length);
            }
            return 0;
        } catch(err) {
            return null;
        }
    }
}

async function edit(req, res) {
    try {
        const script = await Script.findOne({_id: req.params.id}).populate('author', 'username').exec();
        if (script.author._id.toString() !== req.user._id.toString()){
            res.status(404).json({404:'Bad Request'});
        } else {
            res.status(200).json({script});
        }
    } catch (err) {
        res.status(404).json({404:'Bad Request'});
    }
}

async function update(req, res) {
    try {
        const script = await Script.findOne({_id: req.params.id});
        let uploadedURL = script.posterURL;
        if (req.file) {
            const filePath = `${uuidv4()}/${req.file.originalname}`;
            const params = {Bucket: 'movielib2020', Key: filePath, Body: req.file.buffer};
            const poster = await s3.upload(params).promise();
            uploadedURL = poster.Location;
        }
        const updatedScript = await Script.updateOne({_id: req.params.id},{
            title: req.body.title,
            synopsis: req.body.synopsis,
            logline: req.body.logline,
            genre: req.body.genre,
            mediaType: req.body.mediaType,
            stage: req.body.stage,
            budget: req.body.budget,
            author: req.user,
            castIdeas: req.body.castIdeas,
            posterURL: uploadedURL,
        });
        res.status(200).json({scriptID: req.params.id});
    } catch (err){
        res.status(404).json({404:'Bad Request'});
    }
}

async function deleteOne(req, res){
    try {
        const script = await Script.findOne({_id: req.params.id});
        if (script.author.toString() !== req.user._id.toString()) {
            res.status(404).json({404:'Bad Request'});
        } else {
            script.deleteOne();
            res.status(200).json('Successful Deletion');
        }
    } catch (err) {
        res.status(404).json({404:'Bad Request'});
    }
}

