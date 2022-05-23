// insert requires
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

// create new schema
const thoughtSchema = new Schema(
    {
        thoughtPost: {

        },
        createdAt: {
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON:  {
            getters: true
        },
        id: false
    }
)
// create model
const thought = model("Thought", thoughtSchema);

// reference the reaction schema
module.exports = Thought;