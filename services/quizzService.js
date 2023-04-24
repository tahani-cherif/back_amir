const quizzmodel=require('../models/quizzModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all quizz
// @route   GET api/quizzs/
// @access  Private
exports.getquizzs=asyncHandler(async(req,res) => {
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;
    const quizzs = await quizzmodel.find({}).skip(skip).limit(limit);
    res.status(200).json({results:quizzs.length,page,data:quizzs})
  });

// @desc    Get specific quizz by id
// @route   GET api/quizz/:id
// @access  Private
exports.getquizz = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const quizzs = await quizzmodel.findById(id);
  if(!quizzs)
  {
    return   next(new ApiError(`quizz not found for this id ${id}`,404)); 
}
  res.status(200).json({data: quizzs});
})


// @desc    Create a new quizz
// @route   POST api/quizzs/
// @access  Private
exports.createquizz=asyncHandler(async(req,res)=>{
    const body=req.body
    const quizzs=await quizzmodel.create(body)
     res.status(201).json({data:quizzs})
   
});

// @desc    update specified quizz
// @route   PUT api/quizzs/:id
// @access  Private
exports.updatequizz =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const quizzs = await quizzmodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!quizzs)
    {
      return   next(new ApiError(`quizzues not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: quizzs});  
})


// @desc    delete specified quizz
// @route   DELETE api/quizzs/:id
// @access  Private
exports.deletequizz =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const quizzs=await quizzmodel.findByIdAndDelete(id);
   if(!quizzs)
    {
      return   next(new ApiError(`quizzue not found for this id ${id}`,404)); 
    }
  res.status(204).send();  
});
