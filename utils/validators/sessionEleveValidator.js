const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const sessionElevemodel=require('../../models/userModel');
const courmodel=require('../../models/courModel');
const quizzmodel=require('../../models/quizzModel.js');

exports.getsessionEleveValidator=[
    check('id').isMongoId().withMessage('Invalid user id format'),                                 
    validatorMiddleware,
];

exports.createsessionEleveValidator=[
    check('id_eleve').isMongoId().withMessage('Invalid user id format')
                     .custom((id_eleve) =>
                      sessionElevemodel.findById(id_eleve).then((eleve) => {
                      if (!eleve) {
                        return Promise.reject(
                        new Error(`No eleve for this id: ${id_eleve}`)
                        );
                       }
                      if(eleve.role!='eleve')
                        {
                        return Promise.reject(
                            new Error(`user not eleve with  id: ${id_eleve}`)
                            );
                        }
                      })
                      ),
    check('id_cour_terminer') .custom((id_cour) =>
               courmodel.find({ _id: { $exists: true, $in: id_cour } }).then(
                       (result) => {
                       if (result.length !== id_cour.length) {
                           return Promise.reject(new Error(`Invalid cour ids`));
                       }
                       }
                   )
                   ),
    check('id_cour_commencer') .custom((id_cour) =>
               courmodel.find({ _id: { $exists: true, $in: id_cour } }).then(
                       (result) => {
                       if ( result.length !== id_cour.length) {
                           return Promise.reject(new Error(`Invalid cour ids`));
                       }
                       }
                   )
                   ),
    // check('quizz_terminer').custom((quezzIds)=>{
    //          let id=[];
    //          console.log(quezzIds);
    //          quezzIds.map(item=>id.push(item.id_quizz));
    //          console.log(id)
    //     //      quizzmodel.find({ _id: { $exists: true, $in: id } }).then(
    //     //        (result) => {
    //     //         console.log(result)
    //     //        if (result.length !== id.length) {
    //     //            return Promise.reject(new Error(`Invalid quizz ids`));
    //     //        }
    //     //        }
    //     //    )
    //     quizzmodel.findById(id[0]).then(
    //                (result) => {
    //                 console.log(result)
    //                if (!result) {
    //                    return Promise.reject(new Error(`Invalid quizz ids`));
    //                }
    //                }
    //            )
    //        }), 
    validatorMiddleware,
];

exports.updatesessionEleveValidator=[
    check('id').isMongoId().withMessage('Invalid sessionEleve id format'),
    validatorMiddleware,
];

exports.deletesessionEleveValidator=[
    check('id').isMongoId().withMessage('Invalid sessionEleve id format'),
    validatorMiddleware,
];
