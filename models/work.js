import mongoose from 'mongoose'
const Schema = mongoose.Schema

const work = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  tech: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
})

mongoose.models = {}

const Work = mongoose.model('Work', work)

export default Work
