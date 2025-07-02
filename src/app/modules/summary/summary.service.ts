import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { ISummary } from "./summary.interface";
import Summary from "./summary.model";
import { summaryQueue } from "../../queue/summary/summary.queue";

const createSummaryIntoDB = async (payload: ISummary) => {
  const newSummary = await Summary.create(payload);


  if (!newSummary) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create summary");
  }

  await summaryQueue.add({
    summaryId: newSummary._id.toString(),
    content: newSummary.originalText,
    prompt: newSummary.prompt
  });

  return newSummary;
};


export const rePromptSummaryIntoDB = async (payload: ISummary) => {
  if (!payload._id) {
    throw new AppError(httpStatus.BAD_REQUEST, "Summary ID is required");
  }

  const { _id, ...updateData } = payload;

  const updated = await Summary.findByIdAndUpdate(_id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to update summary");
  }

  await summaryQueue.add({
    summaryId: _id.toString(),
    content: updated.originalText,
    prompt: updated.prompt,
  });

  return updated;
};
const getAllSummariesFromDB = async (filter: any = {}) => {
  const summaries = await Summary.find(filter).sort({ createdAt: -1 });
  return summaries;
};
const getMySummariesFromDB = async (userId: string) => {
  console.log('userId:', userId);
  const summaries = await Summary.find({ user: userId }).sort({ createdAt: -1 });
  return summaries;
};

const getSingleSummaryFromDB = async (id: string) => {
  const summary = await Summary.findById(id);
  if (!summary) {
    throw new AppError(httpStatus.NOT_FOUND, 'Summary not found');
  }
  return summary;
};

const updateSummaryIntoDB = async (id: string, updateData: Partial<ISummary>) => {

  const updated = await Summary.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updated) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update summary');
  }
  return updated;
};

const deleteSummaryIntoDB = async (id: string) => {

  const deleted = await Summary.findByIdAndDelete(id);
  if (!deleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to delete summary');
  }
  return deleted;
};


export const SummaryServices = {
  getAllSummariesFromDB,
  createSummaryIntoDB,
  getSingleSummaryFromDB,
  updateSummaryIntoDB,
  deleteSummaryIntoDB,
  getMySummariesFromDB,
  rePromptSummaryIntoDB
};
