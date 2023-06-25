const radioInputs = document.querySelectorAll('input[type="radio"]');
const labels = document.querySelectorAll("label");

radioInputs.forEach((input) => {
	input.addEventListener("change", () => {
		labels.forEach((label) => {
			if (label.htmlFor === input.id) {
				label.classList.add("checked");
				label.classList.remove("opacity-50");
			} else {
				label.classList.remove("checked");
				label.classList.add("opacity-50");
			}
		});
	});
});
