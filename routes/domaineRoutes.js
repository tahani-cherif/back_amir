const express=require('express')
const {getdomaineValidator,
      updatedomaineValidator,
      deletedomaineValidator,
      createdomaineValidator
       }=require('../utils/validators/domaineValidator');


const {getdomaines,
       createdomaine,
        getdomaine,
        updatedomaine,
        deletedomaine,
    }=require('../services/domaineService');

const cour =require('./courRoutes');
const {upload}=require('../middlewares/imageMiddmeware')

//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});


router.use('/:domainesid/cours',cour);

router.route('/').get(getdomaines)
                 .post(upload('./image/domaine').fields([
                     { name: 'image', maxCount: 1 },
                     { name: 'icon', maxCount: 1 }
                 ]),createdomaineValidator,createdomaine);

router.route('/:id').get(getdomaineValidator,getdomaine)
                    .put(updatedomaineValidator,updatedomaine)
                    .delete(deletedomaineValidator,deletedomaine);
module.exports = router;