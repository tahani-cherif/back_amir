const cataloguemodel=require('../models/catalogueModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all catalogue
// @route   GET api/catalogues/
// @access  Private
exports.getcatalogues=asyncHandler(async(req,res) => {
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;
    const catalogues = await cataloguemodel.find({}).skip(skip).limit(limit);
    res.status(200).json({results:catalogues.length,page,data:catalogues})
  });

// @desc    Get specific catalogue by id
// @route   GET api/catalogue/:id
// @access  Private
exports.getcatalogue = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const catalogues = await cataloguemodel.findById(id);
  if(!catalogues)
  {
    return   next(new ApiError(`catalogue not found for this id ${id}`,404)); 
}
  res.status(200).json({data: catalogues});
})


// @desc    Create a new catalogue
// @route   POST api/catalogues/
// @access  Private
exports.createcatalogue=asyncHandler(async(req,res)=>{
    const body=req.body
    const catalogues=await cataloguemodel.create(body)
     res.status(201).json({data:catalogues})
   
});

// @desc    update specified catalogue
// @route   PUT api/catalogues/:id
// @access  Private
exports.updatecatalogue =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const catalogues = await cataloguemodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!catalogues)
    {
      return   next(new ApiError(`catalogues not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: catalogues});  
})


// @desc    delete specified catalogue
// @route   DELETE api/catalogues/:id
// @access  Private
exports.deletecatalogue =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const catalogues=await cataloguemodel.findByIdAndDelete(id);
   if(!catalogues)
    {
      return   next(new ApiError(`catalogue not found for this id ${id}`,404)); 
    }
  res.status(204).send();  
});