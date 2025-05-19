"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
// .env 
dotenv_1.default.config();
// AWS CLIENT STUFF
const s3 = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
// HTTP SERVER STUFF
const PORT = 3000;
const upload = (0, multer_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.json({ msg: "HI" });
    return;
});
app.post("/upload-video", upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("i am here");
    const file = req.file;
    if (!file) {
        res.json(400).json({ msg: "File is Empty!" });
        return;
    }
    console.log("file", file);
    // Upload to S3 The File.
    try {
        const url = yield uploadToS3(file);
        res.status(200).json({ url: url });
        return;
    }
    catch (error) {
        res.status(400).json({ msg: error });
        return;
    }
}));
// function to Upload All Files to S3
function uploadToS3(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const uploadCommand = new client_s3_1.PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype
        });
        yield s3.send(uploadCommand);
        const s3Url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.originalname}`;
        console.log(s3Url);
        return s3Url;
    });
}
app.listen(PORT, () => { console.log("Server Started at PORT: ", PORT); });
