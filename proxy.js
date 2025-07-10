import express from "express";
import bodyParser from "body-parser";
import { GoogleAuth } from "google-auth-library";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

const SERVICE_ACCOUNT_KEY_PATH = "./service-account.json"; // Pastikan file ini ada di folder ini
const PROJECT_ID = "vertex-ai-dyad"; // Ganti dengan Project ID Anda
const LOCATION = "us-central1";
const MODEL_ID = "gemini-2.5-flash";

const auth = new GoogleAuth({
  keyFile: SERVICE_ACCOUNT_KEY_PATH,
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});

app.post("/vertexai", async (req, res) => {
  try {
    console.log("Body diterima proxy:", req.body); // Log body request
    console.log("Tipe req.body:", typeof req.body, req.body); // Log tipe data
    const client = await auth.getClient();
    const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_ID}:generateContent`;
    const accessToken = await client.getAccessToken();
    // Pastikan payload ke Google adalah objek JSON
    const payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const response = await axios.post(
      url,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken.token || accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    if (err.response) {
      console.error("Vertex AI error:", err.response.data); // Log error detail dari Vertex AI
      res.status(500).json({ error: err.response.data });
    } else {
      res.status(500).json({ error: err.toString() });
    }
  }
});

app.listen(3001, () => {
  console.log("Proxy listening on port 3001");
}); 