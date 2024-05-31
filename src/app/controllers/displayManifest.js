import { getAllManifests, getSingleManifest } from "../services/databaseFunctions.js";

const getAllDocumentsController = async (req, res) => {
  try {
    const manifests = await getAllManifests();

    if (manifests.length === 0) {
      return res.status(200).json({ message: "There is no manifest data.", data: [] });
    }

    return res.status(200).json({ message: "Manifests successfully fetched.", data: manifests });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getSingleDocumentController = async (req, res) => {
  try {
    const manifest = await getSingleManifest(req.params.id);

    if (manifest === null) {
      return res.status(404).json({ message: "Manifest does not exist" });
    }

    return res.status(200).json({ message: "Manifests successfully fetched", data: manifest });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export { getAllDocumentsController, getSingleDocumentController };
