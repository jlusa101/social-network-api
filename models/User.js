// Dependancies
const { Schema, model } = require('mongoose');

// Database schema to represent a User
const UserSchema = new Schema({
    username: {
        type: String,
        unique: [true, 'This username has alreaby been taken'],
        required: [true, 'Username is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: /.+\@.+\..+/,
        unique: [true, 'An account with this email already exists']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
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