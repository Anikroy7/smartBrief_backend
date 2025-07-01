import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { upload } from "../../utils/fileUpload";
import { SummaryControllers } from "./summary.controller";
import { SummaryValidation } from "./summary.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post('/create', auth(USER_ROLE.user, USER_ROLE.admin), upload.single('file'), validateRequest(SummaryValidation.summaryValidationSchema), SummaryControllers.createSummary);
router.get('/', auth(USER_ROLE.admin, USER_ROLE.editor, USER_ROLE.reviewer), SummaryControllers.getAllSummaries);
router.get('/my-summaries', auth(USER_ROLE.user,USER_ROLE.admin, USER_ROLE.editor, USER_ROLE.reviewer), SummaryControllers.getMySummaries);
router.patch('/:id', auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.editor), SummaryControllers.updateSummary);
router.delete('/:id', auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.editor), SummaryControllers.deleteSummary);
router.get('/:id', auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.editor, USER_ROLE.reviewer),  SummaryControllers.getSingleSummary);


export const SummaryRoutes = router;
