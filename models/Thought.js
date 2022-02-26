const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
ThoughtSchema.virtual('reactions').get(function() {
    return this.friends.length;
});

// Create the User model using the UserSchema
const User = model('Thought', ThoughtSchema);

module.exports = User;