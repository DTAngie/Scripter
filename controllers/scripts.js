const { Redirect } = require('react-router-dom');
const Script = require('../models/Script');

module.exports = {
    create,
    index,
    show,
    update,
    delete: deleteOne
}

async function create(req, res) {
    try {
        const script = await Script.create({...req.body, author: req.user});
        res.status(201).json({scriptID: script._id});
    } catch (err){
        console.log(err);
    }


    //TODO - below is the template if form ends up taking in images
    // const filePath = `${uuidv4()}/${req.file.originalname}`
    // const params = {Bucket: 'collectorcat', Key: filePath, Body: req.file.buffer};
    // s3.upload(params, async function(err, data){
    //         // data.Location is the address where our image is stored on aws
    //     const post = await Post.create({caption: req.body.caption, user: req.user, photoUrl: data.Location});
    //     const populatedUserPost = await post.populate('user').execPopulate();
    //     res.status(201).json({post: populatedUserPost})
    // })

}

async function index(req, res) {
    try {
        const scripts = await Script.find({author: req.user});
        res.status(200).json({scripts});
    } catch (err) {
        console.log(err);
    }
}

async function show(req, res) {
    try {
        const script = await Script.findOne({_id: req.params.id});
        res.status(200).json({script});
    } catch (err) {
        console.log(err);
    }
}

async function update(req, res) {
    try {
        await Script.updateOne({_id: req.params.id}, {...req.body});
        res.status(200).json({scriptID: req.params.id});

    } catch (err) {
        console.log(err);
    }
}

async function deleteOne(req, res){
    try {
        const script = await Script.findOne({_id: req.params.id});
        if (script.author.toString() !== req.user._id.toString()) {
            res.status(404).json('Bad Request');
        } else {
            script.deleteOne();
            res.status(200).json('Successful Deletion');
        }
    } catch (err) {
        console.log(err);
    }
}