import mongoose from 'mongoose'
const Schema = mongoose.Schema

const admin = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

mongoose.models = {}

const Admin = mongoose.model('Admin', admin)

export default Admin
