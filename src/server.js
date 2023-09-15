import express from "express";
import authRoutes from "./authRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use(authRoutes);

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.redirect("/login.html");
});

app.listen(3000, () => {
	console.log("Server listening on port 3000");
});

export default app;
