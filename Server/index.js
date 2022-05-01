import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import postRoutes from './routes/posts.js'

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('posts', postRoutes)
const CONNECTION_URL = 'mongodb+srv://OmarMostafa:ooooooo7@cluster0.ebavy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 8000

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => { console.log(`app is listening on port ${PORT}`) }))
  .catch((err) => { console.log(`CONNECTION ERROR ${err}`) })
