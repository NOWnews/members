
import mongoose, { Schema } from 'mongoose';

const schema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String
    },

    birthday: {
        type: Date,
    },

    gender: {
        type: String,
        emum: ['MALE', 'FEMALE', 'OTHER'],
        default: 'OTHER'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    }

},  {
    timestamps: {
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('member', schema);