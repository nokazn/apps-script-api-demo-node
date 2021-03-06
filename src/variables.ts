export const SCOPES = [
  'https://www.googleapis.com/auth/script.projects',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive',
] as const;

export const TOKEN_PATH = './token.json' as const;

export const CREDENTIAL_PATH = './credentials.json' as const;
