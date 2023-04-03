const courmodel=require('../models/courModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all cour
// @route   GET api/cours/
// @access  Private
exports.getcours=asyncHandler(async(req,res) => {
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;
    const cours = await courmodel.find({}).skip(skip).limit(limit);
    res.status(200).json({results:cours.length,page,data:cours})
  });

// @desc    Get specific cour by id
// @route   GET api/cour/:id
// @access  Private
exports.getcour = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const cours = await courmodel.findById(id);
  if(!cours)
  {
    return   next(new ApiError(`cour not found for this id ${id}`,404)); 
}
  res.status(200).json({data: cours});
})


// @desc    Create a new cour
// @route   POST api/cours/
// @access  Private
exports.createcour=asyncHandler(async(req,res)=>{
    const body=req.body
    const cours=await courmodel.create(body)
     res.status(201).json({data:cours})
   
});

// @desc    update specified cour
// @route   PUT api/cours/:id
// @access  Private
exports.updatecour =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const cours = await courmodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!cours)
    {
      return   next(new ApiError(`cours not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: cours});  
})


// @desc    delete specified cour
// @route   DELETE api/cours/:id
// @access  Private
exports.deletecour =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const cours=await courmodel.findByIdAndDelete(id);
   if(!cours)
    {
      return   next(new ApiError(`cour not found for this id ${id}`,404)); 
    }
  res.status(204).send();  
});