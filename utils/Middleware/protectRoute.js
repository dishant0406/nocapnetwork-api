import jwt from 'jsonwebtoken'

const protectRoute = (req, res, next) => {
  const token = req?.headers?.authorization?.split(' ')?.[1]

  if (!token) {
    return res.status(401).json({ error: 'Not authorized' })
  }
  try {
    const decodedToken = jwt.decode(token, { complete: true })
    if (decodedToken.payload.exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: 'Token Expired',
        stack: process.env.NODE_ENV === 'development' ? error.stack : {}
      })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      status: 401,
      message: 'Not authorized',
      stack: process.env.NODE_ENV === 'development' ? error.stack : {}
    })
  }
}

export default protectRoute