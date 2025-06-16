import Image from "../database/models/image.model.js";
import Note from "../database/models/note.model.js";

export const imageAccessMiddleware =
  (...modes) =>
  async (req, res, next) => {
    try {
      const imageId = req.params.imageId;
      const userId = req.authData.id;

      const imageFound = await Image.findById(imageId);

      if (!imageFound) {
        throw {
          status: 404,
          userErrorMessage: "Imagen no encontrada.",
        };
      }

      const isOwner = imageFound.user_id.equals(userId);
      const isSharedWithUser = imageFound.shared_with.some((shared) =>
        shared.user_id.equals(userId)
      );

      const hasAccess =
        (modes.includes("owner") && isOwner) ||
        (modes.includes("view") && (isOwner || isSharedWithUser));

      if (!hasAccess) {
        throw {
          status: 403,
          userErrorMessage: "No tienes permiso para acceder a esta imagen.",
        };
      }

      console.log("Image found:", imageFound);
      req.image = imageFound;
      next();
    } catch (error) {
      return res.status(error?.status || 500).send({
        status: "FAILED",
        error: [
          {
            message:
              error?.userErrorMessage ||
              "Ocurrió un error al procesar tu solicitud. Inténtalo de nuevo más tarde.",
          },
        ],
      });
    }
  };

export const noteAccessMiddleware =
  (...modes) =>
  async (req, res, next) => {
    try {
      const noteId = req.params.noteId;
      const userId = req.authData.id;

      const noteFound = await Note.findById(noteId)
        .populate("images")
        .populate("color")
        .populate("tags");
      if (!noteFound) {
        throw {
          status: 404,
          userErrorMessage: "Nota no encontrada.",
        };
      }
      const isOwner = noteFound.user_id.equals(userId);
      const isSharedWithUser = noteFound.shared_with.some((shared) =>
        shared.user_id.equals(userId)
      );
      const hasAccess =
        (modes.includes("owner") && isOwner) ||
        (modes.includes("view") && (isOwner || isSharedWithUser));
      if (!hasAccess) {
        throw {
          status: 403,
          userErrorMessage: "No tienes permiso para acceder a esta nota.",
        };
      }
      req.note = noteFound;
      next();
    } catch (error) {
      return res.status(error?.status || 500).send({
        status: "FAILED",
        error: [
          {
            message:
              error?.userErrorMessage ||
              "Ocurrió un error al procesar tu solicitud. Inténtalo de nuevo más tarde.",
          },
        ],
      });
    }
  };
