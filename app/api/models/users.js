const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Define a Schema for MongoDB
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
});

// Hash user password before saving to database

UserSchema.pre('save',(next) => {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('User', UserSchema);
