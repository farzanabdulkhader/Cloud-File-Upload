import multer from "multer";
import { v4 as uuid } from "uuid";

const fileUpload = (destination) => {
  return multer({
    limits: 500000,
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, destination);
      },
      filename: (req, file, cb) => {
        const filename = uuid() + "." + file.originalname.split(".").pop();
        cb(null, filename);
      },
    }),
  });
};

export const multipleLocal = fileUpload("multiple-uploads").array("files", 5);
