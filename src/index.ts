import * as fs from 'fs';
import authorize from './authorize';
import callAppsScript from './callAppsScript';
import { CREDENTIAL_PATH } from './variables';

const credentials = fs.readFileSync(CREDENTIAL_PATH);
if (credentials == null) {
  console.error('No client secrets file');
} else {
  authorize(JSON.parse(credentials.toString()), callAppsScript);
}
