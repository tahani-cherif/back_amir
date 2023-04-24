const sessionElevemodel=require('../models/sessionEleveModel')
const usermodel=require('../models/userModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all sessionEleve
// @route   GET api/sessionEleves/
// @access  Private
exports.getsessionEleves=asyncHandler(async(req,res) => {
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;
    const sessionEleves = await sessionElevemodel.find({}).skip(skip).limit(limit);
    res.status(200).json({results:sessionEleves.length,page,data:sessionEleves})
  });

// @desc    Get specific sessionEleve by id eleve
// @route   GET api/sessionEleve/:id
// @access  Private
exports.getsessionEleve = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const sessionEleves = await sessionElevemodel.find({id_eleve:id});
  if(!sessionEleves || sessionEleves!=[])
  {
    return   next(new ApiError(`sessionEleve not found for this id ${id}`,404)); 
}
  res.status(200).json({data: sessionEleves});
})


// @desc    Create a new sessionEleve
// @route   POST api/sessionEleves/
// @access  Private
exports.createsessionEleve=asyncHandler(async(req,res)=>{
    const body=req.body
    const users = await usermodel.findById(body.id_eleve);
    if(!users)
    {
      return   next(new ApiError(`eleve not found for this id ${body.id_eleve}`,404)); 
    }
    const sessionEleves=await sessionElevemodel.create({
      id_eleve:body.id_eleve,
      full_name:users.first_name+" "+users.last_name,
      id_cour_terminer:body.id_cour_terminer,
      id_cour_commencer:body.id_cour_commencer,
      quizz_terminer:body.quizz_terminer
    })
     res.status(201).json({data:sessionEleves})
   
});

// @desc    update specified sessionEleve
// @route   PUT api/sessionEleves/:id
// @access  Private
exports.updatesessionEleve =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const sessionEleves = await sessionElevemodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!sessionEleves)
    {
      return   next(new ApiError(`sessionEleveues not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: sessionEleves});  
})


// @desc    delete specified sessionEleve
// @route   DELETE api/sessionEleves/:id
// @access  Private
exports.deletesessionEleve =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const sessionEleves=await sessionElevemodel.findByIdAndDelete(id);
   if(!sessionEleves)
    {
      return   next(new ApiError(`sessionEleveue not found for this id ${id}`,404)); 
    }
  res.status(204).send();  
});
