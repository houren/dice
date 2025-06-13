import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth";
import diceRoutes from "./routes/dice";
// import dotenv from "dotenv";
// dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//API define
app.use("/api", authRoutes);
app.use("/api", diceRoutes);

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
