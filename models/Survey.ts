import mongoose from 'mongoose'


const SurveySchema = new mongoose.Schema({
  id: String, 
  userId: String, 
  name: String, 
  fields: Array, 
  options: Object,
  datePublished: Date,
  dateCreated: Date,
  dateRemoved: Date,
  displayImages: Array,
  isVisible: Boolean
})

export const SurveyModel = mongoose.model('surveys', SurveySchema)

const SurveyFieldsSchema = new mongoose.Schema({
  id: String, 
  order: Number, 
  question: String, 
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
  isFieldLocked: Boolean
})

export const SurveyFieldsModal = mongoose.model('survey-fields', SurveyFieldsSchema)