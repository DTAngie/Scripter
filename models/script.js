const mongoose = require('mongoose');

const scriptSchema = new mongoose.Schema({
    title: String,
    synopsis: String,
    logline: String,
    genre: {
        type: String,
        enum: [
            "Action",
            "Adventure",
            "Animation",
            "Biography",
            "Comedy",
            "Crime",
            "Drama",
            "Family",
            "Fantasy",
            "Film Noir",
            "History",
            "Horror",
            "Musical",
            "Mystery",
            "Romance",
            "Sci-Fi",	
            "Sport",
            "Superhero",
            "Thriller",
            "War",
            "Western"
        ]
    },
    mediaType: String,
    stage: String,
    budget: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Script', scriptSchema);


