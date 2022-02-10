import jwt from 'jsonwebtoken'
import Token from '../models/token'

export const createRefreshToken = async (email, name) => {
  const refreshToken = await jwt.sign(
    {
      email: email,
      name: name,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: '20m' }
  )

  return refreshToken
}

export const createAccessToken = async (email, name) => {
  const accessToken = await jwt.sign(
    {
      email: email,
      name: name,
    },
    process.env.JWT_ACCESS_KEY
  )

  const token = new Token({
    email: email,
    token: accessToken,
  })

  await token.save()

  return accessToken
}

export const verifyAccessToken = async (accessToken) => {
  const userInfo = await jwt.verify(accessToken, process.env.JWT_ACCESS_KEY)
  const dataBaseToken = await Token.findOne({ email: userInfo.email })

  // Validate that the token saved on the database exist and is the same
  if (!dataBaseToken || accessToken !== dataBaseToken.token) {
    throw new Error('Access token is not valid')
  }

  return dataBaseToken
}

export const verifyRefreshToken = async (refreshToken) => {
  // Verify refresh token
  const refreshTokenInfo = await jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_KEY
  )

  if (!refreshTokenInfo) {
    throw new Error('Invalid refresh token')
  }

  const newAccessToken = await createAccessToken(
    refreshTokenInfo.email,
    refreshTokenInfo.name
  )

  return newAccessToken
}

export const verifyTokens = async (req) => {
  // Get access token and refresh token
  const accessToken = req.headers['access-token'].split(' ')[1]
  const refreshToken = req.headers['refresh-token'].split(' ')[1]

  // verify tokens
  const oldAccessToken = await verifyAccessToken(accessToken)
  await oldAccessToken.remove()
  const newAccessToken = await verifyRefreshToken(refreshToken)
  return newAccessToken
}
