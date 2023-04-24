const express=require('express')
const {getquizzValidator,
      updatequizzValidator,
      deletequizzValidator,
      createquizzValidator
       }=require('../utils/validators/quizzValidator');


const {getquizzs,
       createquizz,
        getquizz,
        updatequizz,
        deletequizz,
    }=require('../services/quizzService');
const domaine =require('./domaineRoutes');
const router=express.Router();

router.use('/:quizzid/domaines',domaine);
router.route('/').get(getquizzs)
                 .post(createquizzValidator,createquizz);

router.route('/:id').get(getquizzValidator,getquizz)
                    .put(updatequizzValidator,updatequizz)
                    .delete(deletequizzValidator,deletequizz);
module.exports = router;