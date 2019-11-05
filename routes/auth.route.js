const VerifyUserMiddleware = require('../middlewares/verify.user.middleware');
const AuthorizationController = require('../controllers/auth.controller');

const router = require('express-promise-router')();

router.route('/')
    .post(
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login);

module.exports = router;