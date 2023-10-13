import { v4 as uuid } from 'uuid'
import SurveyModel from '../../../models/Survey'
import { Survey } from '../../types/survey'

export const getSurveys = async () => {
  const surveys = await SurveyModel.find()
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