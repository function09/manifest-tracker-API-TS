import { deleteManifest } from "../services/databaseFunctions.js";

const deleteDocumentController = async (req, res) => {
  try {
    const document = await deleteManifest(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "Document number does not exist" });
    }

    return res.status(200).json({ message: "Manifest deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default deleteDocumentController;
