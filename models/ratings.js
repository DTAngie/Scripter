const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    score: Number,
    rater: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    script : {
        type: Schema.Types.ObjectId,
        ref: 'Script',
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Rating', ratingSchema);
