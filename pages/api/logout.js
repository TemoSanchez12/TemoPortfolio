import Token from '../../models/token'
import dbConnect from '../../utils/connectDB'
import jwt from 'jsonwebtoken'
import Cors from 'cors'

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
      await dbConnect()

      const accessToken = req.headers['access-token'].split(' ')[1]
      const userInfo = await jwt.verify(accessToken, process.env.JWT_ACCESS_KEY)

      await Token.findOneAndRemove({ email: userInfo.email })

      res.status(200).json({ message: 'User logout successfully' })
    } catch (err) {
      res.status(401).json({ error: err.message })
    }
  } else {
    res.status(205).json({ message: 'Method not valid' })
  }
}

export default handler
