const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const leconsmodel=require('../../models/leconModel.js')

exports.getvideoValidator=[
    check('id').isMongoId().withMessage('Invalid video id format'),
    validatorMiddleware,
];

exports.createvideoValidator=[
    check('number').notEmpty().withMessage('number required')
                   .isNumeric().withMessage('must be a number'),
    check('time').notEmpty().withMessage('time required')
                   .isNumeric().withMessage('must be a number'),
    check('url').notEmpty().withMessage('name required'),
    check('id_lecons').notEmpty().withMessage('id_lecons required')
                         .isMongoId().withMessage('Invalid lecons id ')
                         .custom((leconsId) =>
                                leconsmodel.findById(leconsId).then((lecons) => {
                                   if (!lecons) {
                                     return Promise.reject(
                                       new Error(`No lecons for this id: ${leconsId}`)
                                     );
                                   }
                                 })
                               ),

    validatorMiddleware,
];

exports.updatevideoValidator=[
    check('id').isMongoId().withMessage('Invalid video id format'),
    validatorMiddleware,
];

exports.deletevideoValidator=[
    check('id').isMongoId().withMessage('Invalid video id format'),
    validatorMiddleware,
];
