const express=require('express')
const {getchapitreValidator,
      updatechapitreValidator,
      deletechapitreValidator,
      createchapitreValidator
       }=require('../utils/validators/chapitreValidator');


const {getchapitres,
       createchapitre,
        getchapitre,
        updatechapitre,
        deletechapitre,
    }=require('../services/chapitreService');

//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});

const lecons =require('./leconRoutes');

router.use('/:chapitreid/lecons',lecons);

router.route('/').get(getchapitres)
                 .post(createchapitreValidator,createchapitre);

router.route('/:id').get(getchapitreValidator,getchapitre)
                    .put(updatechapitreValidator,updatechapitre)
                    .delete(deletechapitreValidator,deletechapitre);
module.exports = router;