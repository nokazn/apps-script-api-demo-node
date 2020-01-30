import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

export default (auth: any) => {
  const id = Math.ceil(Math.random() * 100);
  const name = `hoge${id}`
  
  const script = google.script({
    version: 'v1',
    auth
  });
  script.scripts.run({
    auth,
    scriptId: process.env.SCRIPT_ID,
    requestBody: {
      function: 'test',
      parameters: [id, name],
      devMode: true
    }
  }).then((res) => {
    console.log(res);
  }).catch(e => {
    console.error(e);
  });
};
