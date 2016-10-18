
import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const schema = new Schema({

    memberId: {
        type: Number,
        required: true,
        uniq: true
    },

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

    status: {
        type: String,
        emum: ['PENDING', 'VERIFIED', 'SUSPENDED'],
        default: 'PENDING'
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

schema.index({ memberId: 1}, { sparse: true });

schema.plugin(autoIncrement.plugin, {
    model: 'member',
    field: 'memberId',
    startAt: 1
});

module.exports = mongoose.model('member', schema);