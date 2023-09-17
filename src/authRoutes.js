import express from "express";
import {
	createUser,
	getUserByEmail,
	updateUser,
	deleteAllPlans,
	deleteAllUsers,
} from "./userController.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import auth from "./middleware/auth.js";

const saltRounds = Number(process.env.SALT_ROUNDS);

const router = express.Router();

router.post("/signup", async (req, res) => {
	try {
		let { name, email, password, plan } = req.body;

		const hash = await bcrypt.hash(password, saltRounds);

		password = hash;

		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		await createUser(name, email, password, plan);

		return res.redirect("mailVerification.html");
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

		const { id: userId, password: hash } = user;

		const match = await bcrypt.compare(password, hash);

		if (match) {
			const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
				expiresIn: "3d",
			});
			res.json({ auth: true, token: token });
		} else {
			res.json({
				auth: false,
				token: null,
				message: "Invalid credentials",
			});
		}
	} catch (error) {
		console.error(error);
	}
});

router.get("/verify", auth, async (req, res) => {
	res.json({ auth: true });
});

router.post("/update", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await updateUser(email, password);
		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
	return res.redirect("index.html");
});

router.post("/deleteEverything", async (req, res) => {
	try {
		deleteAllUsers();
		deleteAllPlans();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
	return res.status(200).json({ message: "Deleted everything" });
});

router.post("/deleteUsers", async (req, res) => {
	try {
		deleteAllUsers();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
	return res.status(200).json({ message: "Users deleted" });
});

router.post("/deletePlans", async (req, res) => {
	try {
		deleteAllPlans();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
	return res.status(200).json({ message: "Plans deleted" });
});

export default router;
