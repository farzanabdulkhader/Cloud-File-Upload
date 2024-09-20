import multer from "multer";

const fileUpload = () => {
  return multer({
    storage: multer.memoryStorage(),
  });
};

export default fileUpload().single("file");
