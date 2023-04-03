const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const domainemodel=require('../../models/domaineModel.js')

exports.getcourValidator=[
    check('id').isMongoId().withMessage('Invalid cour id format'),
    validatorMiddleware,
];

exports.createcourValidator=[
    check('name_cour').notEmpty().withMessage('name_cour required'),
    check('description_cour').notEmpty().withMessage('description_cour required'),
    check('id_domaine').notEmpty().withMessage('id_domaine required')
                         .isMongoId().withMessage('Invalid domaine id ')
                         .custom((domaineId) =>
                                domainemodel.findById(domaineId).then((domaine) => {
                                   if (!domaine) {
                                     return Promise.reject(
                                       new Error(`No domaine for this id: ${domaineId}`)
                                     );
                                   }
                                 })
                               ),
    validatorMiddleware,
];

exports.updatecourValidator=[
    check('id').isMongoId().withMessage('Invalid cour id format'),
    validatorMiddleware,
];

exports.deletecourValidator=[
    check('id').isMongoId().withMessage('Invalid cour id format'),
    validatorMiddleware,
];
