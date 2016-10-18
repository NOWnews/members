
import mongoose, { Schema } from 'mongoose';

const schema = new Schema({

    member: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'member'
    },

    service: {
        type: String,
        emum: ['NOWnews', 'NOWvote'],
        default: 'NOWnews'
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

schema.index({ member: 1});

module.exports = mongoose.model('service', schema);