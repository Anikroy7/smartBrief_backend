import httpStatus from "http-status";
import fs from "fs";
import mammoth from "mammoth";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SummaryServices } from "./summary.service";

const createSummary = catchAsync(async (req, res) => {
    const summaryData = req.body;

    let originalText = req.body.originalText || '';

    if (req.file) {
        const filePath = req.file.path;
        if (filePath.endsWith('.txt')) {
            originalText = fs.readFileSync(filePath, 'utf-8');
        } else if (filePath.endsWith('.docx')) {
            const result = await mammoth.extractRawText({ path: filePath });
            originalText = result.value;
        }
    }
    summaryData.originalText = originalText;

    const result = await SummaryServices.createSummaryIntoDB(summaryData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Summary created successfully",
        data: result,
    });
});


const rePromptSummary = catchAsync(async (req, res) => {

    const summaryData = req.body;
    const result = await SummaryServices.rePromptSummaryIntoDB(summaryData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Summary re-prompt successfully",
        data: result,
    });
});

const getAllSummaries = catchAsync(async (req, res) => {
    const summaries = await SummaryServices.getAllSummariesFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Summaries fetched successfully",
        data: summaries,
    });
});
const getMySummaries = catchAsync(async (req, res) => {
    const userId = req?.user?.userId as string;
    const summaries = await SummaryServices.getMySummariesFromDB(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My Summaries fetched successfully",
        data: summaries,
    });
});

const getSingleSummary = catchAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req?.user?.userId as string;
    const summary = await SummaryServices.getSingleSummaryFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Summary fetched successfully",
        data: summary,
    });
});

const updateSummary = catchAsync(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    const updated = await SummaryServices.updateSummaryIntoDB( id, updateData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Summary updated successfully",
        data: updated,
    });
});

const deleteSummary = catchAsync(async (req, res) => {
    const { id } = req.params;
    const deleted = await SummaryServices.deleteSummaryIntoDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Summary deleted successfully",
        data: deleted,
    });
});



export const SummaryControllers = {
    createSummary,
    getAllSummaries,
    getSingleSummary,
    updateSummary,
    deleteSummary,
    getMySummaries,
    rePromptSummary
};
