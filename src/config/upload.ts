import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

export default {
  upload(dir: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", dir),
        filename: (request, file, callback) => {
          const file_hash = crypto.randomBytes(16).toString("hex");
          const filename = `${file_hash}-${file.originalname}`;

          return callback(null, filename);
        },
      }),
    };
  },
};
