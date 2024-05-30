import mime from "mime";
import { checkIfManifestExists, saveManifest } from "../services/databaseFunctions.js";

/* 
Before uploading, check if:
a file was selected,  
document # already exists in db,
if the file is a pdf file,
*/

const verifyFileInput = (req) => {
  const { file } = req;

  if (!file) {
    return true;
  }

  return false;
};

const verifyMIMEType = (req) => {
  const extension = mime.getExtension(req.file.mimetype);

  if (extension !== "pdf") {
    return true;
  }

  return false;
};

const verifyFileSignature = (req) => {
  const { buffer } = req.file;
  const bufferToString = Buffer.from(buffer).toString();
  const byteArray = [...bufferToString].slice(0, 5);

  // File must contain the unique signature of %PDF- in it's buffer
  if (byteArray.toString() !== "%,P,D,F,-") {
    return true;
  }

  return false;
};

const uploadDocumentController = async (req, res) => {
  if (verifyFileInput(req)) {
    // Is this needed? manifests automatically attempt uploading when selecting a file
    return res.status(400).json({ message: "no file has been selected" });
  }

  if (verifyMIMEType(req)) {
    return res.status(400).json({ message: "verify that the file extension is .pdf" });
  }

  if (verifyFileSignature(req)) {
    return res.status(400).json({ message: "verify that the file is a PDF" });
  }
  try {
    if (await checkIfManifestExists(req.file.buffer)) {
      return res.status(400).json({ message: "document number already exists" });
    }
    await saveManifest(req.file.buffer);
    return res.status(200).json({ message: "document saved successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default uploadDocumentController;
