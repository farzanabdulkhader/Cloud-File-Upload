import { localModel, cloudModel } from "../models/multipleModel.js";
import { multipleLocal } from "../middlewares/multipleLocal.js";
import { multipleCloud } from "../middlewares/multipleCloud.js";
import getDataUrl from "../bufferGenerator.js";
import cloudinary from "cloudinary";
import express from "express";

const router = express.Router();

router.post("/local", multipleLocal, async (req, res) => {
  try {
    const files = req.files;

    if (!files) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    await localModel.create({
      images: files.map((file) => file.path),
    });

    res.json({ images: files.map((file) => file.path) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/cloud", multipleCloud, async (req, res) => {
  try {
    const files = req.files;

    if (!files || files?.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadPromises = files.map(async (file) => {
      const fileBuffer = getDataUrl(file);
      const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content);
      return { url: cloud.secure_url, id: cloud.public_id };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    await cloudModel.create({
      images: uploadedFiles,
    });

    res.json({ images: uploadedFiles }); //edit this line to receive the data at frontend properly
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
