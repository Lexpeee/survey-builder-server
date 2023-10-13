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

const SurveyModel = mongoose.model('Survey', SurveySchema)

export default SurveyModel