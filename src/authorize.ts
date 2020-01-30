import * as fs from 'fs';
import * as readline from 'readline';
import { google } from 'googleapis';
import { TOKEN_PATH, SCOPES } from './variables';

interface Credentials {
  installed: {
    client_id: string,
    project_id: string,
    auth_uri: string,
    token_uri: string,
    auth_provider_x509_cert_url: string,
    client_secret: string,
    redirect_uris: string[]
  }
}

const getAccessToken = (oAuth2Cleient: any, callback: Function) => {
  const authUrl = oAuth2Cleient.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Cleient.getToken(code, (err: NodeJS.ErrnoException, token: any) => {  
      if (err) {
        console.error('Error retrieving access token', err);
        return;
      }
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        callback(oAuth2Cleient);
      });
    });
  });
}

export default (credentials: Credentials, callback: Function) => {
  const { client_id, client_secret, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      return getAccessToken(oAuth2Client, callback);
    }
    oAuth2Client.setCredentials(JSON.parse(token.toString()));
    callback(oAuth2Client);
  });
}
