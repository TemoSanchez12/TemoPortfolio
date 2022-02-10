import Work from '../models/work'

export const getAllWorks = async () => {
  return await Work.find()
}

export const getLastWorks = async () => {
  return await Work.find().sort({ date: -1 }).limit(2)
}

export const getFilteredWorks = async (filter) => {}
