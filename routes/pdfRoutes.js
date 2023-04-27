const express=require('express')
const {getpdfValidator,
      updatepdfValidator,
      deletepdfValidator,
      createpdfValidator
       }=require('../utils/validators/pdfValidator');


const {getpdfs,
       createpdf,
        getpdf,
        updatepdf,
        deletepdf,
    }=require('../services/pdfSerice');
const {upload}=require('../middlewares/imageMiddmeware')

//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});

router.route('/').get(getpdfs)
                 .post(upload('./pdf').single('file'),createpdfValidator,createpdf);

router.route('/:id').get(getpdfValidator,getpdf)
                    .put(updatepdfValidator,updatepdf)
                    .delete(deletepdfValidator,deletepdf);
module.exports = router;