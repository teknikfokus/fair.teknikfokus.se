import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs = require('fs');
import path = require('path');

type validFileExtension = 'png' | 'jpg' | 'jpeg' | 'svg';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg' | 'image/svg';

const validFileExtensions: validFileExtension[] = ['png', 'jpg', 'jpeg', 'svg'];
const validMimeTypes: validMimeType[] = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/svg'
];

export const saveImageToStorage = {
  limits: {fileSize: 10485760},
  storage: diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
      const fileExtension: string = path.extname(file.originalname);
      const fileName: string = uuidv4() + fileExtension;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes: validMimeType[] = validMimeTypes;
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
  },
};

export const removeFile = (fullFilePath: string): void => {
  try {
    fs.unlinkSync(fullFilePath);
  } catch (err) {
    console.error(err);
  }
};
