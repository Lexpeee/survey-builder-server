import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import surveyRoutes from './routes/survey'
import { connectToMongoDb } from '../config/db'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/v1/surveys', surveyRoutes())

app.listen(process.env.PORT, () => {
  console.log(`Server started at: ${process.env.PORT}`)
  connectToMongoDb()
})
