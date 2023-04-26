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
        createFilterObj
    }=require('../services/courService');

const {upload}=require('../middlewares/imageMiddmeware')

//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});
 const chapitre =require('./chapitreRoutes');

router.use('/:id_cour/chapitres',chapitre);

router.route('/').get(createFilterObj,getcours)
                 .post(upload('./image/cour').single('image'),createcourValidator,createcour);

router.route('/:id').get(getcourValidator,getcour)
                    .put(updatecourValidator,updatecour)
                    .delete(deletecourValidator,deletecour);
module.exports = router;