const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        Image: {
            type: String
        },
        caption: {
            type: String,
            max: 500
        },
        reactions: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    } 
);

module.exports = mongoose.model("Post", postSchema);