import jwt from "jsonwebtoken";

function auth(req, res, next) {
	try {
		const { autorization } = req.headers;
		const token = autorization.split(" ")[1];
		const { userId } = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = userId;

		next();
	} catch (err) {
		console.error(err.name);
		res.status(401).json({ message: "Unauthorized" });
	}
}

export default auth;
