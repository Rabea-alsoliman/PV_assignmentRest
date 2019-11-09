const Joi = require('joi');
const crypto = require('crypto');

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      console.log(`validate_param: req.params[${name}]:`, req.params[name]);

      const result = Joi.validate({param: req['params'][name]}, schema);

      if (result.error) {
        // Error happened
        console.log('validation error'); 
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
          req.value = {};
        }
        if (!req.value['params']) {
          req.value['params'] = {};
        }
        req.value['params'][name] = result.value.param;
        next();
      }            
    }
  },
  validateBody: (schema) => {
    return(req, res, next) => {
      if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
      }
      if (req.file) {req.body.userImg = req.file.path}
      //console.log('req.body:', req.body);
      const result = Joi.validate(req.body, schema);

      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
            req.value = {};
        }
        if (!req.value['body']) {
            req.value['body'] = {};
        }
        req.value['body'] = result.value;
        next();
      }
    }
  },
  schemas: {
    userSchema: Joi.object().keys({
      username: Joi.string().required().trim(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6), 
      firstName: Joi.string().required().trim(),
      lastName: Joi.string().required().trim(),
      userImg: Joi.string().required().trim()
    }),
    userPatchSchema: Joi.object().keys({
      username: Joi.string().trim(),
      email: Joi.string().email(),
      password: Joi.string().min(6), 
      firstName: Joi.string().trim(),
      lastName: Joi.string().trim(),
      userImg: Joi.string()
    }),
    idSchema: Joi.object().keys({
      // userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),      
  }
}