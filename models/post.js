import mongoose from 'mongoose'
const Schema = mongoose.Schema

const post = new Schema({
  plataform: {
    type: String,
    required: true,
  },
  readingTime: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
})

mongoose.models = {}

const Post = mongoose.model('Post', post)

export default Post
