import Post from '../../models/post'
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
      const posts = await Post.find()

      const serializablePosts = posts.map((post) => ({
        id: post._id.toString(),
        plataform: post.plataform,
        readingTime: post.readingTime,
        link: post.link,
        image: post.image,
        date: post.date,
      }))

      res.status(200).json({
        message: 'Posts fetched successfully',
        tokens: {
          newAccessToken,
        },
        data: {
          posts: serializablePosts,
        },
      })
    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong trying to fetching post',
        error: err,
      })
    }
  } else if (req.method === 'POST') {
    try {
      const newAccessToken = await verifyTokens(req)
      const plataform = req.body.plataform
      const readingTime = req.body.readingTime
      const link = req.body.link
      const image64encoded = req.body.image
      const date = req.body.date

      const uploadImageResponse = await cloudinary.uploader.upload(
        image64encoded,
        {
          upload_preset: 'post_images',
        }
      )

      const image = `${uploadImageResponse.public_id}.${uploadImageResponse.format}`

      const post = new Post({
        plataform,
        readingTime,
        link,
        image,
        date,
      })

      const response = await post.save()

      res.status(201).json({
        message: 'Post created successfully',
        tokens: {
          newAccessToken,
        },
        data: {
          post: response,
        },
      })
    } catch (err) {
      res.status(418).json({
        message: 'Somethign went from when trying to create post',
        error: err.message,
      })
    }
  } else if (req.method === 'PUT') {
    try {
      const newAccessToken = await verifyTokens(req)
      const postId = req.body.postId
      const plataform = req.body.plataform
      const readingTime = req.body.readingTime
      const link = req.body.link
      const image64encoded = req.body.image
      const date = req.body.date

      const post = await Post.findById(postId)

      if (image64encoded) {
        const uploadImageResponse = await cloudinary.uploader.upload(
          image64encoded,
          {
            upload_preset: 'post_images',
          }
        )

        post.image = `${uploadImageResponse.public_id}.${uploadImageResponse.format}`
      }

      if (date) post.date = date
      post.plataform = plataform
      post.link = link
      post.readingTime = readingTime

      const response = await post.save()

      res.status(200).json({
        message: 'Post update successfully',
        tokens: {
          newAccessToken,
        },
        data: {
          post: response,
        },
      })
    } catch (err) {
      console.log(err)
      res.status(418).json({
        message: 'Somethign went from when trying to create post',
        error: err.message,
      })
    }
  } else if (req.method === 'DELETE') {
    try {
      const newAccessToken = await verifyTokens(req)
      const postId = req.body.postId
      const response = await Post.findByIdAndDelete(postId)

      res.status(200).json({
        message: 'Post deleted correctly',
        tokens: {
          newAccessToken,
        },
        data: {
          post: response,
        },
      })
    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong trying to delete post',
        error: err.message,
      })
    }
  }
}

export default handler
