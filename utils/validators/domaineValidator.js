const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');

exports.getdomaineValidator=[
    check('id').isMongoId().withMessage('Invalid domaine id format'),
    validatorMiddleware,
];

exports.createdomaineValidator=[
    check('name_domain').notEmpty().withMessage('name_domain required'),
    check('certificate').notEmpty().withMessage('certificate required'),
                   
    validatorMiddleware,
];

exports.updatedomaineValidator=[
    check('id').isMongoId().withMessage('Invalid domaine id format'),
    validatorMiddleware,
];

exports.deletedomaineValidator=[
    check('id').isMongoId().withMessage('Invalid domaine id format'),
    validatorMiddleware,
];
