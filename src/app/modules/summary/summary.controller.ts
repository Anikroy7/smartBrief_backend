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


export const SummaryControllers = {
    createSummary,
};
