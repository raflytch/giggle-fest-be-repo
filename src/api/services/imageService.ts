import imagekit from "../../lib/imagekitConfig";

export const uploadImageService = async (
  file: Express.Multer.File
): Promise<string> => {
  try {
    const response = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
    });

    return response.url;
  } catch (error) {
    throw new Error("Failed to upload image");
  }
};
