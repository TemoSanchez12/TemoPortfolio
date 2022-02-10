import mongoose from 'mongoose'
const Schema = mongoose.Schema

const token = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
})

mongoose.models = {}

const Token = mongoose.model('Token', token)

export default Token
