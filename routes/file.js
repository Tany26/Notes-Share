const router = require('express').Router();

const multer = require('multer');
const path = require('path');
const { v4: uuid4 } = require('uuid');

const File = require('../model/file');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName)

    }
})

let upload = multer({
    storage: storage,
    limit: {
        fileSize: 1000000 * 1000
    }
}).single('myfile');

router.post('/', (req, res) => {



    // store
    upload(req, res, async(err) => {
        if (!req.file) {
            return res.status(500).json({ error: 'file are required' });
        }

        if (err)
            return res.status(500).send({ error: err.message });


        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size

        });
        const response = await file.save();
        return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` })
    })
})


module.exports = router;