fetch("data/data.json")
	.then(response => {
		return response.json();
	})
	.then(data => {
		generateEvents(data);
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
		let contentCol = document.createElement("div");
		contentCol.className = "col-md-8";

		let contentCardBody = document.createElement("div");
		contentCardBody.className = "card-body";

		let cardTitle = document.createElement("h5");
		cardTitle.classList = "card-title";
		cardTitle.textContent = item.title;

		document
			.querySelector("body")
			.appendChild(outerDiv)
			.appendChild(innerDiv);

		innerDiv.appendChild(imageCol);
		innerDiv.appendChild(contentCol);

		contentCol.appendChild(contentCardBody);

		contentCardBody.append(cardTitle);
	});
};
