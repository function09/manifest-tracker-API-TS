import mongoose from "mongoose";

const { Schema } = mongoose;

const manifestSchema = new Schema({
  sendingWarehouse: { type: String },
  documentNumber: { type: String },
  materialDocNumber: { type: String },
  departureDate: { type: String },
  arrivalDate: { type: String },
  items: { type: Array },
  UUID: { type: String },
});

manifestSchema.virtual("id").get(function () {
  return `/${this.UUID}`;
});

const Manifest = mongoose.model("manifest", manifestSchema);

export default Manifest;
