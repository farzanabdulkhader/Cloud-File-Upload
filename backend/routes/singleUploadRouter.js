import express from "express";
import singleLocal from "../middlewares/singleLocal.js";
import singleCloud from "../middlewares/singleCloud.js";
import { localModel, cloudModel } from "../models/singleModel.js";
import getDataUrl from "../bufferGenerator.js";
import cloudinary from "cloudinary";

const router = express.Router();

router.post("/local", singleLocal, async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    await localModel.create({
      image: file.path,
    });

    res.json({ image: file.path });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/cloud", singleCloud, async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileBuffer = getDataUrl(file);
    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content);
    await cloudModel.create({
      image: {
        url: cloud.secure_url,
        id: cloud.public_id,
      },
    });

    res.json({ image: cloud.secure_url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
