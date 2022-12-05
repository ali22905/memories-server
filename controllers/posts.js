import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose'


export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find()

    res.status(200).json(postMessage)
  } catch (error) {
    res.status(404).json({message: `myError  =>  ${error.message}`});
  }
}
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post)
  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({message: `myError  status: 409  => ${error.message}`})
  }
}

export const updatePost = async (req, res) => {
  const {id: _id} = req.params;
  const post = req.body;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with this id') 
  const newPost = await PostMessage.findOneAndUpdate(_id, {...post, _id}, {new: true})
  res.json(newPost)
}


export const deletePost = async (req, res) => {
  // get prop id from the obj req.params
  const id = req.params.id

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this id') 

  await PostMessage.findByIdAndRemove(id);

  res.json({message: "post deleted successfully"})

}


export const likePost = async (req, res) => {
  const id = req.params.id

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this id') 

  const  post = await PostMessage.findById(id);
  const newPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true})
  
  res.json(newPost)
}


