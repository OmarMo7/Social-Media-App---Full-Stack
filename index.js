import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import postRoutes from './server/routes/posts.js'
import userRoutes from './server/routes/user.js'

const app = express()

dotenv.config({ path: './server/.env' })
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.get('/', (req, res) => {
  res.send("APP IS RUNNING")
})
app.use('/posts', postRoutes)
app.use('/user', userRoutes)
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 8000

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => { console.log(`app is listening on port ${PORT}`) }))
  .catch((err) => { console.log(`CONNECTION ERROR ${err}`) })
