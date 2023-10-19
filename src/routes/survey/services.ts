import { v4 as uuid } from 'uuid'
import { 
  SurveyModel,
  SurveyFieldsModel
} from '../../../models/Survey'
import { Survey } from '../../types/survey'
import { SAMPLE_FORMS } from '../../helpers/constants'

/**
 * SURVEY 
 */

export const seedSurveys = async () => {
  SAMPLE_FORMS.forEach(async (form) => {
    await SurveyModel.create(form)
  })
}

export const getSurveys = async () => {
  const surveys = await SurveyModel.find()
  return surveys
}

export const getSurveysById = async (surveyId:string) => {
  const surveys = await SurveyModel.findOne({id: surveyId}).exec()
  return surveys
}

export const getSurveysByUser = async (userId:string) => {
  const surveys = await SurveyModel.find({userId: userId}).exec()
  return surveys
}

export const getSurveyDetails = async (surveyId: string) => {
  const surveys = await SurveyModel.find({id: surveyId})
  return surveys
}

export const createSurvey = async (data:Partial<Survey>) => {
  try {

    const { 
      name, 
      options, 
      displayImages, 
      isVisible, 
      userId, 
      fields
    } = data
    let newSurvey = {
      id: uuid(),
      userId, 
      name, 
      options, 
      displayImages, 
      isVisible, 
      dateCreated: new Date().toISOString()
    }
    const survey = await SurveyModel.create(newSurvey)
    if (survey?.id) {
      const insertedFields = await SurveyFieldsModel.insertMany(fields)
      return {
        ...survey,
        surveyId: survey?.id,
        insertedFields
      }
    }

  } catch (error) {
    return error
  }
}

export const updateSurvey = async (surveyId:string, data:Partial<Survey>) => {
  let updatedSurvey = {
    ...data
  }
  const surveys = await SurveyModel.findOneAndUpdate({id: surveyId}, updatedSurvey).exec()
  return surveys
}

export const removeSurvey = async (surveyId: string) => {
  const surveys = await SurveyModel.findOneAndRemove({id: surveyId})
  return surveys
}

/** 
 * SURVEY FIELDS 
 */

export const getSurveyFields = async (surveyId: string) => {
  const surveys = await SurveyFieldsModel.find({id: surveyId})
  return surveys
}

export const createSurveyFields = async (surveyId: string, fields: any) => {
  console.log("Create survey fields", surveyId, fields)
  return true
}