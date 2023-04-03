const domainemodel=require('../models/domaineModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all domaine
// @route   GET api/domaines/
// @access  Private
exports.getdomaines=asyncHandler(async(req,res) => {
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;
    const domaines = await domainemodel.find({}).skip(skip).limit(limit);
    res.status(200).json({results:domaines.length,page,data:domaines})
  });

// @desc    Get specific domaine by id
// @route   GET api/domaine/:id
// @access  Private
exports.getdomaine = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const domaines = await domainemodel.findById(id);
  if(!domaines)
  {
    return   next(new ApiError(`domaine not found for this id ${id}`,404)); 
}
  res.status(200).json({data: domaines});
})


// @desc    Create a new domaine
// @route   POST api/domaines/
// @access  Private
exports.createdomaine=asyncHandler(async(req,res)=>{
    const body=req.body
    const domaines=await domainemodel.create(body)
     res.status(201).json({data:domaines})
   
});

// @desc    update specified domaine
// @route   PUT api/domaines/:id
// @access  Private
exports.updatedomaine =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const domaines = await domainemodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!domaines)
    {
      return   next(new ApiError(`domaines not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: domaines});  
})


// @desc    delete specified domaine
// @route   DELETE api/domaines/:id
// @access  Private
exports.deletedomaine =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const domaines=await domainemodel.findByIdAndDelete(id);
   if(!domaines)
    {
      return   next(new ApiError(`domaine not found for this id ${id}`,404)); 
    }
  res.status(204).send();  
});
