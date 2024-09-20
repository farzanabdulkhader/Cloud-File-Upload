import mongoose from "mongoose";

const localSchema = new mongoose.Schema({
  image: { type: String, required: true },
});

const cloudSchema = new mongoose.Schema({
  image: {
    url: String,
    id: String,
  },
});

const localModel = mongoose.model("Single", localSchema);
const cloudModel = mongoose.model("Cloud-Single", cloudSchema);
export { localModel, cloudModel };
