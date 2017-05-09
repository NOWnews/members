module.exports = {
    // login validate
    10000: {
        message: 'account is not exist',
        statusCode: 400
    },

    10001: {
        message: 'invalid account or password',
        statusCode: 400
    },

    10002: {
        message: 'account is not actived',
        statusCode: 400
    },

    // authenticate validate
    11001: {
        message: 'token expire',
        statusCode: 400
    },
    11002: {
        message: 'invalid token',
        statusCode: 400
    },
    11003: {
        message: 'account is not exist',
        statusCode: 400
    },
    11004: {
        message: 'account is registered',
        statusCode: 400
    },
    11005: {
        message: 'account status is not pending',
        statusCode: 400
    },
    11006: {
        message: 'active account fail',
        statusCode: 400
    }
};
