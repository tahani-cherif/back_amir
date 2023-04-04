const express=require('express')
const {getvideoValidator,
      updatevideoValidator,
      deletevideoValidator,
      createvideoValidator
       }=require('../utils/validators/videoValidator');


const {getvideos,
       createvideo,
        getvideo,
        updatevideo,
        deletevideo,
    }=require('../services/videoSerice');

//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});

router.route('/').get(getvideos)
                 .post(createvideoValidator,createvideo);

router.route('/:id').get(getvideoValidator,getvideo)
                    .put(updatevideoValidator,updatevideo)
                    .delete(deletevideoValidator,deletevideo);
module.exports = router;