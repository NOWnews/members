import Promise from 'bluebird';
import redis from 'redis';
import config from '../config';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const host = config.dev.redis.host;
const port = config.dev.redis.port;
const db = config.dev.redis.db;

const client = redis.createClient({
    host: host,
    port: port,
    db: db
});

module.exports = {
    getValue: async (key) => {
        try {
            let value = await client.getAsync(key);
            console.log('value = %j', value);

            if(!value) {
                return Promise.resolve(null);
            }

            let valueObject = JSON.parse(value);
            return Promise.resolve(valueObject);
        } catch (err) {
            return Promise.reject(err);
        }
    },
    setValue: async (key, value, expireTime) => {
        try {
            let valueString = JSON.stringify(value);
            await client.setAsync(key, valueString);

            if(expireTime) {
                await client.expireAsync(key, expireTime);
            }

            return Promise.resolve(value);
        } catch (err) {
            return Promise.reject(err);
        }
    },
    removeValue: async (key) => {
        try {

            let value = await client.getAsync(key);
            console.log('value = %s', value);

            if(!value) {
                return Promise.resolve(true);
            }

            await client.delAsync(key);

            return Promise.resolve(true);
        } catch (err) {
            return Promise.reject(err);
        }
    }
};
