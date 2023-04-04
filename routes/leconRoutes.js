const express=require('express')
const {getleconsValidator,
      updateleconsValidator,
      deleteleconsValidator,
      createleconsValidator
       }=require('../utils/validators/leconValidator');


const {getleconss,
       createlecons,
        getlecons,
        updatelecons,
        deletelecons,
    }=require('../services/leconService');

//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});

const video =require('./videoRoutes');

router.use('/:leconsid/videos',video);

router.route('/').get(getleconss)
                 .post(createleconsValidator,createlecons);

router.route('/:id').get(getleconsValidator,getlecons)
                    .put(updateleconsValidator,updatelecons)
                    .delete(deleteleconsValidator,deletelecons);
module.exports = router;