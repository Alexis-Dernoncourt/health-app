import { Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    folder: string,
    filename: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'health-app/' + folder,
            public_id: `${filename}`,
            width: 600,
            height: 600,
            crop: 'auto',
            quality: 'auto',
          },
          (error, result) => {
            if (error) return reject(error);
            if (result) return resolve(result);
          },
        )
        .end(file.buffer);
    });
  }
  async uploadFile(
    file: Express.Multer.File,
    folder: string,
    filename: string,
  ) {
    // Upload an image
    try {
      const uploadResult = await this.uploadImage(file, folder, filename);

      // Optimize delivery by resizing and applying auto-format and auto-quality
      // const optimizeUrl = cloudinary.url(folder, {
      //   fetch_format: 'auto',
      //   quality: 'auto',
      // });
      // console.log(optimizeUrl);
      // Transform the image: auto-crop to square aspect_ratio
      // const autoCropUrl = cloudinary.url(folder, {
      //   crop: 'auto',
      //   gravity: 'center',
      //   width: 600,
      //   height: 250,
      // });
      // console.log(autoCropUrl);
      return uploadResult;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteImage(public_id: string) {
    try {
      await cloudinary.uploader.destroy(public_id, { resource_type: 'image' });
    } catch (error) {
      console.log(error);
    }
  }
}
