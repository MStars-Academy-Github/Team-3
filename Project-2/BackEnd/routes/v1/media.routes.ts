import express, { Router } from "express";
import { mediaController } from "../../modules/media";

const router: Router = express.Router();

router.post("/upload", mediaController.createMedia);
router.get("/video/:mediaId", mediaController.getMediaById);
router.get("/media/by/:_id", mediaController.MediaById);
router.get("/video/by/:userId", mediaController.getMediaByUserId);
router.get("/allvideo", mediaController.getAllMedia);
router.post("/update/:_id", mediaController.updateMedia);
router.delete("/delete/:_id", mediaController.deleteMedia);

export default router;
