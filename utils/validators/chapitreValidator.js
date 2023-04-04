const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const courmodel=require('../../models/courModel.js')

exports.getchapitreValidator=[
    check('id').isMongoId().withMessage('Invalid chapitre id format'),
    validatorMiddleware,
];

exports.createchapitreValidator=[
    check('number').notEmpty().withMessage('number required')
                   .isNumeric().withMessage('must be a number'),
    check('title').notEmpty().withMessage('title required'),
    check('contenu').notEmpty().withMessage('contenu required'),
    check('id_cour').notEmpty().withMessage('id_cour required')
                         .isMongoId().withMessage('Invalid cour id ')
                         .custom((courId) =>
                                courmodel.findById(courId).then((cour) => {
                                   if (!cour) {
                                     return Promise.reject(
                                       new Error(`No cour for this id: ${courId}`)
                                     );
                                   }
                                 })
                               ),
    validatorMiddleware,
];

exports.updatechapitreValidator=[
    check('id').isMongoId().withMessage('Invalid chapitre id format'),
    validatorMiddleware,
];

exports.deletechapitreValidator=[
    check('id').isMongoId().withMessage('Invalid chapitre id format'),
    validatorMiddleware,
];
