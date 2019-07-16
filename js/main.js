function goInfo() {
	window.open("info.html");
}

// Fetching data

// Search filter
let searchInput = document.getElementById("search-input");
let eventDOMElements = document.querySelectorAll(".event-container .card-body");
let events = [];

eventDOMElements.forEach(element => {
	let event = {};
	event.title = element.childNodes[1].innerText;
	event.description = element.childNodes[3].innerText;
	event.date = element.childNodes[5].firstChild.textContent
		.split("\n")[1]
		.trim();
	event.time = element.childNodes[5].lastChild.textContent.trim();
	event.parent = element.parentElement.parentElement.parentElement;
	event.paid = generatePaidEvent();
	events.push(event);
});

function generatePaidEvent() {
	let randomNum = Math.random();
	if (randomNum > 0.4) {
		return "Free";
	} else {
		return "Paid";
	}
}

function liveSearch() {
	let userInput = searchInput.value.toLowerCase();

	events.forEach(event => {
		if (event.title.toLowerCase().indexOf(userInput) > -1) {
			event.parent.style.display = "";
		} else {
			event.parent.style.display = "none";
		}
	});
}

searchInput.addEventListener("keyup", liveSearch);

// Input checkboxes.
let checkboxes = document.querySelectorAll(".checkbox-field input");
let checkedList = [];

checkboxes.forEach(checkbox => {
	checkbox.addEventListener("change", handleCheckbox);
});

function handleCheckbox(event) {
	let currentCheckbox = event.target;
	if (currentCheckbox.checked) {
		checkedList.push(currentCheckbox.value);
	} else {
		checkedList = checkedList.filter(
			element => element !== currentCheckbox.value
		);
	}
	if (checkedList.length <= 0 || checkedList == []) {
		events.forEach(event => {
			event.parent.style.display = "";
		});
	} else {
		checkedList.forEach(element => {
			events.forEach(event => {
				if (
					event.description
						.toLowerCase()
						.includes(element.toLowerCase()) ||
					event.title.toLowerCase().includes(element.toLowerCase()) ||
					event.paid.toLowerCase() == element.toLowerCase()
				) {
					event.parent.style.display = "";
				} else {
					event.parent.style.display = "none";
				}
			});
		});
	}
}
