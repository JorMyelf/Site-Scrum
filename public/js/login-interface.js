const email = document.getElementById("email");
const password = document.getElementById("password");

email.addEventListener("focus", () => {
	email.classList.remove("error");
});

password.addEventListener("focus", () => {
	password.classList.remove("error");
});
