const express=require('express')
const {getuserValidator,
      updateuserValidator,
      deleteuserValidator,
      createuserValidator,
      changeuserpasswordvalidate,
      forgetuserpasswordvalidate
       }=require('../utils/validators/userValidator');


const {getusers,
       createuser,
        getuser,
        updateuser,
        deleteuser,
        changeuserpassword,
        passwordrecovery
    }=require('../services/userService');


const router=express.Router();

router.put('/changepassword/:id',changeuserpasswordvalidate,changeuserpassword);

router.route('/').get(getusers)
                 .post(createuserValidator,createuser)
                 .put(forgetuserpasswordvalidate,passwordrecovery);

router.route('/:id').get(getuserValidator,getuser)
                    .put(updateuserValidator,updateuser)
                    .delete(deleteuserValidator,deleteuser);

module.exports = router;