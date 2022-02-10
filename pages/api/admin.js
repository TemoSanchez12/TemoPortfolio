import Admin from '../../models/admin'
import bcrypt from 'bcrypt'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const name = req.body.name
      const email = req.body.email
      const password = req.body.password

      const hashedPassword = await bcrypt.hash(password, 12)

      const admin = new Admin({
        name,
        email,
        password: hashedPassword,
      })

      const response = await admin.save()

      res.status(201).json({ message: 'Admin created successfully', response })
    } catch (err) {
      res.status(418).json({
        message: 'Something went wrong whent trying to create admin',
        error: err,
      })
    }
  }
}

export default handler
