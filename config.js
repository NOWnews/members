module.exports = {
    rootPath: __dirname,
    env: process.env.NODE_ENV || 'dev',
    // encode by base64
    secretkey: 'Tk9XbmV3c19tZW1iZXI=',
    oauth: {
        clientId: '773287785720-kkb49je5d3sfuav28vo9g0ebdmmna1dg.apps.googleusercontent.com',
        clientSecret: '2VQI61Jctj3f-MgYtZgEY0rn',
        callbackURL: 'memberapi.nownews.com/auth/oauth'
    },
    dev: {
        mongodb: {
            host: 'mongodb://localhost:27017',
            db: 'members_dev'
        },
        web: {
            url: 'http://localhost:5000'
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
            url: 'https://dev.nownews.com'
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
            url: 'https://dev.nownews.com'
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