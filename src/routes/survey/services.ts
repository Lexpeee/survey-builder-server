import { v4 as uuid } from 'uuid'
import { 
  SurveyModel,
  SurveyFieldsModal
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
  const surveys = await SurveyModel.find({surveyId})
  return surveys
}

export const getSurveysByUser = async (userId:string) => {
  const surveys = await SurveyModel.find({userId})
  return surveys
}

export const getSurveyDetails = async (surveyId: string) => {
  const surveys = await SurveyModel.find({id: surveyId})
  return surveys
}

export const createSurvey = async (data:Partial<Survey>) => {
  let newSurvey = {
    id: uuid(),
    ...data,
    dateCreated: new Date().toISOString()
  }
  const surveys = await SurveyModel.create(newSurvey)
  return surveys
}

export const updateSurvey = async (surveyId:string, data:Partial<Survey>) => {
  let updatedSurvey = {
    ...data
  }
  const surveys = await SurveyModel.findOneAndUpdate({id: surveyId}, updatedSurvey)
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
  const surveys = await SurveyFieldsModal.find({id: surveyId})
  return surveys
}

export const createSurveyFields = async (surveyId: string, fields: any) => {
  console.log("Create survey fields", surveyId, fields)
  return true
}