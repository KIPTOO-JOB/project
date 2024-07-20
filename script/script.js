// getting form inputs

const appUrl = "http://localhost:3000/rides";

//getiing form data

// Fetch existing rides and render them
fetch(appUrl)
	.then((res) => res.json())
	.then((data) => data.map((trans) => renderTrans(trans)));

function renderTrans(trans) {
	console.log(trans);

	const transportDesc = document.querySelector("#transportDesc");
	const transportDiv = document.createElement("div");
	transportDiv.classList.add("transport");

	const transport = `
        <div>
            <h1>Driver's Name: ${trans.driver}</h1>
        </div>
        <div>
            <h2>Goods: ${trans.good}</h2>
        </div>
        <div>
            Pickup Location: ${trans.pickUp}
        </div>
        <div>
            DropOff Location: ${trans.dropOff}
        </div>
          <div>
            Delivery price $: ${trans.deliveryPrice}
        </div>
    `;
	transportDiv.innerHTML = transport;
	transportDesc.appendChild(transportDiv);
}

// Form submission handler

let form1 = document.querySelector("#transDetail");

form1.addEventListener("submit", (e) => {
	e.preventDefault();

	let driverName = document.getElementById("driversName").value;
	let good = document.getElementById("good").value;
	let pickUp = document.getElementById("pickupLocation").value;
	let dropOff = document.getElementById("dropoffLocation").value;
	let deliveryPrice = document.getElementById("deliveryPrice").value;

	const formData = {
		driver: driverName,
		good: [good],
		pickUp: pickUp,
		dropOff: dropOff,
		deliveryPrice: deliveryPrice,
	};

	// POST data to db.json
	fetch(appUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(formData),
	})
		.then((res) => res.json())
		.then((trans) => console.log(trans));
	form1.reset();
});
