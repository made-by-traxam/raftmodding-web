import AJV from 'ajv';

export const ajv = new AJV({
  allErrors: true,
  verbose: true,
});
ajv.addFormat('time', '^([0-1][0-9]|2[0-3]):[0-5][0-9]$');
