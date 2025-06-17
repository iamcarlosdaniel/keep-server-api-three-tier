import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    // Usuario que subió el archivo
    uploaded_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // Nombre original del archivo subido
    original_name: {
      type: String,
      required: true,
    },
    // Nombre con el que se guarda en disco / almacenamiento
    stored_file_name: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    // Tipo MIME (ej. application/pdf, image/png)
    mime_type: {
      type: String,
      required: true,
    },
    // Tamaño del archivo en bytes
    size_in_bytes: {
      type: Number,
      required: true,
    },
    // Ruta absoluta o relativa del archivo (o URL si está en S3, etc.)
    storage_path: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("File", fileSchema);
