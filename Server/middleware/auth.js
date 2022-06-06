import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]

    const isCustomLogging = token.length < 500

    var decodedData = null

    if (token && isCustomLogging) {
      decodedData = jwt.verify(token, 'testing token')
      req.userId = decodedData?.id
    }
    else {
      decodedData = jwt.decode(token)
      req.userId = decodedData?.sub
    }

    next()
  } catch (error) {
    console.log(error)
  }
}

export default auth