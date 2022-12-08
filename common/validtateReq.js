const { StatusCodes, getReasonPhrase } = require("http-status-codes");
module.exports = (schema) => {
  return (req, res, next) => {
    const validation = [];
    const validateResult = schema.body.validate(req.body);
    // console.log(validateResult.error);
    if (validateResult.error) {
      validation.push(validateResult.error.details[0].message);
    }
    if (validation.length) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: `Validation : ${validation.join()}`,
        error: getReasonPhrase(StatusCodes.BAD_REQUEST),
      });
      return;
    }else{
      next();
    }   
  };
};
