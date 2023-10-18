import express from 'express'
import { createSurvey, createSurveyFields, getSurveyFields, getSurveys, getSurveysById, getSurveysByUser, removeSurvey, seedSurveys, updateSurvey } from './services'

const router = express.Router()

const surveyRoutes = () => {

  // ANSWERS
  // GET /survey/:surveyId/summary - gets summary of the survey
  // GET /survey/:surveyId/answers - gets the list of answers
  // OR
  // all in one route
  // GET /survey/:surveyId/summary - gets the answers summary and count, listing all the answers in it's separate property
  
  // POST /:surveyId/answers

  /**
   * SURVEY ROUTES
   */

  router.get('/seed', async (req, res) => {
    try {
      await seedSurveys()
      res.status(200).json({
        success: ["Created sample forms to the database"]
      })
    } catch (error) {
      throw error
    }
  })

  router.get('/', async (req, res) => {
    try {
      const surveys = await getSurveys()

      res.status(200).json(surveys)
      
    } catch (error) {
      throw error
    }
  })

  router.get('/:surveyId', async (req, res) => {
    try {
      const { surveyId } = req.params
      const survey = await getSurveysById(surveyId)
      res.status(200).json(survey)
      
    } catch (error) {
      throw error
    }
  })

  router.get('/user/:userId', async (req, res) => {
    try {
      const { userId } = req.params
      const surveys = await getSurveysByUser(userId)

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

  /** 
   * SURVEY FIELDS ROUTES 
   */

  router.get('/:surveyId/fields', async (req, res) => {
    try {
      const { surveyId } = req.params
      const fields = await getSurveyFields(surveyId)

      res.status(200).json()
    } catch (error) {
      throw error
    }
  })

  router.post('/:surveyId/fields', async (req, res) => {
    try {
      const { surveyId } = req.params
      const newFieldsStatus = await createSurveyFields(surveyId, req.body)

      res.status(200).json(newFieldsStatus)
    } catch (error) {
      throw error
    }
  })

  return router
}

export default surveyRoutes