const express=require('express')
const {getcourValidator,
      updatecourValidator,
      deletecourValidator,
      createcourValidator
       }=require('../utils/validators/courValidator');


const {getcours,
       createcour,
        getcour,
        updatecour,
        deletecour,
    }=require('../services/courService');

//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});
 const chapitre =require('./chapitreRoutes');

router.use('/:courid/chapitres',chapitre);

router.route('/').get(getcours)
                 .post(createcourValidator,createcour);

router.route('/:id').get(getcourValidator,getcour)
                    .put(updatecourValidator,updatecour)
                    .delete(deletecourValidator,deletecour);
module.exports = router;