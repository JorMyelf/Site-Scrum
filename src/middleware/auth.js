import jwt from "jsonwebtoken";

function auth(req, res, next) {
	try {
		const { authorization } = req.headers;
		const token = authorization.split(" ")[1];
		const { userId } = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = userId;

		next();
	} catch (err) {
		res.status(401).json({ message: "Unauthorized" });
	}
}

export default auth;
