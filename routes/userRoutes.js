const express=require('express')
const {getuserValidator,
      updateuserValidator,
      deleteuserValidator,
      createuserValidator,
      changeuserpasswordvalidate
       }=require('../utils/validators/userValidator');


const {getusers,
       createuser,
        getuser,
        updateuser,
        deleteuser,
        changeuserpassword
    }=require('../services/userService');


const router=express.Router();

router.put('/changepassword/:id',changeuserpasswordvalidate,changeuserpassword);

router.route('/').get(getusers)
                 .post(createuserValidator,createuser);

router.route('/:id').get(getuserValidator,getuser)
                    .put(updateuserValidator,updateuser)
                    .delete(deleteuserValidator,deleteuser);
module.exports = router;