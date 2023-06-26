import express from "express";
import {
	createUser,
	getUserByEmail,
	updateUser,
	deleteAllPlans,
	deleteAllUsers,
} from "./userController.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
	try {
		const { name, email, password, plan } = req.body;

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
		if (user.password !== password) {
			return res.status(400).json({ message: "Invalid credentials" });
		}
		return res.redirect("home.html");
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
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
