import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from HuggingFace ROUTES" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const payload = {
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "url",
    };
    
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        method: "POST",
        body: JSON.stringify({ 
            inputs: prompt,
        }),
      }
    );

    const result = await response.blob();
    const buffer = await result.arrayBuffer();
    const base64data = Buffer.from(buffer).toString('base64');

    console.log(base64data);
    res.status(200).json({ photo: base64data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router