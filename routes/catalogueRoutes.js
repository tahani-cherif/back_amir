const express=require('express')
const {getcatalogueValidator,
      updatecatalogueValidator,
      deletecatalogueValidator,
      createcatalogueValidator
       }=require('../utils/validators/catalogueValidator');


const {getcatalogues,
       createcatalogue,
        getcatalogue,
        updatecatalogue,
        deletecatalogue,
    }=require('../services/catalogueService');
const {upload}=require('../middlewares/imageMiddmeware')
const domaine =require('./domaineRoutes');
const router=express.Router();

router.use('/:id_catalogue/domaines',domaine);
router.route('/').get(getcatalogues)
                 .post(upload('./image/catalogue').single('image'),createcatalogueValidator,createcatalogue);

router.route('/:id').get(getcatalogueValidator,getcatalogue)
                    .put(updatecatalogueValidator,updatecatalogue)
                    .delete(deletecatalogueValidator,deletecatalogue);
module.exports = router;