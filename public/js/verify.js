import API from "./lib/auth.js";

const authLink = document.getElementsByClassName("auth-link");

authLink[0].addEventListener("click", async (e) => {
	try {
		const response = await fetch("/verify", {
			method: "get",
			headers: {
				Autorization: `Bearer ${API.isAuthenticated()}`,
			},
		});
		console.log(response);
		console.log(API.isAuthenticated());
		if (response.status === 200) {
			window.location.href = "pages/pages-scrum/";
		}
	} catch (error) {
		console.error(error);
	}
});

authLink[1].addEventListener("click", async (e) => {
	try {
		const response = await fetch("/verify", {
			method: "get",
			headers: {
				Autorization: `Bearer ${API.isAuthenticated()}`,
			},
		});
		console.log(response);
		console.log(API.isAuthenticated());
		if (response.status === 200) {
			window.location.href = "pages/pages-kanban/";
		}
	} catch (error) {
		console.error(error);
	}
});
