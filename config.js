module.exports = {
    rootPath: __dirname,
    env: process.env.NODE_ENV || 'dev',
    // encode by base64
    secretkey: 'Tk9XbmV3c19tZW1iZXI=',
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
        },
        redis: {
            host: "localhost",
            port: 6379,
            db: 2,
            expireSeconds: 3600
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
        },
        redis: {
            host: "localhost",
            port: 6379,
            db: 2,
            expireSeconds: 3600
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
        },
        redis: {
            host: "localhost",
            port: 6379,
            db: 2,
            expireSeconds: 3600
        }
    }
};