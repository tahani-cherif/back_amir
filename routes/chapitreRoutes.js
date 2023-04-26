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
        createFilterObj
    }=require('../services/chapitreService');

//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});

const lecons =require('./leconRoutes');

router.use('/:id_chapitre/lecons',lecons);

router.route('/').get(createFilterObj,getchapitres)
                 .post(createchapitreValidator,createchapitre);

router.route('/:id').get(getchapitreValidator,getchapitre)
                    .put(updatechapitreValidator,updatechapitre)
                    .delete(deletechapitreValidator,deletechapitre);
module.exports = router;