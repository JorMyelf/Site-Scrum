import express from "express";
import { createUser, getUserByEmail } from "./userController.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
	try {
		const { name, email, password, plan } = req.body;

		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		await createUser(name, email, password, plan);

		return res
			.status(201)
			.json({ message: "User registered successfully'" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await getUserByEmail(email);
		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}
		if (user.password !== password) {
			return res.status(400).json({ message: "Invalid credentials" });
		}
		return res.status(200).json({ message: "User logged in successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

router.post("update", async (req, res) => {
	try {
		const { email, name, plan, newEmail, password } = req.body;
		const user = await updateUser(email, name, plan, newEmail, password);
		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

export default router;
