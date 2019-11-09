const jwtSecret = require('../helpers/env.config').jwt_secret,
  jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.login = (req, res) => {
  try {
    let refreshId = req.body.userId + jwtSecret;
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
    req.body.refreshKey = salt;
    let token = jwt.sign(req.body, jwtSecret);
    let b = new Buffer(hash);
    res.status(201).send({accessToken: token});
  } catch (err) {
    res.status(500).send({errors: err});
  }
};