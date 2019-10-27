import AWS from 'aws-sdk';

var poolData = {
  UserPoolId: 'us-east-1_9vsr32SCz', // your user pool id here
  ClientId: '1hojv8fbr0nkft2p2tbvgksi46' // your app client id here
};

export const makeEcgService = () => {
  return {
    upload: (data: number[], sub: string, jwt: string) => {
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
          Key: `${sub}/${new Date().getTime() / 1000}.json`,
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

        /*
        s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
          if (err) {
            console.log('ERROR: ', err);
            rej(err);
          }
          if (data) {
            console.log('DATA: ', data);
            res(data.Location);
          }

          rej(new Error("Something wen't wrong uploading data to bucket."));
        });
        */
        /*
        s3.createBucket(
          { Bucket: 'c10d09b1-3940-4a7b-98e1-a804ef813f68' },
          (err, data) => {
            if (err) {
              console.log('ERROR: ', err);
              rej(err);
            }
            if (data) {
              console.log('DATA: ', data);
              res(data.Location);
              return;
            }

            rej(new Error("Something wen't wrong uploading data to bucket."));
          }
        );
        */

        /*
        s3.upload(
          uploadParams,
          (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
            if (err) {
              console.log('ERROR: ', err);
              rej(err);
            }
            if (data) {
              console.log('DATA: ', data);
              res(data.Location);
            }

            rej(new Error("Something wen't wrong uploading data to bucket."));
          }
        );
        */
      });
    }
  };
};
