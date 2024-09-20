import mongoose from "mongoose";

const localSchema = new mongoose.Schema({
  images: [{ type: String, required: true }],
});

const cloudSchema = new mongoose.Schema({
  images: [
    {
      url: String,
      id: String,
    },
  ],
});

const localModel = mongoose.model("Multiple", localSchema);
const cloudModel = mongoose.model("Cloud-Multiple", cloudSchema);
export { localModel, cloudModel };
