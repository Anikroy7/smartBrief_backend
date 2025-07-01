import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { upload } from "../../utils/fileUpload";
import { SummaryControllers } from "./summary.controller";
import { SummaryValidation } from "./summary.validation";

const router = express.Router();

router.post('/create',  upload.single('file'), validateRequest(SummaryValidation.summaryValidationSchema), SummaryControllers.createSummary);
router.get('/', SummaryControllers.getAllSummaries);
router.patch('/:id', SummaryControllers.updateSummary);
router.delete('/:id', SummaryControllers.deleteSummary);
router.get('/:id', SummaryControllers.getSingleSummary);


export const SummaryRoutes = router;
