function createPatch(uuid: string, sampleCount: number, jwt: string) {
  return new Promise((resolve, rej) => {
    console.log('JWT:', jwt);
    fetch(
      'https://5r2zhe6294.execute-api.us-east-1.amazonaws.com/production/patches',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwt
        },
        body: JSON.stringify({
          name: 'Will Brazil',
          batteryPct: 0.6,
          lastUploadEpoch: new Date().getTime() / 1000,
          uuid,
          username: 'willbrazil',
          sampleCount
        })
      }
    )
      .then(res => res.json())
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        rej(err);
      });
  });
}

export default {
  createPatch
};
