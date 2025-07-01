import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { upload } from "../../utils/fileUpload";
import { SummaryControllers } from "./summary.controller";

const router = express.Router();

router.post('/create',  upload.single('file'), SummaryControllers.createSummary);

export const SummaryRoutes = router;
