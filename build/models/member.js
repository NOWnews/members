'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutoIncrement = require('mongoose-auto-increment');

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clientSafeFields = ['name', 'email', 'phone', 'gender', 'birthday', 'status', 'createdAt', 'updatedAt'];

var schema = new _mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
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
        default: Date.now
    }
}, {
    timestamps: {
        updatedAt: 'updatedAt'
    }
});

// instance methods
schema.methods.new = function () {
    var _this = this;

    var salt = _bcrypt2.default.genSaltSync(10);
    var hash = _bcrypt2.default.hashSync(this.password, salt);
    this.password = hash;
    return new Promise(function (resolve, reject) {
        return _this.save().then(function (res) {
            resolve(_lodash2.default.pick(res, clientSafeFields));
        }).catch(function (err) {
            reject(err);
        });
    });
};

// class methods
schema.statics.login = function (email, password) {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
        return _this2.findOne({ email: email }).then(function (member) {
            if (!member) resolve(null);
            _bcrypt2.default.compare(password, member.password, function (err, res) {
                if (err) reject(err);else resolve(_lodash2.default.pick(member, clientSafeFields));
            });
        }).catch(function (err) {
            reject(err);
        });
    });
};

schema.statics.findByEmail = function (email) {
    var _this3 = this;

    return new Promise(function (resolve, reject) {
        return _this3.findOne({ email: email }).then(function (member) {
            console.log(member);
            if (!member) {
                resolve(null);
            }
            resolve(_lodash2.default.pick(member, clientSafeFields));
        }).catch(function (err) {
            reject(err);
        });
    });
    return spec;
};

schema.statics.active = function (email) {
    var _this4 = this;

    return new Promise(function (resolve, reject) {
        return _this4.update({ email: email }, { status: 'ACTIVED' }).then(function (res) {
            if (res.nModified === 0) {
                resolve(false);
            }
            resolve(true);
        }).catch(function (err) {
            reject(err);
        });
    });
};

schema.index({ id: 1 }, { sparse: true });

schema.plugin(_mongooseAutoIncrement2.default.plugin, {
    model: 'member',
    field: 'id',
    startAt: 1
});

module.exports = _mongoose2.default.model('member', schema);