import Cors from 'cors'
import Admin from '../../models/admin'
import Token from '../../models/token'

import { createAccessToken, createRefreshToken } from '../../utils/token'
import dbConnect from '../../utils/connectDB'

import bcrypt from 'bcrypt'

const cors = Cors({
  methods: ['POST'],
})

const corsMiddleware = async (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      } else {
        return resolve(result)
      }
    })
  })
}

const handler = async (req, res) => {
  try {
    await dbConnect()
    await corsMiddleware(req, res, cors)
  } catch (err) {
    res
      .status(500)
      .json({ message: "Can't connect to the database or setting the cors" })
  }

  if (req.method === 'POST') {
    try {
      const email = req.body.email
      const password = req.body.password

      const admin = await Admin.findOne({ email })
      const checkAccessToken = await Token.findOne({ email })

      if (checkAccessToken) {
        await Token.findByIdAndDelete(checkAccessToken._id)
      }

      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        throw new Error('Email or password are incorrect ')
      }

      const accessToken = await createAccessToken(admin.email, admin.name)
      const refreshToken = await createRefreshToken(admin.email, admin.name)

      res.status(200).json({
        message: 'User login successfully',
        tokens: {
          accessToken,
          refreshToken,
        },
      })
    } catch (err) {
      res.status(401).json({ error: err.message })
    }
  } else {
    res.status(205).json({ message: 'Method not valid' })
  }
}

export default handler
