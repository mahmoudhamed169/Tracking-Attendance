const joi = require("joi");

module.exports = {
  addDepartentSchemaa: {
    body: joi.object().required().keys({
      departmentName: joi.string().required(),    
    }),
  },
 
};
