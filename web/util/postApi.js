import fetch from 'node-fetch';

module.exports = function(url, body) {
    let fetchUrl = `${config.apiServer}/${url}`;

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
