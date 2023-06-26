const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("passwordConfirm");
const button = document.getElementById("btn");

button.addEventListener("click", async (e) => {
	e.preventDefault();

	if (password.value !== passwordConfirm.value) {
		alert("A senha e a confirmação de senha não coincidem");
		throw new Error("A senha e a confirmação de senha não coincidem");
	}

	const data = {
		email: email.value,
		password: password.value,
	};

	try {
		const response = await fetch("/update", {
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
			if (responseData.message === "User does not exist") {
				email.classList.add("error");
				alert("E-mail não cadastrado");
			}
		}
	} catch (error) {
		console.error(error);
	}
});
