import multer from "multer";

const storage = multer.memoryStorage();

const imageFileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.mimetype)) {
    return cb(
      { status: "415", userErrorMessage: "Tipo de archivo no permitido" },
      false
    );
  }
  cb(null, true);
};

export const processImage = (req, res, next) => {
  multer({
    storage,
    fileFilter: imageFileFilter,
  }).single("image")(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(err.status || 500).send({
        status: "FAILED",
        error: [
          {
            message:
              err?.userErrorMessage ||
              "Ocurrió un error inesperado al subir la imagen.",
          },
        ],
      });
    }

    next();
  });
};
