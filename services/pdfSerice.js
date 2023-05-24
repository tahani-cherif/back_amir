const pdfmodel=require('../models/pdfModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all pdf
// @route   GET api/pdfs/
// @access  Private
exports.getpdfs=asyncHandler(async(req,res) => {
  let filter = {};
  if (req.filterObj) {
    filter = req.filterObj;
  }
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;
    const pdfs = await pdfmodel.find(filter);
    res.status(200).json({results:pdfs.length,page,data:pdfs})
  });
  exports.createFilterObj=(req,res,next) => {
    console.log(req.params)
       let filterObject={};
       if(req.params.id_lecons) filterObject ={id_lecons:req.params.id_lecons};
       req.filterObj =filterObject;
     next();
     }

// @desc    Get specific pdf by id
// @route   GET api/pdf/:id
// @access  Private
exports.getpdf = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const pdfs = await pdfmodel.findById(id);
  if(!pdfs)
  {
    return   next(new ApiError(`pdf not found for this id ${id}`,404)); 
}
  res.status(200).json({data: pdfs});
})


// @desc    Create a new pdf
// @route   POST api/pdfs/
// @access  Private
exports.createpdf=asyncHandler(async(req,res)=>{
    const body=req.body
    const pdfs=await pdfmodel.create({
      number:body.number,
      id_lecons:body.id_lecons,
      file:req.file.path,
      title:body.title,
      sub_title:body.sub_title
    })
     res.status(201).json({data:pdfs})
   
});

// @desc    update specified pdf
// @route   PUT api/pdfs/:id
// @access  Private
exports.updatepdf =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const pdfs = await pdfmodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!pdfs)
    {
      return   next(new ApiError(`pdfs not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: pdfs});  
})


// @desc    delete specified pdf
// @route   DELETE api/pdfs/:id
// @access  Private
exports.deletepdf =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const pdfs=await pdfmodel.findByIdAndDelete(id);
   if(!pdfs)
    {
      return   next(new ApiError(`pdf not found for this id ${id}`,404)); 
    }
  res.status(204).send();  
});
