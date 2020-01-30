import * as fs from 'fs';
import authorize from './authorize';
import callAppsScript from './callAppsScript';

fs.readFile('credentials.json', (e, content) => {
  if (e) {
    console.error('No client secrets file');
    return;
  }
  authorize(JSON.parse(content.toString()), callAppsScript);
});
