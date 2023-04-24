const express=require('express')
const {getsessionEleveValidator,
      updatesessionEleveValidator,
      deletesessionEleveValidator,
      createsessionEleveValidator
       }=require('../utils/validators/sessionEleveValidator');


const {getsessionEleves,
       createsessionEleve,
        getsessionEleve,
        updatesessionEleve,
        deletesessionEleve,
    }=require('../services/sessionEleveService');
const domaine =require('./domaineRoutes');
const router=express.Router();

router.use('/:sessionEleveid/domaines',domaine);
router.route('/').get(getsessionEleves)
                 .post(createsessionEleveValidator,createsessionEleve);

router.route('/:id').get(getsessionEleveValidator,getsessionEleve)
                    .put(updatesessionEleveValidator,updatesessionEleve)
                    .delete(deletesessionEleveValidator,deletesessionEleve);
module.exports = router;