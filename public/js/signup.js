const form = document.querySelector("#signup");
const plans = document.querySelector("#plano");
const button = document.querySelector("button");

function selectaPlan() {
	alert("Por favor, selecione um plano");
	throw new Error("Por favor, selecione um plano");
}

function invalidPassword() {
	form.senha.classList.add("error");
	form.senhaConfirmacao.classList.add("error");
	form.senha.value = "";
	form.senhaConfirmacao.value = "";
	alert("A senha deve ter no mínimo 8 caracteres");

	form.senha.addEventListener("focus", () => {
		form.senha.classList.remove("error");
		form.senhaConfirmacao.classList.remove("error");
	});
}

function invalidEmail() {
	form.email.classList.add("error");
	alert("O email inserido é inválido");

	form.email.addEventListener("focus", () => {
		form.email.classList.remove("error");
	});
}

function invalidName() {
	form.name.classList.add("error");
	alert("O nome deve ter no mínimo 2 caracteres");

	form.name.addEventListener("focus", () => {
		form.name.classList.remove("error");
	});
}

button.addEventListener("click", async (e) => {
	e.preventDefault();

	const formData = new FormData(form);

	const selectedPlan = plans.querySelector("input[type='radio']:checked")
		? plans.querySelector("input[type='radio']:checked").value
		: selectaPlan();

	let { name, email, senha, senhaConfirmacao } = Object.fromEntries(formData);

	if (senha !== senhaConfirmacao) {
		alert("A senha e a confirmação de senha não coincidem");
		return;
	}

	const data = {
		name,
		email,
		password: senha,
		plan: selectedPlan,
	};

	try {
		const response = await fetch("/signup", {
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
			if (responseData.message === "User already exists") {
				invalidEmail();
			}
			if (
				responseData.error[0].message.includes(
					"String must contain at least"
				)
			) {
				switch (responseData.error[0].path[1]) {
					case "name":
						invalidName();
						break;
					case "password":
						invalidPassword();
						break;
				}
			}
			if (responseData.error[0].message === "Invalid email") {
				form.email.classList.add("error");
				alert("O email inserido é inválido");
			}
		}
	} catch (error) {
		console.error(error);
		alert("Erro interno do servidor");
	}
});
