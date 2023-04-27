const leconsmodel=require('../models/leconModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all lecons
// @route   GET api/lecons/
// @access  Private
exports.getleconss=asyncHandler(async(req,res) => {
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;
    const leconss = await leconsmodel.find({})
    console.log()
    res.status(200).json({results:leconss.length,page,data:leconss})
  });

// @desc    Get specific lecons by id
// @route   GET api/lecons/:id
// @access  Private
exports.getlecons = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const leconss = await leconsmodel.findById(id);
  if(!leconss)
  {
    return   next(new ApiError(`lecons not found for this id ${id}`,404)); 
}
  res.status(200).json({data: leconss});
})


// @desc    Create a new lecons
// @route   POST api/lecons/
// @access  Private
exports.createlecons=asyncHandler(async(req,res)=>{
    const body=req.body
    const leconss=await leconsmodel.create(body)
     res.status(201).json({data:leconss})
   
});

// @desc    update specified lecons
// @route   PUT api/lecons/:id
// @access  Private
exports.updatelecons =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const leconss = await leconsmodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!leconss)
    {
      return   next(new ApiError(`leconss not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: leconss});  
})


// @desc    delete specified lecons
// @route   DELETE api/lecons/:id
// @access  Private
exports.deletelecons =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const leconss=await leconsmodel.findById(id);
  
   if(!leconss)
    {
      return   next(new ApiError(`lecons not found for this id ${id}`,404)); 
    }
     await leconsmodel.deleteOne({_id:id})
  res.status(204).send();  
});
