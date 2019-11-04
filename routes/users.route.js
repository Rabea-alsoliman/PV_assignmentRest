const express = require('express');
const router = require('express-promise-router')();
//const router = express.Router();
const usersController = require('../controllers/users.controller');
 const uploadImg = require('../controllers/users.controller').uploadImg;

const { validateParam,  schemas, validateBody }  = require('../helpers/route.helper');

router.route('/') 
    .get(usersController.index)
    .post(uploadImg.single('userImg'), validateBody(schemas.userSchema), usersController.newUser); 

router.route('/:userId') 
    .get(validateParam(schemas.idSchema, "userId"), usersController.getUser)
    
    .patch([validateParam(schemas.idSchema, "userId"),
            validateBody(schemas.userPatchSchema)], 
            usersController.updateUser)
    
    .delete(validateParam(schemas.idSchema, "userId"), usersController.deleteUser);

module.exports = router;

// router.get  ===>
//             =====> router.route('/) .get() .post()
// router.post ===>
