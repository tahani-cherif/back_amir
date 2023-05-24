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
        createFilterObj
    }=require('../services/leconService');

//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});

const video =require('./videoRoutes');

router.use('/:id_lecons/videos',video);
const pdf =require('./pdfRoutes');

router.use('/:id_lecons/pdf',pdf);

router.route('/').get(createFilterObj,getleconss)
                 .post(createleconsValidator,createlecons);

router.route('/:id').get(getleconsValidator,getlecons)
                    .put(updateleconsValidator,updatelecons)
                    .delete(deleteleconsValidator,deletelecons);
module.exports = router;