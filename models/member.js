import _ from 'lodash';
import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const clientSafeFields = ['id', 'name', 'email', 'phone', 'gender', 'birthday', 'status']

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
schema.methods.new = function() {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    return new Promise((resolve, reject) => {
        return this.save().then(res => {
            return resolve(_.pick(res, clientSafeFields));
        }).catch(err => {
            return reject(err);
        });
    });
}

// class methods
schema.statics.verify = function(email, password) {
    return new Promise((resolve, reject) => {
        return this.findOne({ email })
            .then(member => {
                if (!member) resolve(null);
                bcrypt.compare(password, member.password, (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    if (!res) {
                        return reject(new Error(10001));
                    }
                    return resolve(_.pick(member, clientSafeFields));
                })
            })
            .catch(err => {
                return reject(err);
            })
    })
}

schema.statics.findByEmail = function(email) {
    return new Promise((resolve, reject) => {
        return this.findOne({ email })
          .then((member) => {
              const result = member ? _.pick(member, clientSafeFields) : null; 
              return resolve(result);              
          })
          .catch(err => {
              return reject(err)
          })
    })
}

schema.statics.active = function(email) {
    return new Promise((resolve, reject) => {
        return this.update({ email }, { status: 'ACTIVED' })
            .then((res) => {
                const result = res.nModified === 0 ? false : true;
                return resolve(result);
            })
            .catch(err => {
                return reject(err);
            })
    });
}

schema.statics.updateProfile = function(email, obj) {
    console.log(obj);
    return new Promise((resolve, reject) => {
        return this.update({ email }, obj)
            .then(res => {
                const result = res.nModified === 0 ? false : true;
                console.log(res.nModified);
                return this.findOne({ email });
            })
            .then(result => {
                return resolve(result);
            })
            .catch(err => {
                return reject(err);
            })
    });
}

schema.statics.updatePasswd = function(email, password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return new Promise((resolve, reject) => {
        return this.update({ email }, { password: hash })
            .then(res => {
                const result = res.nModified === 0 ? false : true;
                return resolve(result);
            })
            .catch(err => {
                return reject(err);
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
