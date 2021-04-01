import { Logger } from '@nestjs/common';
import * as config from 'config';

const cloudinaryConfig = config.cloudinary;
const logger = new Logger();
var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: cloudinaryConfig.cloud_name,
  api_key: cloudinaryConfig.api_key,
  api_secret: cloudinaryConfig.secret,
});
export class Cloudinary {
  async upload_image(file: Express.Multer.File) {
    try {
      const uploadResponse = await cloudinary.uploader.upload(file.path, {});
      return uploadResponse;
    } catch (err) {
      logger.error(err);
    }
  }
}
export interface uploadedFile {
  secure_url: string;
  public_id: string;
}
