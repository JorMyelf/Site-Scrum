const form = document.querySelector("#signup");
const plans = document.querySelector("#plano");
const button = document.querySelector("button");

function selectaPlan() {
	alert("Por favor, selecione um plano");
	throw new Error("Por favor, selecione um plano");
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
				email.classList.add("error");
				alert("Usuário já existe");
			}
		}
	} catch (error) {
		console.error(error);
	}
});
