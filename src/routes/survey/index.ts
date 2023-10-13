import express from 'express'
import { createSurvey, getSurveys, getSurveysByUser, removeSurvey, updateSurvey } from './services'

const router = express.Router()

const surveyRoutes = () => {

  // SURVEY
  // -- GET /
  // GET /:surveyId
  // GET /user/:userId
  // -- POST /
  // -- PATCH /:surveyId
  // --- DELETE /:surveyId

  // QUESTIONS
  // GET /:surveyId/questions
  // POST /:surveyId/questions

  // ANSWERS
  // GET /survey/:surveyId/summary - gets summary of the survey
  // GET /survey/:surveyId/answers - gets the list of answers
  // OR
  // all in one route
  // GET /survey/:surveyId/summary - gets the answers summary and count, listing all the answers in it's separate property
  
  // POST /:surveyId/answers

  router.get('/', async (req, res) => {
    try {
      const surveys = await getSurveys()

      res.status(200).json(surveys)
      
    } catch (error) {
      throw error
    }
  })

  router.get('/user/:userId', async (req, res) => {
    try {
      const surveys = await getSurveysByUser(req.body)

      res.status(200).json(surveys)
      
    } catch (error) {
      throw error
    }
  })

  router.post('/', async (req, res) => {
    try {
      const newSurvey = await createSurvey(req.body)

      res.status(200).json(newSurvey)
      
    } catch (error) {
      throw error
    }
  })

  router.patch('/:surveyId', async (req, res) => {
    try {
      const { userId } = req.params
      
      const newSurvey = await updateSurvey(userId, req.body)

      res.status(200).json(newSurvey)
      
    } catch (error) {
      throw error
    }
  })

  router.delete('/:surveyId', async (req, res) => {
    try {
      const { surveyId } = req.params
      
      const newSurvey = await removeSurvey(surveyId)

      res.status(200).json(newSurvey)
      
    } catch (error) {
      throw error
    }
  })


  return router
}

export default surveyRoutes