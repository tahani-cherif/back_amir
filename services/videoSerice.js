const videomodel=require('../models/videoModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all video
// @route   GET api/videos/
// @access  Private
exports.getvideos=asyncHandler(async(req,res) => {
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;
    const videos = await videomodel.find({}).skip(skip).limit(limit);
    res.status(200).json({results:videos.length,page,data:videos})
  });

// @desc    Get specific video by id
// @route   GET api/video/:id
// @access  Private
exports.getvideo = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const videos = await videomodel.findById(id);
  if(!videos)
  {
    return   next(new ApiError(`video not found for this id ${id}`,404)); 
}
  res.status(200).json({data: videos});
})


// @desc    Create a new video
// @route   POST api/videos/
// @access  Private
exports.createvideo=asyncHandler(async(req,res)=>{
    const body=req.body
    const videos=await videomodel.create(body)
     res.status(201).json({data:videos})
   
});

// @desc    update specified video
// @route   PUT api/videos/:id
// @access  Private
exports.updatevideo =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const videos = await videomodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!videos)
    {
      return   next(new ApiError(`videos not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: videos});  
})


// @desc    delete specified video
// @route   DELETE api/videos/:id
// @access  Private
exports.deletevideo =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const videos=await videomodel.findByIdAndDelete(id);
   if(!videos)
    {
      return   next(new ApiError(`video not found for this id ${id}`,404)); 
    }
  res.status(204).send();  
});
