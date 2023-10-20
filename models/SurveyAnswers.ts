import mongoose from 'mongoose'

const SurveyAnswersSchema = new mongoose.Schema({
  id: String, 
  surveyId: String, 
  userId: String, 
  answers: Array,
  dateCreated: {
    type: String,
    default: new Date().toISOString()
  }
})

export const SurveyAnswersModel = mongoose.model('survey-answers', SurveyAnswersSchema)