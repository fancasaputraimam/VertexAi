# Vertex AI Proxy Backend

Proxy backend ini digunakan untuk mengakses Vertex AI (Gemini 1.5 Pro Preview) menggunakan Service Account Google Cloud. Proxy ini akan menerima request dari bolt.new, lalu meneruskan ke Vertex AI.

## Cara Pakai

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Letakkan file `service-account.json`**

   - Download dari Google Cloud Console (IAM & Admin > Service Accounts > Create Key).
   - Letakkan di folder ini (`vertex-proxy/`).

3. **Edit `proxy.js`**

   - Ganti `YOUR_PROJECT_ID` dengan Project ID Google Cloud Anda.

4. **Jalankan proxy**

   ```bash
   npm start
   ```

5. **Proxy berjalan di** `http://localhost:3001/vertexai`

## Catatan
- Pastikan Service Account memiliki role `Vertex AI User`.
- Jangan expose file service-account.json ke publik.
- Untuk production, gunakan HTTPS dan environment variable untuk credentials. 