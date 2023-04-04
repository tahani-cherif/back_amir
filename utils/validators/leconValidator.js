const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const chapitremodel=require('../../models/chapitreModel.js')

exports.getleconsValidator=[
    check('id').isMongoId().withMessage('Invalid lecons id format'),
    validatorMiddleware,
];

exports.createleconsValidator=[
    check('number').notEmpty().withMessage('number required')
                   .isNumeric().withMessage('must be a number'),
    check('name').notEmpty().withMessage('name required'),
    check('description').notEmpty().withMessage('description required'),
    check('id_chapitre').notEmpty().withMessage('id_chapitre required')
                         .isMongoId().withMessage('Invalid chapitre id ')
                         .custom((chapitreId) =>
                                chapitremodel.findById(chapitreId).then((chapitre) => {
                                   if (!chapitre) {
                                     return Promise.reject(
                                       new Error(`No chapitre for this id: ${chapitreId}`)
                                     );
                                   }
                                 })
                               ),

    validatorMiddleware,
];

exports.updateleconsValidator=[
    check('id').isMongoId().withMessage('Invalid lecons id format'),
    validatorMiddleware,
];

exports.deleteleconsValidator=[
    check('id').isMongoId().withMessage('Invalid lecons id format'),
    validatorMiddleware,
];
