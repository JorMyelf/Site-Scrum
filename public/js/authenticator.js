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
		if (response.redirected) {
			window.location.href = response.url;
		} else {
			const responseData = await response.json();
			if (responseData.message === "Invalid credentials") {
				password.classList.add("error");
				alert("Senha inválida");
			}
			if (responseData.message === "User does not exist") {
				email.classList.add("error");
				alert("Usuário não existe");
			}
		}
	} catch (error) {
		console.error(error);
	}
});
