module.exports = {
    rootPath: __dirname,
    env: process.env.NODE_ENV || 'dev',
    // encode by base64
    secretkey: 'Tk9XbmV3c19tZW1iZXI=',
    oauth: {
        clientId: '773287785720-gfh8q720qjo6sdoar8hmdj2jr4gmlka8.apps.googleusercontent.com',
        clientSecret: 'Xa1zBF8R0g5Y9nN5fbElHaPv',
        callbackURL: 'https://memberapi.nownews.com/api/auth/oauth/callback'
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
            host: 'mongodb://localhost:27017',
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
            host: 'mongodb://localhost:27017',
            db: 'members_production'
        },
        web: {
            url: 'https://www.nownews.com'
        },
        api: {
            url: 'https://memberapi.nownews.com'
        },
        redis: {
            host: "localhost",
            port: 6379,
            db: 2,
            expireSeconds: 3600
        }
    }
};
