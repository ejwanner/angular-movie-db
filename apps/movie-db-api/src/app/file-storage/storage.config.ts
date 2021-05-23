import { diskStorage } from "multer";
import { existsSync, mkdirSync } from 'fs';
import { extname } from "path";

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

export const storage = diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type!');
    if (isValid) {
      error = null;
    }
    const uploadPath = './apps/movie-db-api/src/app/images';
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath);
    }
    callback(error, uploadPath);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + ext);
  }
});
/*
function generateFilename(file) {
  return `${Date.now()}.${extname(file.originalname)}`;
}*/
