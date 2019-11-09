import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import { User } from '../../store/session/types';

var poolData = {
  UserPoolId: 'us-east-1_9vsr32SCz', // your user pool id here
  ClientId: '1hojv8fbr0nkft2p2tbvgksi46' // your app client id here
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

export const makeAuthService = () => {
  return {
    login: async (username: string, password: string) => {
      return new Promise<User>((res, rej) => {
        var authenticationData = {
          Username: username,
          Password: password
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
          authenticationData
        );

        var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
          Username: username,
          Pool: userPool
        });

        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function(result) {
            res({
              jwt: result.getIdToken().getJwtToken(),
              refreshToken: result.getRefreshToken().getToken(),
              username: result.getIdToken()['payload']['cognito:username'],
              sub: result.getIdToken()['payload']['sub']
            });
          },

          onFailure: function(err) {
            rej(err);
          }
        });
      });
    },
    signup: async (username: string, password: string) => {
      return new Promise<AmazonCognitoIdentity.CognitoUser>((res, rej) => {
        userPool.signUp(
          username,
          password,
          [
            new AmazonCognitoIdentity.CognitoUserAttribute({
              Name: 'email',
              Value: username
            })
          ],
          [],
          function(err, result) {
            if (err) {
              rej(err);
              return;
            }

            if (!result) {
              rej(new Error('No result available.'));
              return;
            }

            res(result.user);
          }
        );
      });
    },

    refresh: (refreshToken: string) => {
      return new Promise<User>((res, rej) => {
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
          Username: 'will@argosindustries.com',
          Pool: userPool
        });

        const token = new AmazonCognitoIdentity.CognitoRefreshToken({
          RefreshToken: refreshToken
        });

        cognitoUser.refreshSession(token, (err, session) => {
          if (err) {
            rej(err);
            return;
          }

          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:c6c201f9-b3f3-4c26-bf71-298384afd0be',
            Logins: {
              [`cognito-idp.us-east-1.amazonaws.com/${poolData.UserPoolId}`]: session
                .getIdToken()
                .getJwtToken()
            }
          });

          const accessToken = session.getIdToken();
          res({
            jwt: accessToken.getJwtToken(),
            refreshToken: session.getRefreshToken().getToken(),
            username: accessToken['payload']['cognito:username'],
            sub: accessToken['payload']['sub']
          });
        });
      });
    },

    getCurrentUser: () => {
      return new Promise<User | null>((res, rej) => {
        var cognitoUser = userPool.getCurrentUser();

        if (!cognitoUser) {
          res(null);
          return;
        }

        cognitoUser.getSession((err: any, session: any) => {
          if (err) {
            rej(err);
            return;
          }

          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:c6c201f9-b3f3-4c26-bf71-298384afd0be',
            Logins: {
              [`cognito-idp.us-east-1.amazonaws.com/${poolData.UserPoolId}`]: session
                .getIdToken()
                .getJwtToken()
            }
          });

          const accessToken = session.getIdToken();
          res({
            jwt: accessToken.getJwtToken(),
            refreshToken: session.getRefreshToken().getToken(),
            username: accessToken['payload']['cognito:username'],
            sub: accessToken['payload']['sub']
          });

          /*
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              IdentityPoolId: "...", // your identity pool id here
              Logins: {
                // Change the key below according to the specific region your user pool is in.
                [`cognito-idp.us-east-2.amazonaws.com/${poolData.UserPoolId}`]: session
                  .getIdToken()
                  .getJwtToken()
              }
            });
            */

          // Instantiate aws sdk service objects now that the credentials have been updated.
          // example: var s3 = new AWS.S3();
        });
      });
    },

    signOut: () => {
      return new Promise((res, rej) => {
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser) {
          cognitoUser.signOut();
          res();
        } else {
          rej(new Error('User is not available.'));
        }
      });
    }
  };
};
