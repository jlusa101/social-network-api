const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    thoughts: [{
        ref: 'Thought'
    }],
    friends: [{
        ref: 'User'
    }]

}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false

});

// Retrieve total count of friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Create the User model using the UserSchema
const User = model('User', UserSchema);

module.exports = User;