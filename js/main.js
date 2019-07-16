// Fetch + Async
fetch("data/data.json")
	.then(response => {
		return response.json();
	})
	.then(data => {
		generateEvents(data);

		// Search filter
		let searchInput = document.getElementById("search-input");
		let eventDOMElements = document.querySelectorAll(
			".event-container .card-body"
		);
		let events = [];

		eventDOMElements.forEach(element => {
			let event = {};
			event.title = element.childNodes[0].innerText;
			event.description = element.childNodes[1].innerText;
			event.date = element.childNodes[2].firstChild.textContent.trim();
			event.time = element.childNodes[2].lastChild.textContent.trim();
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
							event.title
								.toLowerCase()
								.includes(element.toLowerCase()) ||
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
	})
	.catch(error => {
		console.log(error);
	});

const generateEvents = data => {
	data.forEach(item => {
		let outerDiv = document.createElement("div");
		outerDiv.className = "card mb-3 event-container";
		let innerDiv = document.createElement("div");
		innerDiv.className = "row no-gutters";

		let imageCol = document.createElement("div");
		imageCol.className = "col-md-4 mt-4";

		let image = document.createElement("img");
		image.className = "card-img img img-fluid";
		image.width = 250;
		image.height = 250;
		image.src = item.image64;

		let contentCol = document.createElement("div");
		contentCol.className = "col-md-8";

		let contentCardBody = document.createElement("div");
		contentCardBody.className = "card-body";

		let cardTitle = document.createElement("h5");
		cardTitle.className = "card-title";
		cardTitle.textContent = item.title;

		let cardDescription = document.createElement("p");
		cardDescription.className = "card-text";
		cardDescription.textContent = item.description;

		let cardDateTime = document.createElement("p");
		cardDateTime.className = "card-text";
		cardDateTime.innerHTML = `${item.date}<br/>${item.time}`;

		let eventBtn = document.createElement("button");
		eventBtn.className = "btn btn-outline-primary go-btn";
		eventBtn.textContent = "I'm Interested";
		eventBtn.addEventListener("click", goInfo);

		document
			.querySelector("div.events-wrapper")
			.appendChild(outerDiv)
			.appendChild(innerDiv);

		innerDiv.appendChild(imageCol);
		innerDiv.appendChild(contentCol);

		imageCol.appendChild(image);
		contentCol.appendChild(contentCardBody);

		contentCardBody.append(cardTitle);
		contentCardBody.append(cardDescription);
		contentCardBody.append(cardDateTime);
		contentCardBody.append(eventBtn);
	});
};

////////////////////////////////////////////////////////////////

function goInfo() {
	window.open("info.html");
}
