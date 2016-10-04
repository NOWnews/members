module.exports = {
    dev: {
        mongodb: {
            host: 'mongodb://localhost:27017',
            db: 'members_dev'
        }
    },
    staging: {
        mongodb: {
            host: 'mongodb://localhost:27017',
            db: 'members_staging'
        }
    },
    production: {
        mongodb: {
            host: 'mongodb://localhost:27017',
            db: 'members_production'
        }
    }
};