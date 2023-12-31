import { v4 as uuid } from 'uuid'
import { 
  SurveyModel,
  SurveyFieldsModel
} from '../../../models/Survey'
import { Survey, SurveyAnswers, SurveyFields } from '../../types/survey'
import { SAMPLE_FORMS } from '../../helpers/constants'
import { SurveyAnswersModel } from '../../../models/SurveyAnswers'

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

const getSurveyAnswers = async (surveyId) => {
  try {
    const answers = await SurveyAnswersModel.find({surveyId: surveyId})
    return answers
  } catch (error) {
    return error
  }
}

/** Fetches the survey details via survey id */
export const getSurveyById = async (surveyIdOrSlug:string, options: {
  isComplete?: boolean,
  showAnswers?: boolean
} = null) => {
  try {
    const survey = await SurveyModel.findOne({$or: [
      { id: surveyIdOrSlug },
      { slug: surveyIdOrSlug },
    ]}).lean().exec()

    if (survey?.id) {

      if (survey?.fields?.length === 0 && options?.isComplete){ 
        const fields = await getSurveyFields(survey?.id)
        survey.fields = fields
      }
  
      if (options?.showAnswers) {
        const answers = await getSurveyAnswers(survey?.id)
        // @ts-ignore
        survey.answers = answers
      }

    }
    

    return survey
  } catch (error) {
    return error
  }
}

/** Fetches the survey details created by the user*/
export const getSurveysByUser = async (userId:string) => {
  try {
    const list = await SurveyModel.find({userId: userId}).lean()
    return list
  } catch (error) {
    throw error
  }
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
      
      const insertedFields = await createSurveyFields(survey?.id, fields)
      
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
  try {
    const {
      name, 
      options, 
      displayImages,
      isVisible,
      fields
    } = data
    let updatedSurvey = {
      name, 
      slug: name.replace(/\s/g, '-'),
      options, 
      displayImages, 
      isVisible, 
    }
    const surveys = await SurveyModel.findOneAndUpdate({id: surveyId}, updatedSurvey).exec()

    const updatedFields = await updateSurveyFields(fields)

    return {
      ...surveys,
      updatedFields
    }

  } catch (error) {
    return error
  }
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
  try {
    const fields = await SurveyFieldsModel.find({surveyId: surveyId}).lean()
    return fields
  } catch (error) {
    throw error
  }
}

export const createSurveyFields = async (surveyId: string, fields: SurveyFields[]) => {
  try {
    const newFields = fields.map(field => ({
      ...field, 
      surveyId: surveyId
    }))
    
    if (newFields.length > 1) {
      const fields = await SurveyFieldsModel.create(newFields)
      return fields
    }
    return await SurveyFieldsModel.insertMany(newFields)
  } catch (error) {
    throw error
  }
}

/** TODO: can be exported outside if this will be used in other functions */
const updateSurveyFields = async (fields: any, isNew: boolean = false) => {
  try {
    if (!isNew) {
      fields?.forEach((field) => {
        const isExisting = !!(SurveyFieldsModel.find({id: field?.id}))

        if (isExisting) {
          delete field["_id"]
          SurveyFieldsModel.findOneAndUpdate({id: field?.id}, field).exec()
          return
        }
        createSurveyFields(field?.surveyId, [field])
        return
      })
      return fields
    }
    
  
    const insertedFields = await SurveyFieldsModel.insertMany(fields)
    return insertedFields

  } catch (error) {
    return error
  }
}

/**
 * SURVEY ANSWERS
 */

export const submitSurveyAnswers = async (formData: Partial<SurveyAnswers>) => {
  try {
    const {
      userId, 
      surveyId,
      answers
    } = formData
    
    let data = {
      id: uuid(),
      userId, 
      surveyId, 
      answers
    }

    return await SurveyAnswersModel.insertMany(data)
  } catch (error) {
    return error
  }
}