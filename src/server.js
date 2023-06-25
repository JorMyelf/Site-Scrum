import express from "express";
import authRoutes from "./authRoutes.js";

const app = express();

app.use(express.json());

app.use(authRoutes);

app.listen(3000, () => {
	console.log("Server listening on port 3000");
});

export default app;