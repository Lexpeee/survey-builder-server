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

/** Only used for development */
export const seedSurveys = async () => {
  SAMPLE_FORMS.forEach(async (form) => {
    await SurveyModel.create(form)
  })
}

/** Fetches whole list of surveys */
export const getSurveys = async () => {
  const surveys = await SurveyModel.find()
  return surveys
}

/** Fetches the survey details via survey id */
export const getSurveyById = async (surveyIdOrSlug:string) => {
  const surveys = await SurveyModel.findOne({$or: [
    { id: surveyIdOrSlug },
    { slug: surveyIdOrSlug },
  ]}).exec()
  return surveys
}

/** Fetches the survey details created by the user*/
export const getSurveysByUser = async (userId:string) => {
  const surveys = await SurveyModel.find({userId: userId}).exec()
  return surveys
}

/** Main service to create a survey */
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
      slug: name.replace(/\s/g, '-'),
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

/** Updates the selected survey */
export const updateSurvey = async (surveyId:string, data:Partial<Survey>) => {
  let updatedSurvey = {
    ...data
  }
  const surveys = await SurveyModel.findOneAndUpdate({id: surveyId}, updatedSurvey).exec()
  return surveys
}

/** Removes the selected survey */
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