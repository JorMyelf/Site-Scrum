function validate(schema) {
	return function (req, res, next) {
		try {
			schema.parse({
				body: req.body,
			});
			next();
		} catch (error) {
			return res.status(400).json({ error: error.errors });
		}
	};
}

export default validate;
