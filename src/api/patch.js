"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createPatch(uuid, sampleCount, jwt) {
    return new Promise(function (resolve, rej) {
        console.log('JWT:', jwt);
        fetch('https://5r2zhe6294.execute-api.us-east-1.amazonaws.com/production/patches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: jwt
            },
            body: JSON.stringify({
                name: 'Will Brazil',
                batteryPct: 0.6,
                lastUploadEpoch: new Date().getTime() / 1000,
                uuid: uuid,
                username: 'willbrazil',
                sampleCount: sampleCount
            })
        })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            resolve(res);
        })
            .catch(function (err) {
            rej(err);
        });
    });
}
exports.default = {
    createPatch: createPatch
};
