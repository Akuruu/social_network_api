// insert requires
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

// create new schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: [1],
            max: [280],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp),
        },
        username: {
            type: String,
            requried: true,
        },
        reactions: [
            reactionSchema
        ]
    },
    {
        toJSON:  {
            getters: true
        }, id: false
    }
);

// reactionCount virtual
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

// create model
const Thought = model("Thought", thoughtSchema);


module.exports = Thought;