export const order = {
  type: 'object',
  properties: {
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 18,
    },
    email: {
      type: 'string',
      format: 'email',
    },
  },
  required: ['password', 'email'],
  additionalProperties: false,
};
