import express from 'express';
import multer from 'multer';
import * as MenuController from '../controllers/dishes';
import { passportJWT } from '../middlewares/checkUserToken';

const router = express.Router();

const multerConf = multer({
    storage: multer.diskStorage({
        destination: '../Front_end/public/img/',
        filename(req, file, next) {
            next(null, Date.now() + file.originalname);
        }
    }),
    fileFilter(req, file, next) {
        const mimeType = file.mimetype.startsWith('image/');
        mimeType
            ? next(null, true)
            : next({ status: 400, message: 'File type not supported' });
    }
});

router.get('/dishes', MenuController.getAll);
router.get('/dishes/popular', MenuController.getPopular);
router.post('/dishes', passportJWT, MenuController.create);
router.put('/dishes/:id', passportJWT, MenuController.update);
router.delete('/dishes/:id', passportJWT, MenuController.remove);
router.post('/upload', passportJWT, multer(multerConf).single('image'), MenuController.uploadImage);

export default router;
