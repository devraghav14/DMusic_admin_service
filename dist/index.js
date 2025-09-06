import express, {} from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import adminRoutes from "./route.js";
import cloudinary from "cloudinary";
import redis from 'redis';
import cors from 'cors';
dotenv.config();
export const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 12080,
    },
});
redisClient.connect().then(() => console.log("Connected to Redis Client successfully")).catch((err) => console.log(err));
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.json("Admin services running");
});
async function initDB() {
    try {
        await sql `
        CREATE TABLE IF NOT EXISTS albums(
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          thumbnail VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
        await sql `
        CREATE TABLE IF NOT EXISTS songs(
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          thumbnail VARCHAR(255),
          audio VARCHAR(255) NOT NULL,
          album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
        console.log("Database initialized successfully");
    }
    catch (error) {
        console.log("Error initDb", error);
    }
}
app.use("/api/v1", adminRoutes);
const port = process.env.PORT;
initDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
});
//# sourceMappingURL=index.js.map