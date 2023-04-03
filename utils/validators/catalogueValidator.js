const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');

exports.getcatalogueValidator=[
    check('id').isMongoId().withMessage('Invalid catalogue id format'),
    validatorMiddleware,
];

exports.createcatalogueValidator=[
    check('name_catalogue').notEmpty().withMessage('name_catalogue required'),
    check('college_year').notEmpty().withMessage('college_year required'),
    validatorMiddleware,
];

exports.updatecatalogueValidator=[
    check('id').isMongoId().withMessage('Invalid catalogue id format'),
    validatorMiddleware,
];

exports.deletecatalogueValidator=[
    check('id').isMongoId().withMessage('Invalid catalogue id format'),
    validatorMiddleware,
];
