import mongoose from 'mongoose';

const PostMessage = mongoose.Schema({
  title: String, 
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('PostMessage', PostMessage);
