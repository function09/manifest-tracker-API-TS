import Manifest from "../models/manifest.js";
import createManifestObject from "./pdfParse.js";

const checkIfManifestExists = async (buffer) => {
  try {
    const document = await createManifestObject(buffer);
    const findDocument = await Manifest.findOne({ documentNumber: document.documentNumber }, "-_id -__v");

    if (findDocument) {
      return true;
    }

    return false;
  } catch (error) {
    return error;
  }
};

// clean up "expected return"
const getSingleManifest = async (id) => {
  try {
    return await Manifest.findOne({ UUID: id }, "-_id -__v").exec();
  } catch (error) {
    return error;
  }
};

const getAllManifests = async () => {
  /* 
    We are not including items here; 
    as the number of documents increases, 
    there will be many items -> potential slowdown 
  */
  try {
    return await Manifest.find({}, "-_id -__v -items").exec();
  } catch (error) {
    return error;
  }
};

const saveManifest = async (buffer) => {
  try {
    return await new Manifest({ ...(await createManifestObject(buffer)) }).save();
  } catch (error) {
    return error;
  }
};

const updateManifest = async (param, materialDocNumber) => {
  /* 
    Typically only need to keep track of the material doc number 
    after accepting manifests, no need to update everything else
    don't need _id and __v
  */

  try {
    return await Manifest.findOneAndUpdate({ UUID: param }, { materialDocNumber }, { new: true }).exec();
  } catch (error) {
    return error;
  }
};

const deleteManifest = async (param) => {
  try {
    const deletedDocument = await Manifest.findOneAndDelete({ UUID: param }).exec();
    return deletedDocument;
  } catch (error) {
    return error;
  }
};

export { checkIfManifestExists, getSingleManifest, getAllManifests, saveManifest, updateManifest, deleteManifest };
