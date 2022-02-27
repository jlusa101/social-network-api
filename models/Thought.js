const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Database schema to represent a Reaction
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }

}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false

});

// Database schema to represent a Thought
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]

}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false

});

// Retrieve total count of reactions on a thought
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Create the User model using the UserSchema
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;