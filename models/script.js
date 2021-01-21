const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingsSchema = Schema({
    username: String,
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
})

const scriptSchema = new Schema({
    title: String,
    synopsis: String,
    logline: String,
    genre: {
        type: String,
        enum: [
            '',
            'Action',
            'Adventure',
            'Animation',
            'Biography',
            'Comedy',
            'Crime',
            'Drama',
            'Family',
            'Fantasy',
            'Film Noir',
            'History',
            'Horror',
            'Musical',
            'Mystery',
            'Romance',
            'Sci-Fi',	
            'Sport',
            'Superhero',
            'Thriller',
            'War',
            'Western'
        ]
    },
    mediaType: {
        type: String,
        enum: [
            '',
            'Feature',
            'New Media',
            'Short',
            'Television',
            'Web'
        ]
    },
    stage: {
        type: String,
        enum: [
            '',
            'Draft',
            'Pitch',
            'Optioned',
            'Produced',
        ]
    },
    budget: {
        type: Number,
        min: 0,
        max: 6
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ratings: [ratingsSchema],
    averageRating: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Script', scriptSchema);


