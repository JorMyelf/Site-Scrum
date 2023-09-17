import API from "./lib/auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const button = document.getElementById("btn");

button.addEventListener("click", async (e) => {
	e.preventDefault();
	const data = {
		email: email.value,
		password: password.value,
	};

	try {
		const response = await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const { auth, token } = await response.json();
		if (auth) {
			API.signin(token);
		} else {
			alert("Senha ou email incorretos");
		}
	} catch (error) {
		console.error(error);
	}
});
