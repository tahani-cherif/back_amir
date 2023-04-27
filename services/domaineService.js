const domainemodel=require('../models/domaineModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all domaine
// @route   GET api/domaines/
// @access  Private
exports.getdomaines=asyncHandler(async(req,res) => {
  console.log(req.params)
  let filter = {};
  if (req.filterObj) {
    filter = req.filterObj;
  }
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;
    const domaines = await domainemodel.find(filter) ;
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
exports.setCatalogueIdToBody=(req,res,next) => {
  if(!req.body.catalogue) req.body.catalogue = req.params.id_catalogue;
next();
}
exports.createFilterObj=(req,res,next) => {
  let filterObject={};
  if(req.params.id_catalogue) filterObject ={id_catalogue:req.params.id_catalogue};
  req.filterObj =filterObject;
next();
}


// @desc    Create a new domaine
// @route   POST api/domaines/
// @access  Private
exports.createdomaine=asyncHandler(async(req,res)=>{
    const body=req.body
    const domaines=await domainemodel.create({
      name_domain:body.name_domain,
      certificate:body.certificate,
      id_catalogue:body.id_catalogue,
      image:req.files['image'][0].path,
      icon:body.icon,
    })
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
   const domaines=await domainemodel.findById(id);
   if(!domaines)
    {
      return   next(new ApiError(`domaine not found for this id ${id}`,404)); 
    }
    const deletes=await domainemodel.deleteOne({_id:id});
  res.status(204).send();  
});
