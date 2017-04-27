import _ from 'lodash';
import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const clientSafeFields = ['name', 'email', 'phone', 'gender', 'birthday', 'status', 'createdAt', 'updatedAt']

const schema = new Schema({
    id: {
        type: String,
        required: true,
        unique : true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    gender: {
        type: String,
        emum: ['MALE', 'FEMALE', 'OTHER'],
        default: 'OTHER'
    },
    birthday: {
        type: String
    },
    thirdPartyProvider: {
        type: String
    },
    thirdPartyId: {
        type: String
    },
    status: {
        type: String,
        default: 'PENDING'
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

// instance methods
schema.methods.new = function () {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    return new Promise((resolve, reject) => {
        return this.save().then(res => {
            resolve(_.pick(res, clientSafeFields));
        }).catch(err => {
            reject(err);
        });
    });
}

// class methods
schema.statics.login = function (email, password) {
    return new Promise((resolve, reject) => {
        return this.findOne({ email })
            .then(member => {
                if (!member) reject(`${email} not found`);
                bcrypt.compare(password, member.password, (err, res) => {
                    if (err) reject(err);
                    else resolve(_.pick(member, clientSafeFields))
                })
            })
            .catch(err => {
                reject(err);
            })
    })
}

schema.statics.findByEmail = function (email) {
    return new Promise((resolve, reject) => {
        return this.findOne({ email })
          .then(member => {
              if(!member) {
                  resolve(null);
              }
              resolve(_.pick(member, clientSafeFields));
          })
          .catch(err => {
              reject(err)
          })
    })
    return spec;
}

schema.statics.active = function (email) {
    return new Promise((resolve, reject) => {
        return this.update({ email }, { status: 'ACTIVED' })
            .then(res => {
                if (res.nModified === 0) {
                    resolve(false);
                }
                resolve(true);
            })
            .catch(err => {
                reject(err);
            })
    });
}

schema.index({ id: 1 }, { sparse: true });

schema.plugin(autoIncrement.plugin, {
    model: 'member',
    field: 'id',
    startAt: 1
});

module.exports = mongoose.model('member', schema);
