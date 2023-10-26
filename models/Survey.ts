import mongoose from 'mongoose'


const SurveySchema = new mongoose.Schema({
  id: String, 
  workspaceIds: Array, 
  userId: String, 
  name: {
    type:  String, 
    required: true
  }, 
  description: String, 
  slug: String,
  fields: Array, 
  options: Object,
  datePublished: Date,
  dateCreated: Date,
  dateRemoved: Date,
  displayImages: Array,
  isVisible: Boolean,
  answers: {
    type: Array,
    default: []
  }
})

export const SurveyModel = mongoose.model('surveys', SurveySchema)

const SurveyFieldsSchema = new mongoose.Schema({
  id: String, 
  order: Number, 
  surveyId: String, 
  question: String, 
  description: String, 
  answer: String, 
  name: String, 
  placeholder: String, 
  type: String ,
  defaultValue: String, 
  options: Array,
  // TODO: wrap options below to fieldOptions property
  isAnswerRequired: Boolean, 
  isFullScreen: Boolean, 
  isRequired: Boolean, 
  isFieldLocked: Boolean,
  isAnswerReusable: Boolean
})

export const SurveyFieldsModel = mongoose.model('survey-fields', SurveyFieldsSchema)