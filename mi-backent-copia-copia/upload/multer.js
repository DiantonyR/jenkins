import multer from "multer";
import path from "path";

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Asegúrate de que la carpeta "uploads" exista
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

// Configurar multer para aceptar archivos PDF
const uploadPDF = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB máximo
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Solo se permiten archivos PDF"), false);
        }
        cb(null, true);
    },
});

// Exportar correctamente
export { uploadPDF };
