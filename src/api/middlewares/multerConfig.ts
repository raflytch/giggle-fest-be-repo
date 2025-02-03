import multer from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();

const fileFIlter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({
  storage,
  fileFilter: fileFIlter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export default upload;
