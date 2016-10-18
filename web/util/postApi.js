import fetch from 'node-fetch';

const config = require('../../config')[`${process.env.NODE_ENV}`];

module.exports = function(url, body) {
    let fetchUrl = `${config.api.url}/${url}`;

    return fetch(fetchUrl, {
            timeout: 10000,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then((res) => res.json())
        .then((json) => Promise.resolve(json));
};
