import express from 'express'

const router = express.Router()

const surveyRoutes = () => {

  // SURVEY
  // GET /
  // GET /:surveyId
  // POST /
  // PATCH /:surveyId
  // PATCH /:surveyId
  // DELETE /:surveyId

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

  return router
}

export default surveyRoutes