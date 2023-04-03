const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const cataloguemodel=require('../../models/catalogueModel.js')

exports.getdomaineValidator=[
    check('id').isMongoId().withMessage('Invalid domaine id format'),
    validatorMiddleware,
];

exports.createdomaineValidator=[
    check('name_domain').notEmpty().withMessage('name_domain required'),
    check('certificate').notEmpty().withMessage('certificate required'),
    check('id_catalogue').notEmpty().withMessage('id_catalogue required')
                         .isMongoId().withMessage('Invalid category id ')
                         .custom((catalogueId) =>
                                cataloguemodel.findById(catalogueId).then((catalogue) => {
                                   if (!catalogue) {
                                     return Promise.reject(
                                       new Error(`No catalogue for this id: ${catalogueId}`)
                                     );
                                   }
                                 })
                               ),
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
