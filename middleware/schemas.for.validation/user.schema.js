function getUserSchema(Joi) {
  return Joi.object().keys({
    params: {
      id: Joi.string().trim().required()
    }
  });
}

function updateUserSchema(Joi) {
  return Joi.object().keys({
    params: {
      id: Joi.string().trim().required()
    },
    body: {
      name: Joi.string(),
      email: Joi.string().trim().email(),
      password: Joi.string()
        .trim()
        .min(5)
        .max(16)
    }
  });
}

export {
  getUserSchema,
  updateUserSchema
};