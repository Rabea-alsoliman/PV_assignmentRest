const UserModel = require('../models/user.model');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = {
    uploadImg: multer({
        storage: storage, 
        limits: {
            fileSize: 2400000
        }, 
        fileFilter: fileFilter
    }),
    index: async (req, res, next) => {
        try {
            const users = await UserModel.find({});
            //throw new Error('test error');
            res.status(200).json({users});            
        } catch(err) {
            next(err);
        }        
    },
    
    newUser: async (req, res, next) => {
        try {
            const new_user = new UserModel(req.value.body);    
            const user = await new_user.save();
            res.status(201).json(user);    
        } catch(err) {
            Object.keys(err.errors).forEach(function(key) {
                let message = err.errors[key].message;
                res.status(400).send("Validation error for " + key + message)
                });           
        }
    },         
    
    getUser: async (req, res, next) => {
        try {
            const { userId } = req.value.params;
            const user = await UserModel.findById(userId);
            res.status(200).json({user});        
        } catch(err) {
            next(err);            
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.value.params;
            const newUser = req.value.body;
            // console.log('updateUser userId is',userId);            
            // console.log('updateUser newUser is', newUser);
            const result = await UserModel.findByIdAndUpdate(userId, newUser);
            //console.log('updateUser result is', result);
            res.status(200).json({ success: true });         
        } catch(err) {
            next(err);            
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.value.params;          
            console.log('deletUser userId is',userId);            
            await UserModel.remove({_id: userId});
            res.status(200).json({ success: true });         
        } catch(err) {
            next(err);            
        }
    },
}


/*
    we can interact with mongoose in 3 different ways:
    1) callbacks 
    2) promises
    3) Async/Await (promises)
*/