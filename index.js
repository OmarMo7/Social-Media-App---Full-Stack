import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇️ "/home/john/Desktop/javascript"
dotenv.config({ path: '.env' })
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
// app.use(express.static(path.join(__dirname, 'client', 'build')));
// app.use('/api/posts', postRoutes)
// app.use('/api/user', userRoutes)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });




const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 8000

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => { console.log(`app is listening on port ${PORT}`) }))
  .catch((err) => { console.log(`CONNECTION ERROR ${err}`) })