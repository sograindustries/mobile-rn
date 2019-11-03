import AWS from 'aws-sdk';

var poolData = {
  UserPoolId: 'us-east-1_9vsr32SCz', // your user pool id here
  ClientId: '1hojv8fbr0nkft2p2tbvgksi46' // your app client id here
};

export const makeEcgService = () => {
  return {
    upload: (data: number[], sub: string, jwt: string, patchUuid: string) => {
      return new Promise<string>(async (res, rej) => {
        await AWS.config.update({
          ...AWS.config,
          region: 'us-east-1',
          credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:c6c201f9-b3f3-4c26-bf71-298384afd0be',
            Logins: {
              [`cognito-idp.us-east-1.amazonaws.com/${poolData.UserPoolId}`]: jwt
            }
          })
        });

        //  const payload = pako.deflate(JSON.stringify(data), { to: 'string' });
        const payload = JSON.stringify(data);

        const s3 = new AWS.S3({
          apiVersion: '2006-03-01'
        });

        var params = {
          Bucket: 'argos-ecgs',
          Key: `${sub}/${patchUuid}/${new Date().toISOString()}.json`,
          Body: payload
        };

        s3.upload(
          params,
          (error: Error, data: AWS.S3.ManagedUpload.SendData) => {
            if (error) {
              console.log('ERROR: ', error);
              rej(error);
            }

            if (data) {
              console.log('DATA: ', data);
              res(data.Location);
            }

            rej(new Error("Something wen't wrong uploading data to bucket."));
          }
        );
      });
    }
  };
};
