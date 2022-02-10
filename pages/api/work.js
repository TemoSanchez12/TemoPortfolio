import Work from '../../models/work'
import Cors from 'cors'

import { verifyTokens } from '../../utils/token'
import dbConnect from '../../utils/connectDB'
import cloudinary from '../../utils/cloudinary'

const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
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

  if (req.method === 'GET') {
    try {
      const newAccessToken = await verifyTokens(req)
      const works = await Work.find()

      const serializableWorks = works.map((work) => ({
        id: work._id.toString(),
        image: work.image,
        name: work.name,
        link: work.link,
        tech: work.tech,
        description: work.description,
        date: work.date,
      }))

      res.status(200).json({
        message: 'Works fetched successfully',
        tokens: {
          newAccessToken,
        },
        data: {
          works: serializableWorks,
        },
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'Something went wrong tyying to fetching works',
        error: err,
      })
    }
  } else if (req.method === 'POST') {
    try {
      const newAccessToken = await verifyTokens(req)

      const name = req.body.name
      const image64encoded = req.body.image
      const link = req.body.link
      const tech = req.body.tech
      const description = req.body.description
      const date = new Date()

      const uploadImageResponse = await cloudinary.uploader.upload(
        image64encoded,
        {
          upload_preset: 'work_images',
        }
      )

      const image = `${uploadImageResponse.public_id}.${uploadImageResponse.format}`

      const work = new Work({
        name,
        description,
        image,
        link,
        tech,
        date,
      })

      const response = await work.save()

      res.status(201).json({
        message: 'Work save successfully',
        tokens: {
          newAccessToken,
        },
        data: {
          work: response,
        },
      })
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ message: 'Something went wrong', error: err.message })
    }
  } else if (req.method === 'PUT') {
    try {
      const newAccessToken = await verifyTokens(req)

      const workId = req.body.workId
      const name = req.body.name
      const image64encoded = req.body.image
      const link = req.body.link
      const tech = req.body.tech
      const date = req.body.date
      const description = req.body.description

      const work = await Work.findById(workId)

      if (image64encoded) {
        const uploadImageResponse = await cloudinary.uploader.upload(
          image64encoded,
          {
            upload_preset: 'work_images',
          }
        )

        work.image = `${uploadImageResponse.public_id}.${uploadImageResponse.format}`
      }
      if (date) work.date = date
      work.name = name
      work.link = link
      work.tech = tech
      work.description = description

      const response = await work.save()

      res.status(201).json({
        message: 'Work update successfully',
        tokens: {
          newAccessToken,
        },
        data: {
          work: response,
        },
      })
    } catch (err) {
      res
        .status(418)
        .json({ message: 'Something went wrong', error: err.message })
    }
  } else if (req.method === 'DELETE') {
    try {
      const newAccessToken = await verifyTokens(req)
      const workId = req.body.workId
      const response = await Work.findByIdAndDelete(workId)

      res.status(201).json({
        message: 'Success deleting the work',
        tokens: {
          newAccessToken,
        },
        data: {
          work: response,
        },
      })
    } catch (err) {
      res.status(418).json({
        message: 'Something went wrong trying to delete work',
        error: err,
      })
    }
  }
}

export default handler
