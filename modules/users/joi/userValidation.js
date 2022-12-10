const Joi = require("joi");

module.exports = {
  singUpSchema: {
    body: Joi.object()
      .required()
      .keys({
        fristName: Joi.string().required().messages({
          "string.empty": "sorry ...fristName is required",
        }),
        lastName: Joi.string().required().messages({
          "string.empty": "sorry ...lastName is required",
        }),
        email: Joi.string().required().email().messages({
          "string.email": "sorry ..please enter valid email",
        }),
        password: Joi.string().required(),
      }),
  },

  singInSchema: {
    body: Joi.object().required().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  },
};
