import * as fs from 'fs';
import authorize from './authorize';
import callAppsScript from './callAppsScript';
import { CREDENTIAL_PATH } from './variables';

fs.readFile(CREDENTIAL_PATH, (e, content) => {
  if (e) {
    console.error('No client secrets file');
    return;
  }
  authorize(JSON.parse(content.toString()), callAppsScript);
});
