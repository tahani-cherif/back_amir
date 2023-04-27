const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const leconsmodel=require('../../models/leconModel.js')

exports.getpdfValidator=[
    check('id').isMongoId().withMessage('Invalid pdf id format'),
    validatorMiddleware,
];

exports.createpdfValidator=[
    check('number').notEmpty().withMessage('number required')
                   .isNumeric().withMessage('must be a number'),
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

exports.updatepdfValidator=[
    check('id').isMongoId().withMessage('Invalid pdf id format'),
    validatorMiddleware,
];

exports.deletepdfValidator=[
    check('id').isMongoId().withMessage('Invalid pdf id format'),
    validatorMiddleware,
];
