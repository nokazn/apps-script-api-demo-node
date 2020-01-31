import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

export default (oAuth2Client: any) => {
  const id = Math.ceil(Math.random() * 100);
  const name = `hoge${id}`;

  const script = google.script({
    version: 'v1',
    auth: oAuth2Client,
  });
  return script.scripts.run({
    auth: oAuth2Client,
    scriptId: process.env.SCRIPT_ID,
    requestBody: {
      function: 'test',
      parameters: [id, name],
      devMode: true,
    },
  }).then((res) => {
    console.log(res);
  }).catch((e) => {
    console.error(e);
  });
};
