import * as fs from 'fs';
import * as readline from 'readline';
// eslint-disable-next-line no-unused-vars
import { google, oauth2_v2 } from 'googleapis';
import { TOKEN_PATH, SCOPES } from './variables';

type oAuth2Credentials = oauth2_v2.Params$$Tokeninfo | { access_token?: string | null };

const getAccessToken = (oAuth2Client: any, callback: Function) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    // コードとトークンを交換
    oAuth2Client.getToken(code, (e: NodeJS.ErrnoException, token: oAuth2Credentials) => {
      if (e) {
        console.error('Error retrieving access token', e);
        return;
      }
      oAuth2Client.setCredentials(token);
      // トークンを保存
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        callback(oAuth2Client);
      });
    });
  });
};

export default (credentials: any, callback: Function) => {
  const { client_id, client_secret, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      return getAccessToken(oAuth2Client, callback);
    }
    oAuth2Client.setCredentials(JSON.parse(token.toString()));
    // トークンを更新
    oAuth2Client.refreshAccessToken((e, newToken) => {
      if (e) {
        console.error(e);
        return;
      } if (newToken == null) {
        console.error('No new token.');
        return;
      }
      console.log(newToken, token);
      oAuth2Client.setCredentials(newToken);
      // 更新したトークンを保存
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(newToken));
    });
    return callback(oAuth2Client);
  });
};
