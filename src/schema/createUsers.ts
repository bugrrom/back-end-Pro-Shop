export const createUsers = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
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
  required: ['name', 'password', 'email'],
  additionalProperties: false,

};
