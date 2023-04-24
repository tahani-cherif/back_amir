const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');

exports.getquizzValidator=[
    check('id').isMongoId().withMessage('Invalid catalogue id format'),
    validatorMiddleware,
];

exports.createquizzValidator=[
    check('question').notEmpty().withMessage('question required'),
    check('id_cour').notEmpty().withMessage('id_cour required'),
    validatorMiddleware,
];

exports.updatequizzValidator=[
    check('id').isMongoId().withMessage('Invalid quizz id format'),
    validatorMiddleware,
];

exports.deletequizzValidator=[
    check('id').isMongoId().withMessage('Invalid quizz id format'),
    validatorMiddleware,
];
