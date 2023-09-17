function isAuthenticated() {
	if (!getToken()) {
		window.location.href = "/index.html";
	} else {
		return localStorage.getItem("@site-scrum:token");
	}
}

function getToken() {
	return localStorage.getItem("@site-scrum:token");
}

function signin(token) {
	localStorage.setItem("@site-scrum:token", token);
	window.location.href = "/home.html";
}

function signout() {
	localStorage.removeItem("@site-scrum:token");

	window.location.href = "/index.html";
}

export default { isAuthenticated, getToken, signin, signout };
