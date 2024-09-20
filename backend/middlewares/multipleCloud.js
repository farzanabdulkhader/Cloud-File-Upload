import multer from "multer";

const fileUpload = () => {
  return multer({ storage: multer.memoryStorage() });
};

export const multipleCloud = fileUpload().array("file", 5);
