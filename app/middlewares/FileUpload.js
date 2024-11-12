const UPLOAD_FOLDER = "./app/images/";
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, UPLOAD_FOLDER);
  },


  filename: (req, file, cd) => {
    //path include default
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cd(null, fileName + fileExt);
  },
});

const upload = multer({
    storage: storage,
    limits: {
       fileSize: 1024 * 1024 * 5 // 1000000 bytes =>  1MP
    },
    //jpg, png, jpeg
    fileFilter: (req, file, callback) => {
      if (file.fieldname === "avatar") {
        if (
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/jpeg"
        ) {
          callback(null, true);
        } else {
          callback(new Error("Only jpg, jpeg, png format allowed"));
        }
      } else if (file.fieldname === "doc") {
        if (file.mimetype === "application/pdf") {
          callback(null, true);
        } else {
          callback(new Error("Only pdf format allowed."));
        }
      } else {
        callback(new Error("There was an unknow error"));
      }
    },
  });

  export const uploadMiddleware = upload.fields([
    { name: "avatar", maxCount: 5 },
    { name: "doc", maxCount: 1 },
]);