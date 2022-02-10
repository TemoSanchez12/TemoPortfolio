import Post from '../models/post'

export const getAllPosts = async () => {
  return await Post.find()
}

export const getFilteredPost = (filter) => {
  // code ...
}
