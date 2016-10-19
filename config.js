module.exports = {
    rootPath: __dirname,
    env: process.env.NODE_ENV || 'dev',
    dev: {
        mongodb: {
            host: 'mongodb://localhost:27017',
            db: 'members_dev'
        },
        web: {
            url: 'http://localhost:7777'
        },
        api: {
            url: 'http://localhost:8888'
        }
    },
    staging: {
        mongodb: {
            host: 'mongodb://192.168.40.68:27017',
            db: 'members_staging'
        },
        web: {
            url: 'http://member.nownews.com'
        },
        api: {
            url: 'http://member.nownews.com:8888'
        }
    },
    production: {
        mongodb: {
            host: 'mongodb://192.168.40.68:27017',
            db: 'members_production'
        },
        web: {
            url: 'http://member.nownews.com'
        },
        api: {
            url: 'http://member.nownews.com:8888'
        }
    }
};