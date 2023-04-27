const chapitremodel=require('../models/chapitreModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all chapitre
// @route   GET api/chapitres/
// @access  Private
exports.createFilterObj=(req,res,next) => {

  let filterObject={};
  if(req.params.id_cour) filterObject ={id_cour:req.params.id_cour};
  req.filterObj =filterObject;
next();
}

exports.getchapitres=asyncHandler(async(req,res) => {
  console.log(req.params)
  let filter = {};
  if (req.filterObj) {
    filter = req.filterObj;
  }
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;
    const chapitres = await chapitremodel.find(filter).skip(skip).limit(limit);
    res.status(200).json({results:chapitres.length,page,data:chapitres})
  });
 
// @desc    Get specific chapitre by id
// @route   GET api/chapitre/:id
// @access  Private
exports.getchapitre = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const chapitres = await chapitremodel.findById(id);
  if(!chapitres)
  {
    return   next(new ApiError(`chapitre not found for this id ${id}`,404)); 
}
  res.status(200).json({data: chapitres});
})


// @desc    Create a new chapitre
// @route   POST api/chapitres/
// @access  Private
exports.createchapitre=asyncHandler(async(req,res)=>{
    const body=req.body
    const chapitres=await chapitremodel.create(body)
     res.status(201).json({data:chapitres})
   
});

// @desc    update specified chapitre
// @route   PUT api/chapitres/:id
// @access  Private
exports.updatechapitre =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const chapitres = await chapitremodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!chapitres)
    {
      return   next(new ApiError(`chapitres not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: chapitres});  
})


// @desc    delete specified chapitre
// @route   DELETE api/chapitres/:id
// @access  Private
exports.deletechapitre =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const chapitres = await chapitremodel.findById(id);
   if(!chapitres)
    {
      return   next(new ApiError(`chapitre not found for this id ${id}`,404)); 
    }
    const deletes=await chapitremodel.deleteOne({_id:id});
  res.status(204).send();  
});
