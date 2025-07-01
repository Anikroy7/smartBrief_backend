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

export const SummaryServices = {
  createSummaryIntoDB,
};
