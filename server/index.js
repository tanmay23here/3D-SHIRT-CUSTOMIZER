import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import HuggingFace from "./routes/huggingface.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limig: "50mb"}))

app.use('/api/v1/huggingface', HuggingFace);

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello from HuggingFace" })
})

app.listen(8080, () => console.log('Server has started on port 8080'))