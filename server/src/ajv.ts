import AJV from 'ajv';
import ajvErrors from 'ajv-errors'

export const ajv = new AJV({
  allErrors: true, // required for 'ajv-errors' which supports custom error messages
  verbose: true,
});
ajv.addFormat('time', '^([0-1][0-9]|2[0-3]):[0-5][0-9]$');
ajvErrors(ajv);
