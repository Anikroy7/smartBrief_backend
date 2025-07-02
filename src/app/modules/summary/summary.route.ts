import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { upload } from "../../utils/fileUpload";
import { SummaryControllers } from "./summary.controller";
import { SummaryValidation } from "./summary.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { checkUserCredit } from "../../middlewares/checkUserCredit";

const router = express.Router();

router.post('/create', auth(USER_ROLE.user, USER_ROLE.admin), checkUserCredit, upload.single('file'), validateRequest(SummaryValidation.summaryValidationSchema), SummaryControllers.createSummary);
router.patch('/re-prompt', auth(USER_ROLE.user, USER_ROLE.admin), checkUserCredit, validateRequest(SummaryValidation.summaryValidationSchema), SummaryControllers.rePromptSummary);
router.get('/all', auth(USER_ROLE.admin, USER_ROLE.editor, USER_ROLE.reviewer), SummaryControllers.getAllSummaries);
router.get('/my-summaries', auth(USER_ROLE.user,USER_ROLE.admin, USER_ROLE.editor, USER_ROLE.reviewer), SummaryControllers.getMySummaries);
router.patch('/update/:id', auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.editor), SummaryControllers.updateSummary);
router.delete('/delete/:id', auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.editor), SummaryControllers.deleteSummary);
router.get('/:id', auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.editor, USER_ROLE.reviewer),  SummaryControllers.getSingleSummary);


export const SummaryRoutes = router;
