import Router from "express";
import multer from "multer";
import { getAllDocumentsController, getSingleDocumentController } from "../controllers/displayManifest.js";
import uploadDocumentController from "../controllers/uploadManifest.js";
import updateDocumentController from "../controllers/updateManifest.js";
import deleteDocumentController from "../controllers/deleteManifest.js";
import authenticateUser from "../middleware/authUser.js";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", authenticateUser, getAllDocumentsController);

router.get("/:id", authenticateUser, getSingleDocumentController);

router.post("/upload", authenticateUser, upload.single("file"), uploadDocumentController);

router.put("/update/:id", authenticateUser, updateDocumentController);

router.delete("/delete/:id", authenticateUser, deleteDocumentController);

export default router;
