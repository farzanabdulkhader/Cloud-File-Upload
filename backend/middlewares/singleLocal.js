import multer from "multer";

const fileUpload = (destination) => {
  const multerFileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, destination);
      },
      filename: (req, file, cb) => {
        const filename = Date.now() + "." + file.originalname.split(".").pop();
        cb(null, filename);
      },
    }),
  });

  return multerFileUpload.single("file");
};

export default fileUpload("uploads");
