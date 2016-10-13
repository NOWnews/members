
import mongoose, { Schema } from 'mongoose';

const schema = new Schema({

    email: {
        type: String,
        required: true
    },

    token: {
        type: String,
        required: true
    },

    expireTime: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        emum: ['UNUSED', 'USED', 'GIVE_UP'],
        default: 'UNUSED'
    },

    trashed: {
        type: Boolean,
        default: false
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

module.exports = mongoose.model('resetPassword', schema);