import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs = require('fs');
import path = require('path');

type validFileExtension = 'pdf';
type validMimeType = 'application/pdf';

const validFileExtensions: validFileExtension[] = ['pdf'];
const validMimeTypes: validMimeType[] = [
  'application/pdf',
];

export const saveCVToStorage = {
  limits: {fileSize: 5242880 }, //maxsize: 5MB
  storage: diskStorage({
    destination: './resumes',
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
